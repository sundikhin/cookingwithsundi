// cooking with sundi — small progressive enhancements. The site works without JS.

// Every published recipe, used by "Surprise me". Add new recipes here.
const RECIPES = [
  "recipes/magic-tea/",
  "recipes/dilly-red-potato-salad/",
  "recipes/honeynut-squash-mac-and-cheese/",
  "recipes/neoguri-copycat-ramen/",
  "recipes/no-knead-overnight-bread/",
];

// Pages set data-root to the relative path back to the site root ("" or "../" etc.)
const ROOT = document.body.dataset.root || "";

// Phone menu
const toggle = document.querySelector(".menu-toggle");
const links = document.getElementById("nav-links");
if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "close" : "menu";
  });
}

// Surprise me: jump to a random recipe (never the one you're on)
document.querySelectorAll("[data-surprise]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    const here = location.pathname;
    const options = RECIPES.filter((r) => !here.endsWith(r));
    const pick = options[Math.floor(Math.random() * options.length)];
    location.href = ROOT + pick;
  });
});

// Toast helper
function toast(msg) {
  let t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("is-visible");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove("is-visible"), 2200);
}

// Share with a friend: native share sheet, else copy the link
document.querySelectorAll("[data-share]").forEach((el) => {
  el.addEventListener("click", async () => {
    const data = { title: document.title, url: location.href };
    try {
      if (navigator.share) {
        await navigator.share(data);
      } else {
        await navigator.clipboard.writeText(location.href);
        toast("Link copied. Send it to a friend!");
      }
    } catch (err) {
      if (err && err.name !== "AbortError") toast("Couldn't share. Copy the address bar instead.");
    }
  });
});

// Print
document.querySelectorAll("[data-print]").forEach((el) => {
  el.addEventListener("click", () => window.print());
});

// Ingredient checklist: remember ticks for this recipe in this browser
const list = document.querySelector(".ingredients ul");
if (list) {
  const key = "ticks:" + location.pathname;
  const boxes = [...list.querySelectorAll('input[type="checkbox"]')];
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem(key) || "[]"); } catch {}
  boxes.forEach((b, i) => {
    b.checked = !!saved[i];
    b.addEventListener("change", () => {
      try { localStorage.setItem(key, JSON.stringify(boxes.map((x) => x.checked))); } catch {}
    });
  });
}
