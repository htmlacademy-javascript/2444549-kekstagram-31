const NUMBER_SYSTEM_CALC = 10;
const MIN = 0;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandom = (min, max) => {
  const integers = [];
  return function () {
    let number = getRandomInteger(min, max);
    if (integers.length >= max - min + 1) {
      return null;
    }
    while (integers.includes(number)) {
      number = getRandomInteger(min, max);
    }
    integers.push(number);
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

const getNumber = (string) => {
  let number = '';
  string = string.toString().replaceAll(' ', '');
  for (let i = 0; i < string.length; i++) {
    if (isNaN(string[i])) {
      number += '';
    } else {
      number += parseInt(string[i], NUMBER_SYSTEM_CALC);
    }
  }
  if (string < MIN) {
    number *= 1;
  }
  return (number === '') ? 'NaN' : number;
};

export { getRandomInteger, getRandom, isEscapeKey, openPopup, closePopup, getRandomArrayElement, debounce, getNumber };
