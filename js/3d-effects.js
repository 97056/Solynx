(function () {
  "use strict";

  function initTiltCards() {
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;

    document.querySelectorAll("[data-tilt], .card-3d").forEach((card) => {
      const max = parseFloat(card.getAttribute("data-tilt-max")) || 8;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * max;
        const ry = (x - 0.5) * max;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;

        const glow = card.querySelector(".card-3d__glow");
        if (glow) {
          glow.style.left = `${x * 100}%`;
          glow.style.top = `${y * 100}%`;
          glow.style.transform = "translate(-50%, -50%)";
        }
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  function initHero3D() {
    const wrap = document.querySelector(".hero-stage") || document.querySelector(".hero-3d");
    if (!wrap) return;
    const isTouch = matchMedia("(pointer: coarse)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced || window.innerWidth < 992) return;

    wrap.style.transformStyle = "preserve-3d";
    wrap.style.transition = "transform 0.2s ease-out";

    wrap.addEventListener("mousemove", (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      wrap.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
    });
    wrap.addEventListener("mouseleave", () => {
      wrap.style.transform = "";
    });
  }

  function initTechMap() {
    const map = document.querySelector(".tech-map");
    if (!map) return;
    const nodes = map.querySelectorAll(".tech-node");
    const svg = map.querySelector(".tech-map__links");

    const connections = {
      react: ["nextjs", "typescript", "node", "tailwind", "reactnative"],
      nextjs: ["react", "typescript", "node", "aws"],
      typescript: ["react", "nextjs", "node", "prisma"],
      node: ["react", "graphql", "postgres", "docker", "prisma", "redis"],
      graphql: ["node", "react", "prisma"],
      flutter: ["firebase", "reactnative"],
      reactnative: ["react", "firebase", "typescript"],
      tailwind: ["react", "nextjs"],
      aws: ["docker", "kubernetes", "postgres", "node"],
      docker: ["aws", "kubernetes", "node", "git"],
      kubernetes: ["docker", "aws"],
      firebase: ["flutter", "reactnative", "analytics"],
      java: ["postgres", "docker", "aws"],
      go: ["docker", "kubernetes", "postgres", "redis"],
      python: ["tensorflow", "llm", "postgres", "mongodb"],
      prisma: ["node", "postgres", "typescript"],
      postgres: ["node", "prisma", "redis", "aws"],
      redis: ["node", "postgres", "go"],
      mongodb: ["python", "node", "aws"],
      git: ["docker", "node", "typescript"],
      tensorflow: ["python", "llm", "analytics"],
      llm: ["python", "tensorflow", "analytics"],
      analytics: ["llm", "firebase", "postgres"],
    };

    function drawLinks(activeId) {
      if (!svg) return;
      svg.innerHTML = "";
      if (!activeId || !connections[activeId]) return;
      const active = map.querySelector(`[data-tech="${activeId}"]`);
      if (!active) return;
      const a = active.getBoundingClientRect();
      const m = map.getBoundingClientRect();
      const ax = a.left + a.width / 2 - m.left;
      const ay = a.top + a.height / 2 - m.top;

      connections[activeId].forEach((id) => {
        const target = map.querySelector(`[data-tech="${id}"]`);
        if (!target) return;
        target.classList.add("is-linked");
        const t = target.getBoundingClientRect();
        const tx = t.left + t.width / 2 - m.left;
        const ty = t.top + t.height / 2 - m.top;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", ax);
        line.setAttribute("y1", ay);
        line.setAttribute("x2", tx);
        line.setAttribute("y2", ty);
        line.setAttribute("stroke", "rgba(0,229,192,0.45)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
      });
    }

    nodes.forEach((node) => {
      node.addEventListener("mouseenter", () => {
        const id = node.getAttribute("data-tech");
        nodes.forEach((n) => {
          n.classList.add("is-dim");
          n.classList.remove("is-linked", "is-active");
        });
        node.classList.remove("is-dim");
        node.classList.add("is-active", "is-linked");
        drawLinks(id);
      });
      node.addEventListener("mouseleave", () => {
        nodes.forEach((n) => n.classList.remove("is-dim", "is-linked", "is-active"));
        if (svg) svg.innerHTML = "";
      });
    });
  }

  window.Solynx3D = { initTiltCards, initHero3D, initTechMap };
})();
