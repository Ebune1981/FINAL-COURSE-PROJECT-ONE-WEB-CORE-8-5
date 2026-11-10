import '../scss/style.scss'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Swiper from 'swiper'
import { A11y, Navigation, Pagination } from 'swiper/modules'

const menu = document.querySelector('.sidebar')
const menuToggle = document.querySelector('.header__button[aria-controls="sidebar-menu"]')
const menuClose = menu?.querySelector('.sidebar__icon-button[aria-label="Close menu"]')
const menuBackdrop = document.querySelector('.sidebar__backdrop')
const mobileMenuQuery = window.matchMedia('(max-width: 1023px)')

if (menu && menuToggle && menuClose && menuBackdrop) {
  let previousBodyOverflow = ''

  const getMenuFocusables = () =>
    [...menu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter(
      (element) => element.getClientRects().length > 0
    )

  const closeMenu = (restoreFocus = true) => {
    menu.classList.remove('sidebar--open')
    menuToggle.setAttribute('aria-expanded', 'false')
    menu.setAttribute('aria-hidden', 'true')
    menu.inert = true
    menu.removeAttribute('role')
    menu.removeAttribute('aria-modal')
    document.body.style.overflow = previousBodyOverflow
    if (restoreFocus) menuToggle.focus()
  }

  const openMenu = () => {
    if (!mobileMenuQuery.matches) return

    previousBodyOverflow = document.body.style.overflow
    menu.classList.add('sidebar--open')
    menuToggle.setAttribute('aria-expanded', 'true')
    menu.setAttribute('aria-hidden', 'false')
    menu.inert = false
    menu.setAttribute('role', 'dialog')
    menu.setAttribute('aria-modal', 'true')
    document.body.style.overflow = 'hidden'
    menuClose.focus()
  }

  menuToggle.addEventListener('click', openMenu)
  menuClose.addEventListener('click', closeMenu)
  menuBackdrop.addEventListener('click', closeMenu)

  document.addEventListener('keydown', (event) => {
    if (!menu.classList.contains('sidebar--open')) return

    if (event.key === 'Escape') {
      event.preventDefault()
      closeMenu()
      return
    }

    if (event.key !== 'Tab') return

    const focusables = getMenuFocusables()
    const first = focusables[0]
    const last = focusables[focusables.length - 1]

    if (!first || !last) {
      event.preventDefault()
      menuClose.focus()
    } else if (!menu.contains(document.activeElement)) {
      event.preventDefault()
      const target = event.shiftKey ? last : first
      target.focus()
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  })

  mobileMenuQuery.addEventListener('change', (event) => {
    if (!event.matches) {
      if (menu.classList.contains('sidebar--open')) {
        closeMenu(false)
      }

      menu.removeAttribute('aria-hidden')
      menu.inert = false
    } else if (!menu.classList.contains('sidebar--open')) {
      menu.setAttribute('aria-hidden', 'true')
      menu.inert = true
    }
  })

  if (mobileMenuQuery.matches) {
    menu.setAttribute('aria-hidden', 'true')
    menu.inert = true
  }
}

const readMoreButton = document.querySelector('.hero__more')

if (readMoreButton) {
  const extraText = document.getElementById(
    readMoreButton.getAttribute('aria-controls')
  )
  const readMoreLabel = readMoreButton.querySelector('.hero__more-text')

  readMoreButton.addEventListener('click', () => {
    const isExpanded = readMoreButton.getAttribute('aria-expanded') !== 'true'
    extraText.classList.toggle('hero__text--visible', isExpanded)
    readMoreButton.setAttribute('aria-expanded', String(isExpanded))
    readMoreLabel.textContent = isExpanded ? 'Read less' : 'Read more'
  })
}

const brandSection = document.querySelector('.brand-section')

if (brandSection) {
  const slider = brandSection.querySelector('.brands-slider')
  const toggleButton = brandSection.querySelector('.brand-section__toggle')
  const toggleLabel = toggleButton?.querySelector('.brand-section__toggle-label')
  const mobileBrandQuery = window.matchMedia('(max-width: 767px)')
  let brandSwiper = null

  const syncBrandSwiper = () => {
    if (mobileBrandQuery.matches && !brandSwiper) {
      brandSwiper = new Swiper(slider, {
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
        }
      })
      if (brandSection.classList.contains('brand-section--expanded')) {
        brandSwiper.disable()
      }
    } else if (!mobileBrandQuery.matches && brandSwiper) {
      brandSwiper.destroy(true, true)
      brandSwiper = null
    }
  }

  syncBrandSwiper()
  mobileBrandQuery.addEventListener('change', syncBrandSwiper)

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = brandSection.classList.toggle('brand-section--expanded')
      toggleButton.setAttribute('aria-expanded', String(isExpanded))
      if (toggleLabel) {
        toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all'
      }

      if (isExpanded) {
        brandSwiper?.disable()
      } else {
        brandSwiper?.enable()
        brandSwiper?.slideTo(0)
        brandSwiper?.update()
      }
    })
  }
}

const equipmentSection = document.querySelector('.equipment')

if (equipmentSection) {
  const toggleButton = equipmentSection.querySelector('.equipment__toggle')
  const toggleLabel = toggleButton?.querySelector('.equipment__toggle-label')

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const isExpanded = equipmentSection.classList.toggle('equipment--expanded')
      toggleButton.setAttribute('aria-expanded', String(isExpanded))
      if (toggleLabel) {
        toggleLabel.textContent = isExpanded ? 'Show less' : 'Show all'
      }
    })
  }
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
