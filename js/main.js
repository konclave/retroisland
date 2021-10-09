import { collapseSection, expandSection } from './animation';

Promise.all([import('howler'), import('jquery')])
.then(([{ Howl }, { default: jQuery }]) => {
  window.Howl = Howl;
  window.jQuery = window.$ = jQuery;
  import('ilyabirman-jouele');
});


import 'ilyabirman-jouele/dist/jouele.css';

import '/styles/normalize.css';
import '/styles/main.css';
import '/styles/fonts.css';
import '/styles/mobile.css';
import '/styles/colors.css';

init();

function init() {
  initMobileNavigation()
  initTrackListToggle()
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

  trackSection.addEventListener('click', function(event) {
    if (!event.target.classList.contains('requested-item__toggle-visibility')) {
      return;
    }

    const current = event.target.parentElement.querySelector('.requested-item-tracks');
    if (current.hasAttribute('data-collapsed')) {
      const expanded = trackSection.querySelector('.requested-item-tracks:not([data-collapsed])');
      if (expanded) {
        collapseSection(expanded);
      }
      expandSection(current);
    } else {
      collapseSection(current);
    }
  });
}
