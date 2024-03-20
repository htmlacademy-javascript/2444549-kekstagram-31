function getRandomInteger(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

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

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.key === 'Enter';

const openPreview = (preview, onDocumentKeydown) => {
  preview.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closePreview = (preview, onDocumentKeydown) => {
  preview.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

export { getRandomInteger, getRandom, isEnterKey, isEscapeKey, openPreview, closePreview };
