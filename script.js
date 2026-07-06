const header = document.querySelector("[data-header]");
const hero = document.querySelector("[data-hero]");
const heroTitle = document.querySelector("[data-hero-title]");
const pageContent = document.querySelector(".page-content");
const fragments = [...document.querySelectorAll(".hero-fragment")];
const shapes = [...document.querySelectorAll(".hero .shape")];
const menuToggle = document.querySelector("[data-menu-toggle]");
const menuPanel = document.querySelector("[data-menu-panel]");
const revealItems = [...document.querySelectorAll(".reveal")];
const manifesto = document.querySelector(".manifesto");
const carouselShell = document.querySelector(".carousel-shell");
const carouselTrack = document.querySelector("[data-carousel-track]");
const carouselPrev = document.querySelector("[data-carousel-prev]");
const carouselNext = document.querySelector("[data-carousel-next]");
const numbersSection = document.querySelector(".numbers");
const numberStack = document.querySelector("[data-number-stack]");
const numberCards = [...document.querySelectorAll(".number-card")];
const entrySection = document.querySelector(".entry");
const entryBlocks = [...document.querySelectorAll(".entry-block")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);
const easeOutPower4 = (value) => 1 - Math.pow(1 - value, 4);
const easeInOut = (value) => (value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2);
const lerp = (start, end, progress) => start + (end - start) * progress;
const getShapeMotion = (element) => {
  if (element.classList.contains("shape-a")) return { dx: 180, dy: -150, depth: 0.09, float: 4 };
  if (element.classList.contains("shape-b")) return { dx: 0, dy: 210, depth: 0.13, float: 6 };
  if (element.classList.contains("shape-c")) return { dx: 210, dy: 170, depth: 0.14, float: 5 };
  if (element.classList.contains("shape-d")) return { dx: -220, dy: 30, depth: 0.16, float: 5 };
  return { dx: 0, dy: 0, depth: 0.1, float: 4 };
};

const heroMotionItems = [
  ...fragments.map((element, index) => ({
    element,
    index,
    type: "fragment",
    dx: Number(element.dataset.dx || 0),
    dy: Number(element.dataset.dy || 0),
    depth: Number(element.dataset.depth || 0.1),
    float: 0,
  })),
  ...shapes.map((element, index) => ({
    element,
    index: fragments.length + index,
    type: "shape",
    ...getShapeMotion(element),
  })),
];

let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let latestScrollY = window.scrollY;
let ticking = false;
let carouselIndex = 0;
let carouselTimer = null;
let carouselPaused = false;
let carouselAnimating = false;
let carouselAnimationTimer = null;
const carouselTransitionDuration = reduceMotion ? 0 : 1000;
const carouselAutoplayDelay = 1500;
let heroIntroStart = reduceMotion ? 0 : null;
let heroIntroForcedComplete = reduceMotion;
const heroIntroInitialDelay = 40;
const heroIntroDuration = 1850;
const heroTitleDelay = 2000;

const updateHeader = () => {
  if (!header) return;
  const triggerTop = pageContent?.getBoundingClientRect().top ?? hero?.getBoundingClientRect().bottom ?? 0;
  const isMenuOpen = document.body.classList.contains("menu-open");
  const isVisible = isMenuOpen || !hero || triggerTop <= window.innerHeight * 0.08;
  header.classList.toggle("is-visible", isVisible);
  header.classList.toggle("is-scrolled", isVisible && window.scrollY > 40);
};

const updateEntryMotionMode = () => {
  if (!entrySection) return;
  entrySection.classList.toggle("is-entry-ready", window.innerWidth < 760 && !reduceMotion);
};

const getIntroState = (now) => {
  if (reduceMotion) return { progress: 1, titleReady: true, mouseFactor: 1 };
  if (latestScrollY > 8 && heroIntroStart !== null) heroIntroForcedComplete = true;
  if (heroIntroForcedComplete) return { progress: 1, titleReady: true, mouseFactor: 1 };
  if (heroIntroStart === null) return { progress: 0, titleReady: false, mouseFactor: 0 };

  const rawElapsed = now - heroIntroStart;
  const motionElapsed = rawElapsed - heroIntroInitialDelay;
  const progress = clamp(motionElapsed / heroIntroDuration, 0, 1);
  return {
    progress,
    rawElapsed,
    motionElapsed,
    titleReady: rawElapsed >= heroTitleDelay,
    mouseFactor: easeOut(clamp((progress - 0.75) / 0.25, 0, 1)),
  };
};

