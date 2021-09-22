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
