/**
 * Optional GTM integration. No tracking scripts or cookies load by default.
 * Configure the GTM container and its consent controls before calling start().
 * Events contain only predefined UI labels; no form values or contact details.
 */
(() => {
  "use strict";
  let started = false;
  let permitted = false;
  window.dataLayer = window.dataLayer || [];
  const track = (event, parameters = {}) => {
    if (!permitted) return;
    window.dataLayer.push({ event, ...parameters });
  };
  window.ArckoMarketing = Object.freeze({
    start() {
      const id = window.ARCKO_CONFIG.googleTagManagerId;
      if (!/^GTM-[A-Z0-9]+$/.test(id)) return false;
      permitted = true;
      if (started) return true;
      started = true;
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
      return true;
    },
    stopEvents() {
      // Stops this file's UI events. Loaded third-party tags require CMP/GTM revocation.
      permitted = false;
    },
    track,
  });
  document.addEventListener("click", (event) => {
    const target = event.target.closest("button, a");
    if (!target) return;
    if (target.dataset.contactMethod) {
      const method = target.dataset.contactMethod;
      if (method === "line" && !window.ARCKO_CONFIG.lineUrl) {
        track("contact_options_view", { contact_method: "line_unavailable" });
      } else {
        track("contact_click", { contact_method: method });
      }
    }
    if (target.hasAttribute("data-programme")) {
      const title = target
        .closest(".programme-card")
        ?.querySelector("h3")?.textContent;
      track("programme_view", { programme_name: title || "" });
    }
    if (target.hasAttribute("data-filter")) {
      track("programme_filter", { category: target.dataset.filter });
    }
  });
})();
