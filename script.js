const images = Array.from(document.querySelectorAll("#gallery img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
let current = 0;

function show(index) {
  current = (index + images.length) % images.length;
  // load a larger version of the image
  lightboxImg.src = images[current].src.replace("w=900", "w=1600");
  lightboxImg.alt = images[current].alt;
}

function openLightbox(index) {
  show(index);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
}

images.forEach((img, i) => img.addEventListener("click", () => openLightbox(i)));

document.getElementById("close").addEventListener("click", closeLightbox);
document.getElementById("prev").addEventListener("click", () => show(current - 1));
document.getElementById("next").addEventListener("click", () => show(current + 1));

// click on the dark background closes it
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// keyboard support
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});
