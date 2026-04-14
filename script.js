const revealItems = document.querySelectorAll(".reveal");
const counterItems = document.querySelectorAll("[data-counter]");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

function animateCounter(node) {
  const target = Number(node.dataset.counter || 0);
  if (!Number.isFinite(target) || target <= 0) return;

  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(target * eased);
    node.textContent = String(value);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.45 }
);

counterItems.forEach((item) => counterObserver.observe(item));

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = `(c) ${new Date().getFullYear()}`;
}