import './src/styles/main.scss';

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
  const track = slider.querySelector('.brands-slider__track');
  const slides = Array.from(track.querySelectorAll('.brands-slider__slide'));
  const previousButton = slider.querySelector('.brands-slider__button--previous');
  const nextButton = slider.querySelector('.brands-slider__button--next');
  const pagination = slider.querySelector('.brands-slider__pagination');
  const toggleButton = brandSection.querySelector('.brand-section__toggle');
  const toggleLabel = toggleButton.querySelector('.brand-section__toggle-label');
  let activeIndex = 0;

  const getStep = () => {
    const slide = slides[0];
    const styles = window.getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  const updateSlider = () => {
    const lastIndex = Math.max(0, slides.length - 1);
    activeIndex = Math.min(activeIndex, lastIndex);
    track.scrollTo({ left: activeIndex * getStep(), behavior: 'smooth' });
    pagination.querySelectorAll('button').forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-current', String(isActive));
    });
    previousButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === lastIndex;
  };

  slides.forEach((slide, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'brands-slider__dot';
    dot.setAttribute('aria-label', `Show brand ${index + 1} of ${slides.length}`);
    dot.addEventListener('click', () => {
      activeIndex = index;
      updateSlider();
    });
    pagination.append(dot);
  });

  previousButton.addEventListener('click', () => {
    activeIndex = Math.max(0, activeIndex - 1);
    updateSlider();
  });

  nextButton.addEventListener('click', () => {
    activeIndex = Math.min(slides.length - 1, activeIndex + 1);
    updateSlider();
  });

  track.addEventListener('scroll', () => {
    if (brandSection.classList.contains('is-expanded')) return;

    const step = getStep();
    const nextIndex = Math.round(track.scrollLeft / step);
    if (nextIndex !== activeIndex) {
      activeIndex = nextIndex;
      pagination.querySelectorAll('button').forEach((dot, index) => {
        const isActive = index === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', String(isActive));
      });
      previousButton.disabled = activeIndex === 0;
      nextButton.disabled = activeIndex === slides.length - 1;
    }
  }, { passive: true });

  toggleButton.addEventListener('click', () => {
    const isExpanded = brandSection.classList.toggle('is-expanded');
    toggleButton.setAttribute('aria-expanded', String(isExpanded));
    toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all';

    if (!isExpanded) {
      activeIndex = 0;
      track.scrollTo({ left: 0 });
      updateSlider();
    }
  });

  window.addEventListener('resize', updateSlider);
  updateSlider();
}