export function collapseSection(element) {
  const sectionHeight = element.scrollHeight;
  const elementTransition = element.style.transition;
  element.style.transition = '';
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style.height = 0 + 'px';
    });
  });
  element.setAttribute('data-collapsed', '');
}

export function expandSection(element) {
  const sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  function handleTransitioned() {
    element.style.height = null;
    element.removeEventListener('transitionend', handleTransitioned);
  }
  element.addEventListener('transitionend', handleTransitioned);
  element.removeAttribute('data-collapsed');
}
