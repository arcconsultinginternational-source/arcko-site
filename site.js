// Contact details are configured in site-settings.json.
const LINE_OFFICIAL_URL = window.ARCKO_CONFIG.lineUrl;
const IMAGE_FILES = {
  "arcko-class-1": "arcko-class-exploration.jpg",
  "arcko-class-2": "arcko-students-showcase.jpg",
  "arcko-class-4": "arcko-student-sketches.jpg",
  "arcko-class-5": "arcko-class-drawing.jpg",
  "arcko-class-6": "arcko-class-collaboration.jpg",
  "arcko-workshop-1": "arcko-class-making.jpg",
  "3d-printing": "programme-3d-printing.jpg",
  electronics: "programme-tech-toy-design.jpg",
  drawing: "programme-digital-arts.jpg",
  cardboard: "programme-product-design.jpg",
  chess: "programme-chess.jpg",
  crafts: "programme-craft-club.jpg",
  "hero-robotics": "creative-learning-placeholder.jpg",
};
const photo = (name) => `assets/images/${IMAGE_FILES[name]}`;
const photos = {
  hero: photo("hero-robotics"),
  making: photo("cardboard"),
  partners: photo("arcko-class-6"),
};
document
  .querySelectorAll("[data-photo]")
  .forEach((img) => (img.src = photos[img.dataset.photo]));
const programmes = [
  {
    title: "3D Printing",
    category: "design",
    label: "DESIGN & TECHNOLOGY",
    image: "3d-printing",
    alt: "A 3D printer creating a physical object",
    intro: "From a spark of an idea to something you can hold.",
    description:
      "Discover how digital ideas become physical objects. Children explore shape, form and purposeful design as they develop something of their own.",
    outcomes: [
      "Explore shapes and three-dimensional form",
      "Connect digital design with physical making",
      "Reflect on a design and consider improvements",
    ],
  },
  {
    title: "Product Design",
    category: "design",
    label: "DESIGN & TECHNOLOGY",
    image: "cardboard",
    alt: "Children exploring a cardboard creation",
    intro: "Reimagine everyday things with people and purpose in mind.",
    description:
      "Look at familiar objects with fresh eyes. Children investigate how things work, who uses them and how thoughtful design could make everyday experiences better.",
    outcomes: [
      "Consider the relationship between form and function",
      "Explore materials and build physical models",
      "Explain who a design helps and why",
    ],
  },
  {
    title: "Tech Toy Design",
    category: "design",
    label: "DESIGN & TECHNOLOGY",
    image: "electronics",
    alt: "Children exploring electronics together",
    intro: "Explore movement, interaction and the joy of invention.",
    description:
      "Explore what makes a toy engaging. Children connect creative ideas with simple mechanisms and technology to imagine playful experiences.",
    outcomes: [
      "Explore how actions create responses",
      "Experiment with movement and interaction",
      "Test an idea and learn from what happens",
    ],
  },
  {
    title: "Chess",
    category: "strategy",
    label: "STRATEGIC THINKING",
    image: "chess",
    alt: "A child considering a move on a chessboard",
    intro: "Think ahead. See another perspective. Make your move.",
    description:
      "A playful space to practise thoughtful decisions. Chess invites children to consider options, anticipate possibilities and learn from every move.",
    outcomes: [
      "Pause, observe and consider possible moves",
      "Think about another player’s perspective",
      "Reflect on decisions and try new strategies",
    ],
  },
  {
    title: "Craft Club",
    category: "making",
    label: "ART & MAKING",
    image: "crafts",
    alt: "Children making colourful crafts",
    intro: "Curious hands. Everyday materials. Unexpected possibilities.",
    description:
      "Explore materials and enjoy the process of making. Children experiment with techniques, express their ideas and discover different ways to create.",
    outcomes: [
      "Investigate the possibilities of everyday materials",
      "Practise making choices and working through challenges",
      "Develop individual ideas through hands-on exploration",
    ],
  },
];
programmes.push({
  title: "Digital Arts",
  category: "making",
  label: "DIGITAL ARTS",
  image: "drawing",
  alt: "An illustrative drawing activity",
  intro: "Imagine it. Make it yours.",
  description:
    "Explore digital tools as a way to express individual ideas. Children develop their own projects through drawing, colour and visual storytelling.",
  outcomes: [
    "Explore digital drawing and colour",
    "Develop personal ideas through visual expression",
    "Reflect, experiment and refine a project",
  ],
});
const grid = document.getElementById("programme-grid");
document.querySelectorAll(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    let count = 0;
    document.querySelectorAll(".programme-card").forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
      if (!card.hidden) count++;
    });
    document.getElementById("filter-status").textContent =
      `Showing ${count} programmes.`;
  }),
);
const programmeDialog = document.getElementById("programme-dialog");
document.querySelectorAll("[data-programme]").forEach((button) =>
  button.addEventListener("click", () => {
    const p = programmes[Number(button.dataset.programme)];
    document.getElementById("dialog-title").textContent = p.title;
    document.getElementById("dialog-label").textContent = p.label;
    document.getElementById("dialog-description").textContent = p.description;
    const img = document.getElementById("dialog-image");
    img.src = photo(p.image);
    img.alt = p.alt;
    const list = document.getElementById("dialog-outcomes");
    list.replaceChildren();
    p.outcomes.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      list.appendChild(li);
    });
    document.getElementById("programme-enquiry").href =
      `mailto:arckocreative@gmail.com?subject=${encodeURIComponent(`Enquiry about ${p.title}`)}`;
    programmeDialog.setAttribute("aria-labelledby", "dialog-title");
    programmeDialog.showModal();
    programmeDialog.scrollTop = 0;
  }),
);
const steps = [
  [
    "Who are we creating for?",
    "Look closely, listen and get curious. Children explore how people feel and what they need before jumping to a solution.",
    "“What makes carrying your favourite things tricky?”",
  ],
  [
    "What could we make better?",
    "Turn observations into a clear question. Children practise identifying a need and deciding what is most useful to focus on.",
    "“How could we make it easier to carry everything?”",
  ],
  [
    "What else could it be?",
    "Make room for more than one answer. Children sketch, share and compare possibilities, then choose an idea to explore.",
    "“Could it fold, clip on or change shape?”",
  ],
  [
    "Can we bring it to life?",
    "Make a simple version of an idea. Children use materials and tools to find out how a design could work in the real world.",
    "“Let’s build a small version and see what happens.”",
  ],
  [
    "What will we try next?",
    "Try the creation, invite feedback and notice what could work better. Children learn that changing an idea is part of creating.",
    "“What worked? What could we change for the next try?”",
  ],
];
document.querySelectorAll("[data-step]").forEach((button) =>
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-step]").forEach((b) => {
      b.classList.toggle("active", b === button);
      b.setAttribute("aria-pressed", String(b === button));
    });
    const s = steps[Number(button.dataset.step)];
    document.getElementById("step-question").textContent = s[0];
    document.getElementById("step-description").textContent = s[1];
    document.getElementById("step-example").textContent = s[2];
  }),
);
document.querySelectorAll("[data-line]").forEach((button) =>
  button.addEventListener("click", () => {
    if (LINE_OFFICIAL_URL) {
      window.location.assign(LINE_OFFICIAL_URL);
    } else {
      document.getElementById("line-dialog").showModal();
    }
  }),
);
document.querySelectorAll("dialog").forEach((dialog) => {
  dialog
    .querySelector(".close-dialog")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        dialog.close();
    }
  });
});
const menu = document.querySelector(".menu-toggle"),
  nav = document.getElementById("nav");
