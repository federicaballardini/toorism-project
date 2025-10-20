document.addEventListener("DOMContentLoaded", () => {
  updateScrollPages();
  setupScrollSteps();
});

window.addEventListener("resize", () => {
  setupScrollSteps();
});

window.addEventListener("scroll", () => {
  updateScrollPages();
  toggleTopButton();
  toggleNavVisibility();
});

// ---- SCROLL PAGE SECTION ----
function updateScrollPages() {
  const pages = document.querySelectorAll(".scroll-page");
  const scrollTop = window.scrollY;
  const OFFSET = 0.3;

  const pageIndex = Math.max(
    0,
    Math.min(
      pages.length - 1,
      Math.floor((scrollTop + window.innerHeight * OFFSET) / window.innerHeight)
    )
  );

  pages.forEach((page, index) => {
    page.classList.toggle("active", index === pageIndex);
  });

  const left = document.querySelector(".title-part.left");
  const right = document.querySelector(".title-part.right");

  if (left && right) {
    if (scrollTop > 120) {
      left.classList.add("scroll-out");
      right.classList.add("scroll-out");
    } else {
      left.classList.remove("scroll-out");
      right.classList.remove("scroll-out");
    }
  }
}

// ---- SCROLLYTELLING STEPS ----
function isMobileView() {
  return window.innerWidth <= 768;
}

function setupScrollSteps() {
  const steps = document.querySelectorAll(".scrollytelling-step");
  const observerOptions = {
    threshold: 0.6,
    rootMargin: isMobileView() ? "0px 0px -20% 0px" : "0px 0px -40% 0px"
  };

  const observer = new IntersectionObserver(handleStepEnter, observerOptions);
  steps.forEach(step => observer.observe(step));
}

function handleStepEnter(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      triggerAnimationForStep(entry.target.dataset.step);
    } else {
      entry.target.classList.remove("active");
    }
  });
}

function triggerAnimationForStep(stepId) {
  // Placeholder for step-specific animations
}

// ---- NAVIGATION BAR ----
function toggleNavVisibility() {
  const topnav = document.getElementById('mainTopnav');
  const title = document.getElementById('page-1');

  if (!topnav || !title) return;

  const titleBottom = title.offsetTop + title.offsetHeight;
  const scrollPos = window.scrollY;

  if (scrollPos > titleBottom - 60) {
    topnav.classList.remove('hidden');
    topnav.classList.add('visible');
  } else {
    topnav.classList.add('hidden');
    topnav.classList.remove('visible');
  }
}

// ---- HAMBURGER MENU ----
function menuFunction() {
  const x = document.getElementById("mainTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ---- TOP BUTTON ----
const tpbutton = document.getElementById("tpBtn");

function toggleTopButton() {
  if (!tpbutton) return;
  const show = window.scrollY > 400;
  tpbutton.style.display = show ? "block" : "none";
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

