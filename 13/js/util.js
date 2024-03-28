const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandom = (min, max) => {
  const array = [];
  return function () {
    let number = getRandomInteger(min, max);
    if (array.length >= max - min + 1) {
      return null;
    }
    while (array.includes(number)) {
      number = getRandomInteger(min, max);
    }
    array.push(number);
    return number;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const openPopup = (popup, onDocumentKeydown) => {
  popup.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePopup = (popup, onDocumentKeydown) => {
  popup.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomInteger, getRandom, isEscapeKey, openPopup, closePopup, getRandomArrayElement, debounce };