const updateHero = () => {
  if (!hero || !heroTitle) return;

  const now = performance.now();
  const viewport = Math.max(window.innerHeight, 720);
  const progress = clamp(latestScrollY / (viewport * 0.72), 0, 1);
  const eased = easeOut(progress);
  const intro = getIntroState(now);
  const titleScale = 1 + eased * 1.35;
  const titleOpacity = clamp(1 - progress * 1.35, 0, 1);

  heroTitle.style.transform = `translate(-50%, -42%) scale(${titleScale})`;
  heroTitle.style.filter = `blur(${progress * 8}px)`;
  heroTitle.style.opacity = titleOpacity;
  if (intro.titleReady || progress > 0.04) heroTitle.classList.add("is-ready");
  hero.classList.toggle("is-intro-complete", intro.progress >= 1);
  hero.style.pointerEvents = progress > 0.94 ? "none" : "auto";

  heroMotionItems.forEach((item) => {
    const element = item.element;
    const index = item.index;
    const isShape = item.type === "shape";
    const overshoot = window.innerWidth < 760 ? 1.25 : 1.75;
    const heroCenterX = hero.clientWidth / 2;
    const heroCenterY = hero.clientHeight / 2;
    const finalCenterX = isShape ? element.offsetLeft + element.offsetWidth / 2 : element.offsetLeft;
    const finalCenterY = isShape ? element.offsetTop + element.offsetHeight / 2 : element.offsetTop;
    const finalVectorX = finalCenterX - heroCenterX;
    const finalVectorY = finalCenterY - heroCenterY;
    const gatherProgress = easeInOut(clamp(intro.progress / 0.4, 0, 1));
    const revealProgress = easeOut(clamp((intro.progress - 0.4) / 0.2, 0, 1));
    const moveProgress = easeInOut(clamp((intro.progress - 0.4) / 0.52, 0, 1));
    const spreadProgress = easeInOut(clamp((intro.progress - 0.6) / 0.32, 0, 1));
    const settleProgress = easeInOut(clamp((intro.progress - 0.92) / 0.08, 0, 1));
    const preRevealScale = lerp(0.2, 0, gatherProgress);
    const revealScale = lerp(0, 0.25, revealProgress);
    const spreadScale = lerp(0.25, overshoot, spreadProgress);
    const introX = (1 - moveProgress) * -finalVectorX;
    const introY = (1 - moveProgress) * -finalVectorY;
    const introScale = intro.progress < 0.4
      ? preRevealScale
      : intro.progress < 0.6
        ? revealScale
        : lerp(spreadScale, 1, settleProgress);
    const appearProgress = revealProgress;
    const layerMouseX = mouseX * item.depth * intro.mouseFactor;
    const layerMouseY = mouseY * item.depth * intro.mouseFactor;
    const scrollX = item.dx * eased;
    const scrollY = item.dy * eased;
    const shapeFloatY = isShape && intro.progress >= 1
      ? Math.sin(now / 620 + index * 0.8) * item.float
      : 0;
    const shrink = introScale * (1 - progress * 0.08);
    const x = introX + layerMouseX + scrollX;
    const y = introY + layerMouseY + scrollY + shapeFloatY;

    element.style.opacity = appearProgress;
    element.style.transform = isShape
      ? `translate3d(${x}px, ${y}px, 0) scale(${shrink})`
      : `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${shrink})`;
  });
};

const updateNumbers = () => {
  if (!numbersSection || !numberStack) return;
  const rect = numbersSection.getBoundingClientRect();
  const viewport = window.innerHeight;
  const isMobile = window.innerWidth < 768;
  const startTop = isMobile ? 50 : 0;
  const endDistance = isMobile
    ? Math.max(rect.height - 450, viewport * 0.8)
    : Math.max(rect.height * 0.85 - viewport, viewport * 0.8);
  const progress = reduceMotion ? 1 : clamp((startTop - rect.top) / endDistance, 0, 1);
  const fromY = isMobile ? 150 : 130;
  const desktopTargets = [
    { x: 180, y: -20, scale: 0.8 },
    { x: 100, y: -10, scale: 0.9 },
    { x: 10, y: 0, scale: 1 },
  ];
  const mobileTargets = [
    { x: 100, y: -20, scale: 0.8 },
    { x: 50, y: -10, scale: 0.9 },
    { x: 10, y: 0, scale: 1 },
  ];
  const targets = isMobile ? mobileTargets : desktopTargets;
  const segmentCount = 3;
  const timelinePosition = progress * numberCards.length * segmentCount;

  numberCards.forEach((card, index) => {
    const target = targets[index] ?? targets[targets.length - 1];
    const localPosition = timelinePosition - index * segmentCount;
    let x = 0;
    let y = fromY;
    let scale = 1;

    if (localPosition >= 3) {
      x = target.x;
      y = target.y;
      scale = target.scale;
    } else if (localPosition >= 2) {
      const phase = easeOut(clamp(localPosition - 2, 0, 1));
      x = lerp(0, target.x, phase);
      y = target.y;
      scale = lerp(1, target.scale, phase);
    } else if (localPosition >= 1) {
      const phase = easeOut(clamp(localPosition - 1, 0, 1));
      y = lerp(0, target.y, phase);
    } else if (localPosition > 0) {
      const phase = easeOutPower4(clamp(localPosition, 0, 1));
      y = lerp(fromY, 0, phase);
    }

    const isVisible = reduceMotion || localPosition > 0;
    card.style.opacity = isVisible ? "1" : "0";
    card.style.visibility = isVisible ? "visible" : "hidden";
    card.style.setProperty("--number-x", `${x}%`);
    card.style.setProperty("--number-y", `${y}%`);
    card.style.setProperty("--number-scale", scale);
  });
};

