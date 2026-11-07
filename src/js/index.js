import '../scss/style.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Swiper from 'swiper'
import { A11y, Navigation, Pagination } from 'swiper/modules'

const readMoreButton = document.querySelector('.hero__more')

if (readMoreButton) {
  const extraText = document.getElementById(
    readMoreButton.getAttribute('aria-controls')
  )
  const readMoreLabel = readMoreButton.querySelector('.hero__more-text')

  readMoreButton.addEventListener('click', () => {
    const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true'
    extraText.classList.toggle('is-visible', isExpanded)
    readMoreButton.setAttribute('aria-expanded', String(isExpanded))
    readMoreLabel.textContent = isExpanded ? 'Read less' : 'Read more'
  })
}

const brandSection = document.querySelector('.brand-section')

if (brandSection) {
  const slider = brandSection.querySelector('.brands-slider')
  const toggleButton = brandSection.querySelector('.brand-section__toggle')
  const toggleLabel = toggleButton.querySelector('.brand-section__toggle-label')
  const swiper = new Swiper(slider, {
    modules: [Navigation, Pagination],
    slidesPerView: 1.2,
    spaceBetween: 12,
    navigation: {
      nextEl: slider.querySelector('.brands-slider__button--next'),
      prevEl: slider.querySelector('.brands-slider__button--previous')
    },
    pagination: {
      el: slider.querySelector('.brands-slider__pagination'),
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16
      }
    }
  })

  toggleButton.addEventListener('click', () => {
    const isExpanded = brandSection.classList.toggle('is-expanded')
    toggleButton.setAttribute('aria-expanded', String(isExpanded))
    toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all'

    if (isExpanded) {
      swiper.disable()
    } else {
      swiper.enable()
      swiper.slideTo(0)
      swiper.update()
    }
  })
}

const equipmentSection = document.querySelector('.equipment')

if (equipmentSection) {
  const slider = equipmentSection.querySelector('.equipment__slider')
  const toggleButton = equipmentSection.querySelector('.equipment__toggle')
  const toggleLabel = toggleButton.querySelector('.equipment__toggle-label')
  const swiper = new Swiper(slider, {
    modules: [Navigation],
    slidesPerView: 1.2,
    spaceBetween: 12,
    navigation: {
      nextEl: slider.querySelector('.equipment__button--next'),
      prevEl: slider.querySelector('.equipment__button--previous')
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 16
      }
    }
  })

  toggleButton.addEventListener('click', () => {
    const isExpanded = equipmentSection.classList.toggle('is-expanded')
    toggleButton.setAttribute('aria-expanded', String(isExpanded))
    toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all'

    if (isExpanded) {
      swiper.disable()
    } else {
      swiper.enable()
      swiper.slideTo(0)
      swiper.update()
    }
  })
}

const pricingCards = document.querySelector('.pricing__cards')

if (pricingCards) {
  const mobilePricingQuery = window.matchMedia('(max-width: 767px)')
  let pricingSwiper = null

  const syncPricingSwiper = () => {
    if (mobilePricingQuery.matches && !pricingSwiper) {
      pricingSwiper = new Swiper(pricingCards, {
        modules: [Pagination, A11y],
        slidesPerView: 1,
        pagination: {
          el: pricingCards.querySelector('.pricing__pagination'),
          clickable: true
        },
        a11y: {
          paginationBulletMessage: 'Go to service {{index}}'
        }
      })
    } else if (!mobilePricingQuery.matches && pricingSwiper) {
      pricingSwiper.destroy(true, true)
      pricingSwiper = null
    }
  }

  syncPricingSwiper()
  mobilePricingQuery.addEventListener('change', syncPricingSwiper)
}
