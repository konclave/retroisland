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
  const button = document.querySelector('.navigation-toggle');
  if (!button) {
    return;
  }
  button.addEventListener('click', function() {
    document.querySelector('.navigation').classList.toggle('navigation_visible');
    document.querySelector('body').classList.toggle('no-scroll');
  });
}


const TRACKS_SECTION_COLLAPSE_HEIGHT = 125;
function initTrackListToggle() {
  const buttonExpand = document.querySelector('.requested-item-tracks__button_expand');
  const buttonCollapse = document.querySelector('.requested-item-tracks__button_collapse');
  const listContainer = document.querySelector('.requested-item-tracks__list-container');

  buttonExpand.addEventListener('click', function() {
    expandSection(listContainer);
  });
  buttonCollapse.addEventListener('click', function() {
    collapseSection(listContainer);
  });
}

function collapseSection(element) {
  var sectionHeight = element.scrollHeight;
  var elementTransition = element.style.transition;
  element.style.transition = '';
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style.height = TRACKS_SECTION_COLLAPSE_HEIGHT + 'px';
    });
  });
  element.setAttribute('data-collapsed', 'true');
}

function expandSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  function handleTransitioned() {
    element.style.height = null;
    element.removeEventListener('transitionend', handleTransitioned);
  }
  element.addEventListener('transitionend', handleTransitioned);
  element.setAttribute('data-collapsed', 'false');
}
