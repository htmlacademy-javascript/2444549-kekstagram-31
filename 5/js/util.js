//Получаем случайное, целое, неповторяющееся число//
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  const getRandomInteger = (a, b) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
  };
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

//Получаем случайный элемент массива//
const getRandomArrayElement = (elements) => elements[createRandomIdFromRangeGenerator(0, elements.length - 1)];

export { createRandomIdFromRangeGenerator };
export { getRandomArrayElement };
