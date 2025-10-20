window.addEventListener("scroll", function () {
  const body = document.body;
  const map = document.querySelector(".map-svg-venice1");

  if (window.scrollY > 50) {
    body.classList.add("scrolled");
  } else {
    body.classList.remove("scrolled");
  }

  if (window.scrollY > 150) {
    map.classList.add("hidden");
  } else {
    map.classList.remove("hidden");
  }

  if (window.scrollY > 50) {
    document.querySelectorAll(".text-box").forEach((box) => {
      box.classList.add("visible");
    });
  } else {
    document.querySelectorAll(".text-box").forEach((box) => {
      box.classList.remove("visible");
    });
  }

  updateScrollSteps();
});

document.querySelectorAll("#Sestieri > g").forEach((group) => {
  const id = group.id;
  const infoBox = document.getElementById("info-" + id);

  group.addEventListener("mouseenter", () => {
    document.querySelectorAll(".info-box").forEach((box) => (box.style.display = "none"));
    if (infoBox) infoBox.style.display = "block";
  });

  group.addEventListener("mouseleave", () => {
    if (infoBox) infoBox.style.display = "none";
  });
});

let visitorsAnimated = false;
function triggerVisitorAnimation() {
  if (visitorsAnimated) return;
  visitorsAnimated = true;

  document.querySelectorAll(".visitor-icon").forEach((icon, i) => {
    setTimeout(() => {
      icon.classList.add("visible");
    }, i * 5);
  });
}

let fullScreenIconsAnimated = false;
function triggerFullScreenVisitorAnimation() {
  if (fullScreenIconsAnimated) return;
  fullScreenIconsAnimated = true;

  const fullScreenContainer = document.createElement("div");
  fullScreenContainer.className = "fullscreen-visitors";
  document.body.appendChild(fullScreenContainer);

  const totalIcons = 1000;
  for (let i = 0; i < totalIcons; i++) {
    const icon = document.createElement("img");
    icon.src = "https://cdn.glitch.global/ede1eb72-d2e0-4c4c-9209-3036570f03ac/icon_venice.png?v=1747912454471";
    icon.className = "visitor-icon";
    icon.style.position = "absolute";
    icon.style.top = `${Math.random() * 100}vh`;
    icon.style.left = `${Math.random() * 100}vw`;
    icon.style.zIndex = 9999;
    icon.style.pointerEvents = "none";
    icon.style.opacity = 0;
    fullScreenContainer.appendChild(icon);

    setTimeout(() => {
      icon.classList.add("visible");
    }, i * 250);
  }
}

function updateScrollSteps() {
  const steps = document.querySelectorAll(".scroll-step");
  const scrollTop = window.scrollY;

  if (scrollTop < 150) {
    steps.forEach((step) => step.classList.remove("active"));
    return;
  }

  const OFFSET = 0.3;
  const stepIndex = Math.floor((scrollTop + window.innerHeight * OFFSET) / window.innerHeight);

  steps.forEach((step, index) => {
    if (index === stepIndex) {
      step.classList.add("active");

      if (step.id === "step-4") {
        triggerVisitorAnimation();
      }

      if (step.id === "step-8") {
        triggerFullScreenVisitorAnimation();
      }

    } else {
      step.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".tourists-on-map");
  const totalIcons = 4000;

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < totalIcons; i++) {
    const icon = document.createElement("img");
    icon.src = "https://cdn.glitch.global/ede1eb72-d2e0-4c4c-9209-3036570f03ac/icon_venice.png?v=1747912454471";
    icon.className = "visitor-icon";
    icon.style.top = `${Math.random() * 90}%`;
    icon.style.left = `${Math.random() * 90}%`;
    container.appendChild(icon);
  }

  updateScrollSteps();
});

function updateVH() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
window.addEventListener('resize', updateVH);
window.addEventListener('load', updateVH);


//NAV BAR

//hamburger menu 
function menuFunction() {
  var x = document.getElementById("mainTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

const topnav = document.getElementById('mainTopnav');
  const hero = document.getElementById('veniceHeader');

  window.addEventListener('scroll', () => {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    const scrollPos = window.scrollY;

    if (scrollPos > heroBottom - 60) {
      topnav.classList.remove('hidden');
      topnav.classList.add('visible');
    } else {
      topnav.classList.add('hidden');
      topnav.classList.remove('visible');
    }
  });
window.addEventListener("resize", updateScrollSteps);