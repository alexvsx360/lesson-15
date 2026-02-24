let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;

function showSlide(n) {
  currentSlide = Math.min(Math.max(n, 0), totalSlides - 1);
  slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
  const counter = document.getElementById("slideCounter");
  const progressFill = document.getElementById("progressFill");
  if (counter) counter.innerText = `${currentSlide + 1} / ${totalSlides}`;
  if (progressFill) {
    progressFill.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
  }
  updateNavButtons();
  slides[currentSlide].scrollTop = 0;
  if (typeof Prism !== "undefined") {
    Prism.highlightAllUnder(slides[currentSlide]);
  }
}

function changeSlide(dir) {
  showSlide(currentSlide + dir);
}

function updateNavButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
}

function handleKeyboard(e) {
  switch (e.key) {
    case "ArrowRight":
    case "ArrowUp":
      changeSlide(-1);
      break;
    case "ArrowLeft":
    case "ArrowDown":
      changeSlide(1);
      break;
    case "Home":
      showSlide(0);
      break;
    case "End":
      showSlide(totalSlides - 1);
      break;
    default:
      break;
  }
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));
if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
document.addEventListener("keydown", handleKeyboard);

const answerButtons = document.querySelectorAll(".answer-toggle");
answerButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const answerId = btn.getAttribute("data-answer-id");
    const answerEl = document.getElementById(answerId);
    if (!answerEl) return;

    const isHidden = answerEl.classList.contains("d-none");
    answerEl.classList.toggle("d-none", !isHidden);
    btn.textContent = isHidden ? "הסתר תשובה" : "הצג תשובה";
  });
});

showSlide(0);

