import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import '../scss/style.scss';

const readMoreButton = document.querySelector('.hero__more');

if (readMoreButton) {
  const extraText = document.getElementById(readMoreButton.getAttribute('aria-controls'));
  const readMoreLabel = readMoreButton.querySelector('.hero__more-text');

  readMoreButton.addEventListener('click', () => {
    const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true';
    extraText.classList.toggle('is-visible', isExpanded);
    readMoreButton.setAttribute('aria-expanded', String(isExpanded));
    readMoreLabel.textContent = isExpanded ? 'Read less' : 'Read more';
  });
}

const brandSection = document.querySelector('.brand-section');

if (brandSection) {
  const slider = brandSection.querySelector('.brands-slider');
  const previousButton = slider.querySelector('.brands-slider__button--previous');
  const nextButton = slider.querySelector('.brands-slider__button--next');
  const pagination = slider.querySelector('.brands-slider__pagination');
  const toggleButton = brandSection.querySelector('.brand-section__toggle');
  const toggleLabel = toggleButton.querySelector('.brand-section__toggle-label');

  const swiper = new Swiper(slider, {
    modules: [Navigation, Pagination],
    slidesPerView: 'auto',
    spaceBetween: 12,
    watchOverflow: true,
    navigation: {
      prevEl: previousButton,
      nextEl: nextButton,
    },
    pagination: {
      el: pagination,
      clickable: true,
      bulletClass: 'brands-slider__dot',
      bulletActiveClass: 'is-active',
      renderBullet(index, className) {
        return `<button class="${className}" type="button" aria-label="Show brand ${index + 1}"></button>`;
      },
    },
    breakpoints: {
      768: {
        enabled: false,
      },
    },
  });

  const updateSliderControls = () => {
    pagination.querySelectorAll('button').forEach((dot, index) => {
      dot.setAttribute('aria-current', String(index === swiper.activeIndex));
    });
    previousButton.disabled = swiper.isBeginning;
    nextButton.disabled = swiper.isEnd;
  };

  swiper.on('slideChange', updateSliderControls);
  updateSliderControls();

  toggleButton.addEventListener('click', () => {
    const isExpanded = brandSection.classList.toggle('is-expanded');
    toggleButton.setAttribute('aria-expanded', String(isExpanded));
    toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all';

    if (!isExpanded) {
      swiper.slideTo(0);
    }
  });
}