function closeMenu() {
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  menu.setAttribute("aria-label", "Open navigation");
}
menu.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menu.setAttribute("aria-expanded", String(open));
  menu.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
});
nav
  .querySelectorAll("a")
  .forEach((a) => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".header")) closeMenu();
});
document.getElementById("year").textContent = new Date().getFullYear();
const galleryDialog = document.getElementById("gallery-dialog");
document.querySelectorAll("[data-gallery]").forEach((button) =>
  button.addEventListener("click", () => {
    const img = document.getElementById("gallery-large");
    img.src = button.dataset.gallery;
    img.alt = button.querySelector("img").alt;
    document.getElementById("gallery-caption").textContent =
      button.dataset.caption;
    galleryDialog.showModal();
  }),
);
// Hero motion pauses on request, offscreen, in background tabs, or with reduced motion.
(() => {
  const hero = document.querySelector(".hero-bold");
  const stage = document.querySelector(".hero-motion-canvas");
  const toggle = document.querySelector(".hero-motion-toggle");
  if (!hero || !stage || !toggle) return;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia?.("(hover: hover) and (pointer: fine)");
  let userPaused = false;
  let visible = true;
  let frame = 0;
  let pointerX = 0;
  let pointerY = 0;
  const stopped = () =>
    userPaused || reduced?.matches || !visible || document.hidden;
  const resetPointer = () => {
    window.cancelAnimationFrame?.(frame);
    frame = 0;
    stage.style.setProperty("--mascot-x", "0px");
    stage.style.setProperty("--mascot-y", "0px");
  };
  const refresh = () => {
    hero.dataset.motionPaused = String(Boolean(stopped()));
    toggle.hidden = Boolean(reduced?.matches);
    toggle.setAttribute("aria-pressed", String(userPaused));
    toggle.textContent = userPaused ? "Play motion" : "Pause motion";
    if (stopped()) resetPointer();
  };
  toggle.addEventListener("click", () => {
    userPaused = !userPaused;
    refresh();
  });
  reduced?.addEventListener("change", refresh);
  document.addEventListener("visibilitychange", refresh);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        refresh();
      },
      { threshold: 0.1 },
    ).observe(hero);
  }
  stage.addEventListener("pointermove", (event) => {
    if (stopped() || !finePointer?.matches) return;
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const bounds = stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const x = Math.max(
        -1,
        Math.min(1, ((pointerX - bounds.left) / bounds.width) * 2 - 1),
      );
      const y = Math.max(
        -1,
        Math.min(1, ((pointerY - bounds.top) / bounds.height) * 2 - 1),
      );
      stage.style.setProperty("--mascot-x", `${x * 9}px`);
      stage.style.setProperty("--mascot-y", `${y * 7}px`);
    });
  });
  stage.addEventListener("pointerleave", resetPointer);
  hero.classList.add("hero-motion-ready");
  refresh();
})();
