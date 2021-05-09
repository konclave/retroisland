import '/styles/normalize.css';
import '/styles/main.css';
import '/styles/fonts.css';
import '/styles/mobile.css';

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
  });
}
