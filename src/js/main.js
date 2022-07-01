import '@justinribeiro/lite-youtube';
import { collapseSection, expandSection, collapseH, expandH } from './animation';
import { init as initSearch } from './search';
import './catalogue';
import 'ilyabirman-jouele/dist/jouele.css';
import './fotorama/fotorama.css';
import '../styles/normalize.css';
import '../styles/main.css';
import '../styles/fonts.css';
import '../styles/colors.css';
import '../styles/mobile.css';
import '../styles/desktop.css';

const MOBILE_BREAKPOINT = 810;

Promise.all([import('howler'), import('jquery')])
.then(([{ Howl }, { default: jQuery }]) => {
  window.Howl = Howl;
  window.jQuery = window.$ = jQuery;
  import('ilyabirman-jouele');
  import('./fotorama/fotorama');
});

init();

function init() {
  initMobileNavigation();
  initTrackListToggle();
  initSearch();
}

function initMobileNavigation() {
  const navigationContainer = document.querySelector('.navigation');
  if (!navigationContainer) {
    return;
  }
  navigationContainer.addEventListener('click', function(event) {
    if (!event.target.classList.contains('navigation-button') &&
      !event.target.closest('.navigation-button')
    ) {
      return;
    }
    navigationContainer.classList.toggle('navigation_visible');
    document.querySelector('body').classList.toggle('no-scroll');
  });
}

function initTrackListToggle() {
  const trackSection = document.querySelector('.tracks-on-request');
  if (!trackSection) {
    return;
  }

  if (window.innerWidth > MOBILE_BREAKPOINT) {
    trackSection.querySelector('.requested-list__item').setAttribute('data-collapsed', 'false');
    window.addEventListener('resize', throttle(setTrackContainerWidth, 250))
  }

  function setTrackContainerWidth() {
    setTimeout(() => {
      const { width } = trackSection.querySelector('[data-collapsed="false"]').getBoundingClientRect();
      trackSection.querySelectorAll('.requested-item-tracks').forEach((element) => {
        element.style.width = width + 'px';
      });
    }, 300);
  }

  trackSection.addEventListener('click', function(event) {
    if (!event.target.classList.contains('requested-item__toggle-visibility')) {
      return;
    }

    if (window.innerWidth > MOBILE_BREAKPOINT) {
      const toggleButtonElement = trackSection.querySelector('.requested-item__toggle-visibility');
      const toggleButtonHeight = window.getComputedStyle(toggleButtonElement).getPropertyValue('height');
      const threshold = parseInt(toggleButtonHeight);
      const opened = trackSection.querySelector('[data-collapsed="false"]');
      const next = event.target.closest('.requested-list__item');
      if (opened) {
        collapseH(opened, { threshold });
      }
      if (next) {
        expandH(next, { threshold })
      }
    } else {
      const currentContainer = event.target.closest('.requested-list__item');
      const currentTracksList = event.target.parentElement.querySelector('.requested-item-tracks');
      if (currentContainer.getAttribute('data-collapsed') === 'true') {
        const expanded = trackSection.querySelector('[data-collapsed="false"] .requested-item-tracks');
        if (expanded) {
          const expandedContainer = expanded.closest('.requested-list__item');
          collapseSection(expanded, { attributeRecipient: expandedContainer });
        }
        expandSection(currentTracksList, { attributeRecipient: currentContainer });
      } else {
        collapseSection(currentTracksList, { attributeRecipient: currentContainer });
      }
    }
  });
}

function throttle(fn, delay) {
  let lastCalled = 0;
  return (...args) => {
    let now = new Date().getTime();
    if(now - lastCalled < delay) {
      return;
    }
    lastCalled = now;
    return fn(...args);
  }
}
