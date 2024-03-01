import { createRandomIdFromRangeGenerator } from './data.js';

//Получаем случайный элемент массива//
const getRandomArrayElement = (elements) => elements[createRandomIdFromRangeGenerator(0, elements.length - 1)];

export { getRandomArrayElement };
