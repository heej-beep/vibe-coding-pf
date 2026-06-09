const workScroll = document.getElementById("workScroll");

let isDragging = false;
let startX = 0;
let startScrollLeft = 0;

workScroll.addEventListener("mousedown", (e) => {
  isDragging = true;
  workScroll.style.cursor = "grabbing";

  startX = e.pageX;
  startScrollLeft = workScroll.scrollLeft;
});

workScroll.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const distance = e.pageX - startX;
  workScroll.scrollLeft = startScrollLeft - distance;
});

workScroll.addEventListener("mouseup", () => {
  isDragging = false;
  workScroll.style.cursor = "grab";
});

workScroll.addEventListener("mouseleave", () => {
  isDragging = false;
  workScroll.style.cursor = "grab";
});