const frame = () => {
  ticking = false;
  mouseX += (targetMouseX - mouseX) * 0.07;
  mouseY += (targetMouseY - mouseY) * 0.07;
  updateHeader();
  updateHero();
  updateNumbers();
  requestAnimationFrame(frame);
};

const requestUpdate = () => {
  latestScrollY = window.scrollY;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => {
      updateHeader();
      updateHero();
      updateNumbers();
      ticking = false;
    });
  }
};

if (hero) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    targetMouseX = event.clientX - rect.left - rect.width / 2;
    targetMouseY = event.clientY - rect.top - rect.height / 2;
  });

  hero.addEventListener("mouseleave", () => {
    targetMouseX = 0;
    targetMouseY = 0;
  });
}

window.addEventListener("scroll", requestUpdate, { passive: true });
window.addEventListener("resize", () => {
  requestUpdate();
  updateCarousel();
  updateEntryMotionMode();
});
window.addEventListener("load", () => {
  heroIntroStart = performance.now();
  updateCarousel();
  requestUpdate();
});

if (document.readyState === "complete" && heroIntroStart === null) {
  requestAnimationFrame(() => {
    heroIntroStart = performance.now();
    requestUpdate();
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

updateEntryMotionMode();
if (entryBlocks.length) {
  if (reduceMotion || !("IntersectionObserver" in window)) {
    entryBlocks.forEach((block) => block.classList.add("is-entry-visible"));
  } else {
    const entryObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-entry-visible");
            entryObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.22 }
    );

    entryBlocks.forEach((block) => entryObserver.observe(block));
  }
}

if ("IntersectionObserver" in window && manifesto) {
  const manifestoObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        manifesto.classList.toggle("is-blurred", entry.intersectionRatio > 0.25);
      });
    },
    { threshold: [0, 0.25, 0.5, 0.75] }
  );
  manifestoObserver.observe(manifesto);
}

const setMenuOpen = (open) => {
  if (!menuToggle || !menuPanel) return;
  menuToggle.classList.toggle("is-open", open);
  menuPanel.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  updateHeader();
};

menuToggle?.addEventListener("click", () => {
  setMenuOpen(!menuToggle.classList.contains("is-open"));
});

menuPanel?.addEventListener("click", (event) => {
  const link = event.target instanceof Element ? event.target.closest("a") : null;
  if (link) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuOpen(false);
});

const getLoopSlot = (index, activeIndex, total) => {
  const half = Math.floor(total / 2);
  return ((index - activeIndex + total + half) % total) - half;
};

const updateCarousel = () => {
  if (!carouselTrack) return;
  const cards = [...carouselTrack.children];
  if (cards.length === 0) return;
  carouselIndex = ((carouselIndex % cards.length) + cards.length) % cards.length;

  cards.forEach((card, index) => {
    const slot = getLoopSlot(index, carouselIndex, cards.length);
    card.dataset.slot = String(slot);
    card.setAttribute("aria-hidden", Math.abs(slot) > 1 ? "true" : "false");
  });
};

const moveCarousel = (direction) => {
  const cards = carouselTrack ? [...carouselTrack.children] : [];
  if (cards.length === 0 || carouselAnimating) return false;
  window.clearTimeout(carouselAnimationTimer);
  carouselAnimating = true;
  carouselShell?.classList.add("is-moving");
  carouselIndex += direction;
  carouselIndex = ((carouselIndex % cards.length) + cards.length) % cards.length;
  updateCarousel();
  carouselAnimationTimer = window.setTimeout(() => {
    carouselAnimating = false;
    carouselShell?.classList.remove("is-moving");
  }, carouselTransitionDuration);
  return true;
};

const startCarousel = () => {
  window.clearInterval(carouselTimer);
  if (carouselPaused) return;
  carouselTimer = window.setInterval(() => {
    moveCarousel(1);
  }, carouselAutoplayDelay);
};

const pauseCarousel = () => {
  carouselPaused = true;
  window.clearInterval(carouselTimer);
};

const resumeCarousel = () => {
  carouselPaused = false;
  startCarousel();
};

carouselPrev?.addEventListener("click", () => {
  if (moveCarousel(-1)) startCarousel();
});

carouselNext?.addEventListener("click", () => {
  if (moveCarousel(1)) startCarousel();
});

carouselShell?.addEventListener("pointerenter", pauseCarousel);
carouselShell?.addEventListener("pointerleave", resumeCarousel);
carouselShell?.addEventListener("focusin", pauseCarousel);
carouselShell?.addEventListener("focusout", resumeCarousel);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    setMenuOpen(false);
    const headerHeight = header?.offsetHeight || (window.innerWidth < 760 ? 66 : 76);
    const breathingRoom = window.innerWidth < 760 ? 18 : 28;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - breathingRoom;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  });
});

updateCarousel();
updateHeader();
updateHero();
updateNumbers();
startCarousel();
if (reduceMotion) {
  hero?.classList.add("is-intro-complete");
  heroTitle?.classList.add("is-ready");
} else {
  requestAnimationFrame(frame);
}
