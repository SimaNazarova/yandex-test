////БЕГУЩАЯ СТРОКА\\\\
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

////ПЕРЕКЛЮЧЕНИЕ КАРТОЧЕК УЧАСТНИКОВ\\\\
// Размер экрана устройства
const screenWidth = screen.width;

const carousel = document.querySelector(".members__carousel");
const prevBtn =
  screenWidth > 820
    ? document.querySelector(".members__btns_up .prev")
    : document.querySelector(".members__btns_bottom .prev");
const nextBtn =
  screenWidth > 820
    ? document.querySelector(".members__btns_up .next")
    : document.querySelector(".members__btns_bottom .next");
const cards = document.querySelectorAll(".members__card");
const count = document.querySelectorAll(".members__numbers");

let autoSlideInterval;
let direction = "next";
function autoCarousel() {
  stopAutoCarousel();
  autoSlideInterval = setInterval(function () {
    const totalCards = cards.length;
    const totalPages = Math.ceil(totalCards / visibleCards);
    const currentPage =
      Math.floor(scrollPosition / (cards[0].offsetWidth + 40) / visibleCards) +
      1;

    if (currentPage < totalPages && direction === "next") {
      nextBtn.click();
    } else if (currentPage > 0 && direction === "prev") {
      prevBtn.click();
    }
  }, 4000);
}

// Остановка автоматической смены
function stopAutoCarousel() {
  clearInterval(autoSlideInterval);
}

let visibleCards = calculateVisibleCards();
let scrollPosition = 0;

// Функция для расчета видимых карточек
function calculateVisibleCards() {
  const cardWidth = cards[0].offsetWidth; // Ширина одной карточки
  return Math.floor(carousel.offsetWidth / cardWidth); // Сколько карточек помещается
}

// Обновляем видимые карточки при изменении размера окна
window.addEventListener("resize", () => {
  visibleCards = calculateVisibleCards();
  updateCounter();
  updateButtons();
  autoCarousel();
});

let gap = screenWidth > 820 ? 94 : 40;
// Прокрутка вперед

nextBtn.addEventListener("click", () => {
  if (direction === "prev") {
    return;
  } else {
    const cardWidth = cards[0].offsetWidth + gap; // Ширина карточки + gap
    scrollPosition += cardWidth * visibleCards;
    carousel.scrollLeft = scrollPosition;
    updateCounter();
    updateButtons();
    stopAutoCarousel();
    autoCarousel();
  }
});

// Прокрутка назад

prevBtn.addEventListener("click", () => {
  direction = "prev";
  const cardWidth = cards[0].offsetWidth + gap; // Ширина карточки + gap
  scrollPosition -= cardWidth * visibleCards;
  carousel.scrollLeft = scrollPosition;
  updateCounter();
  updateButtons();
  stopAutoCarousel();
  autoCarousel();
});

// Обновляем состояние кнопок
function updateButtons() {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  prevBtn.disabled = scrollPosition <= 0;

  nextBtn.disabled = scrollPosition >= maxScroll;
}

//Обновляем счетчик
function updateCounter() {
  const totalCards = cards.length;
  const totalPages = Math.ceil(totalCards / visibleCards);
  const currentPage =
    Math.floor(scrollPosition / (cards[0].offsetWidth + gap) / visibleCards) +
    1;
  for (let i = 0; i < count.length; i++) {
    count[i].textContent = `${currentPage} / ${totalPages}`;
  }
  if (currentPage === totalPages) {
    direction = "prev";
  }
  if (currentPage === 1) {
    direction = "next";
  }
}

////ПЕРЕКЛЮЧЕНИЕ КАРТОЧЕК ЭТАПОВ"\\\\
const prevBtnBullet = document.querySelector(".steps__btn.prev");
const nextBtnBullet = document.querySelector(".steps__btn.next");
const bullets = document.querySelectorAll(".step__bullet");
const stepsCards = document.querySelectorAll(".steps__card");
const carouselTrack = document.querySelector(".steps__cards"); // Контейнер карточек

let currentIndex = 0; // Индекс текущей карточки

// Обновление положения карточек и состояния элементов
function updateStepsCarousel() {
  const cardWidth = stepsCards[0].offsetWidth; // Ширина одной карточки
  carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

  // Обновление буллетов
  bullets.forEach((bullet, index) => {
    bullet.classList.toggle("active", index === currentIndex);
  });

  // Отключение кнопок на границах
  prevBtnBullet.disabled = currentIndex === 0;
  nextBtnBullet.disabled = currentIndex === 4;
}

// Переключение вперед
nextBtnBullet.addEventListener("click", () => {
  if (currentIndex < stepsCards.length - 1) {
    currentIndex++;
    updateStepsCarousel();
  }
});

// Переключение назад
prevBtnBullet.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateStepsCarousel();
  }
});

// Инициализация
updateButtons();
updateCounter();
autoCarousel();

updateStepsCarousel();
