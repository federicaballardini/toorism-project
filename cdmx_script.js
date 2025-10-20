document.addEventListener('DOMContentLoaded', () => {
    let cdmxTitle = document.getElementById('cdmxTitle');
    let topnav   = document.getElementById('mainTopnav');
    document.body.classList.add('no-scroll'); // Prevent initial scrolling

    cdmxTitle.addEventListener('click', () => {
        cdmxTitle.classList.add('hidden');
        // Allow scrolling after animation
        document.body.classList.remove('no-scroll');
        topnav.classList.remove('hidden');
        topnav.classList.add('visible');
    });
});

let cdmxmainImage = document.getElementById('cdmxmainImage');
let cdmxStackedImages = document.getElementById('cdmxStackedImages');
let sidebarElements = document.querySelectorAll('.cdmx_sidebar_element');

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let newImage = entry.target.getAttribute('data-image');

            if (newImage === 'stacked') {
                // Fade out cdmxmainImage
                cdmxmainImage.style.opacity = '0';

                // After fade out, switch to cdmxStackedImages
                setTimeout(() => {
                    cdmxmainImage.style.display = 'none';
                    cdmxStackedImages.style.display = 'block';
                }, 400); // 0.4s = same as CSS transition
            } else {
                // Make sure cdmxStackedImages is hidden
                cdmxStackedImages.style.display = 'none';

                // Make cdmxmainImage visible if needed
                cdmxmainImage.style.display = 'block';

                // Fade out current cdmxmainImage
                cdmxmainImage.style.opacity = '0';

                // After fade out, change src and fade in
                setTimeout(() => {
                    cdmxmainImage.src = newImage;
                    cdmxmainImage.style.opacity = '1';
                }, 400); // 0.4s = same as CSS transition
            }
        }
    });
}, {
    threshold: 0.5
});

sidebarElements.forEach(el => {
    observer.observe(el);
});

// Slider logic for cdmxHeatmapLayer
let cdmxHeatmapSlider = document.getElementById('cdmxHeatmapSlider');
let cdmxHeatmapLayer = document.getElementById('cdmxHeatmapLayer');
let cdmxSliderBar = document.getElementById('cdmxSliderBar');

cdmxHeatmapSlider.addEventListener('input', () => {
    let value = cdmxHeatmapSlider.value;

    // Adjust clip-path of heatmap layer
    cdmxHeatmapLayer.style.clipPath = `inset(0 ${100 - value}% 0 0)`;

    // Move cdmxSliderBar (and the handle inside it)
    cdmxSliderBar.style.left = `${value}%`;
});

// Redirect scroll from .cdmx_images to .cdmx_text
const cdmxImages = document.querySelector('.cdmx_images');
const cdmxText = document.querySelector('.cdmx_text');

cdmxImages.addEventListener('wheel', function(e) {
    // Prevent default scrolling of the page
    e.preventDefault();

    // Manually scroll the text column
    cdmxText.scrollBy({
        top: e.deltaY,
        behavior: 'auto' // no smooth here for responsiveness
    });
}, { passive: false }); // passive: false needed to use e.preventDefault()


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
