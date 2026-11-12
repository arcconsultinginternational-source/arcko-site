(() => {
  'use strict';
  const config = window.ARCKO_CAMP;
  const form = document.getElementById('booking-form');
  const dialog = document.getElementById('line-dialog');
  const money = value => '฿' + value.toLocaleString('en-US', { maximumFractionDigits: 2 });
  const labels = { week1: 'Week 1: 14–18 December 2026', week2: 'Week 2: 21–25 December 2026', both: 'Both weeks: 14–18 & 21–25 December 2026', day: 'One day' };
  const track = (name, detail = {}) => document.dispatchEvent(new CustomEvent('arcko:camp', { detail: { event: name, ...detail } }));
  function selection() {
    const plan = form.elements.plan.value;
    const children = Number(document.getElementById('children').value);
    const friends = children > 1 && document.getElementById('friends').checked;
    const { day, week, discount } = config.prices;
    const base = (plan === 'day' ? day : plan === 'both' ? week * 2 : week) * children;
    const offers = Number(plan === 'both') + Number(friends);
    const rate = config.stackDiscounts ? discount * offers : offers ? discount : 0;
    const total = Math.round(base * (1 - rate) * 100) / 100;
    const date = plan === 'day' ? document.getElementById('camp-day').selectedOptions[0].textContent + ' 2026' : labels[plan];
    return { plan, children, friends, base, rate, total, date };
  }
  function update() {
    const s = selection();
    document.getElementById('day-field').hidden = s.plan !== 'day';
    document.getElementById('friend-field').hidden = s.children < 2;
    document.getElementById('total-price').textContent = money(s.total);
    document.getElementById('selection-description').textContent = `${s.plan === 'day' ? '1 day' : s.plan === 'both' ? '2 weeks' : s.plan === 'week1' ? 'Week 1' : 'Week 2'} · ${s.children} ${s.children === 1 ? 'child' : 'children'}`;
    document.getElementById('discount-note').textContent = s.rate
      ? `${s.rate * 100}% offer included · save ${money(s.base - s.total)} on the early-bird total. One offer applied; eligibility and final price confirmed on LINE.`
      : 'Early-bird rate. Final availability and booking confirmed on LINE.';
  }
  form.addEventListener('change', update);
  form.addEventListener('submit', event => {
    event.preventDefault();
    const s = selection();
    document.getElementById('booking-message').value = `Hi Arcko! I’m interested in December Creative Week 2026.\n${s.date}\nChildren: ${s.children}${s.friends ? ' (siblings / besties)' : ''}\nEstimated total: ${money(s.total)}${s.rate ? ` (one ${s.rate * 100}% offer included)` : ''}\nPlease confirm availability, the activities, final price and payment details.\nChild age(s): `;
    document.getElementById('copy-status').textContent = '';
    dialog.showModal();
    track('booking_summary_open', { plan: s.plan, children: s.children });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  document.getElementById('copy-summary').addEventListener('click', async () => {
    const message = document.getElementById('booking-message');
    try {
      await navigator.clipboard.writeText(message.value);
      document.getElementById('copy-status').textContent = 'Copied. Open LINE and paste your summary into the chat.';
    } catch {
      message.focus(); message.select();
      document.getElementById('copy-status').textContent = 'Select and copy the summary above, then paste it into LINE.';
    }
  });
  const line = document.getElementById('open-line');
  line.href = config.lineUrl;
  line.addEventListener('click', () => track('line_click', { plan: selection().plan }));
  for (const slot of document.querySelectorAll('[data-media]')) {
    const key = slot.dataset.media;
    const src = config.media[key];
    if (!src) continue;
    const image = new Image();
    image.alt = slot.closest('article').querySelector('h3').textContent;
    image.loading = 'lazy';
    image.addEventListener('load', () => { slot.replaceChildren(image); slot.classList.add('has-image'); });
    image.src = src;
  }
  const videoSlot = document.getElementById('camp-video');
  if (config.media.video) {
    const video = document.createElement('video');
    video.controls = true; video.playsInline = true; video.preload = 'metadata';
    if (config.media.poster) video.poster = config.media.poster;
    video.src = config.media.video;
    video.setAttribute('aria-label', 'Arcko December Creative Week video');
    videoSlot.replaceChildren(video);
  } else if (config.media.poster) {
    const image = new Image(); image.alt = 'Creative learning at Arcko';
    image.addEventListener('load', () => videoSlot.replaceChildren(image));
    image.src = config.media.poster;
  }
  update();
})();
