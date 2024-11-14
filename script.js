function Marquee(selector, speed, direction) {
  const parentSelector = document.querySelector(selector);
  const clone = parentSelector.innerHTML;
  const firstElement = parentSelector.children[0];

  parentSelector.insertAdjacentHTML("beforeend", clone);
  parentSelector.insertAdjacentHTML("beforeend", clone);

  if (direction === "left") {
    let i = 0;

    setInterval(function () {
      firstElement.style.marginLeft = `-${i}px`;
      if (i > firstElement.clientWidth) {
        i = 0;
      }
      i = i + speed;
    }, 0);
  } else {
    let i = firstElement.clientWidth;

    setInterval(function () {
      firstElement.style.marginLeft = `${i}px`;
      if (i >= 0) {
        i = -firstElement.clientWidth;
      }
      i = i + speed;
    }, 0);
  }
}

window.addEventListener("load", Marquee("#marquee-left", 0.2, "left"));
window.addEventListener("load", Marquee("#marquee-right", 0.2, "right"));
