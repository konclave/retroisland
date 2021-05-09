(function() {
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
})();
