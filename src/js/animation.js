export function collapseSection(element, options = {}) {
  const prop = options.horizontal ? 'width' : 'height';
  const dimension = options.horizontal ?
    element.getBoundingClientRect().width :
    element.scrollHeight;
  const elementTransition = element.style.transition;
  element.style.transition = '';
  requestAnimationFrame(function() {
    element.style[prop] = dimension + 'px';
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style[prop] = options.threshold || 0 + 'px';
    });
  });
  (options.attributeRecipient || element).setAttribute('data-collapsed', 'true');
}

export function expandSection(element, options = {}) {
  const prop = options.horizontal ? 'width' : 'height';
  const dimension = options.horizontal ?
    element.getBoundingClientRect().width :
    element.scrollHeight;
  element.style[prop] = dimension + 'px';

  function handleTransitioned() {
    element.style[prop] = null;
    element.removeEventListener('transitionend', handleTransitioned);
  }
  element.addEventListener('transitionend', handleTransitioned);
  (options.attributeRecipient || element).setAttribute('data-collapsed', 'false');
}

export function collapseH(element, options) {
  const dimension = element.getBoundingClientRect().width;
  const elementTransition = element.style.transition;
  element.style.transition = '';
  function handleTransitioned() {
    element.removeEventListener('transitionend', handleTransitioned);
  }
  element.addEventListener('transitionend', handleTransitioned);
  requestAnimationFrame(function() {
    element.style.flexBasis = dimension + 'px';
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style.flexBasis = options.threshold + 'px';
    });
  });
  (options.attributeRecipient || element).setAttribute('data-collapsed', 'true');
}

export function expandH(element, options) {
  const dimension = element.getBoundingClientRect().width;
  element.style.flexBasis = dimension + 'px';
  function handleTransitioned() {
    element.style.flexBasis = null;
    element.removeEventListener('transitionend', handleTransitioned);
  }
  element.addEventListener('transitionend', handleTransitioned);
  (options.attributeRecipient || element).setAttribute('data-collapsed', 'false');
}
