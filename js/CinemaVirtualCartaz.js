const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const cards = document.querySelectorAll('.card_filmes');
const cardsPerView = 4; // quantidade de cards visíveis
let index = 0;

function updateCarousel() {
  const cardWidth = cards[0].offsetWidth + 30; // card + gap
  carousel.style.transform = `translateX(-${index * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if(index < cards.length - cardsPerView) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if(index > 0) {
    index--;
    updateCarousel();
  }
});