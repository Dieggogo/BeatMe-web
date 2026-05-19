const revealNodes = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const node = entry.target;
      const siblings = [...node.parentElement.querySelectorAll(".reveal")];
      const index = Math.max(0, siblings.indexOf(node));
      node.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
      node.classList.add("visible");
      observer.unobserve(node);
    });
  },
  { threshold: 0.14 },
);

revealNodes.forEach((node) => revealObserver.observe(node));

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = `(c) ${new Date().getFullYear()} BeatMe`;
}
