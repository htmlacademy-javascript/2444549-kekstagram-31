//Вызовы функций для генерации случайных заданных значений из диапазона//
const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateURL = createRandomIdFromRangeGenerator(1, 25);
const generateLikes = createRandomIdFromRangeGenerator(15, 300);
const generateCommentatorId = createRandomIdFromRangeGenerator(1, 999);
const generateAvatar = createRandomIdFromRangeGenerator(1, 6);
const amountOfComments = createRandomIdFromRangeGenerator(0, 30);

//Массив имен//
const NAMES = [
  'Иван',
  'Алексей',
  'Светлана',
  'Ирина',
  'Андрей',
  'Роман',
  'Александр',
  'Ксения',
  'Сергей',
  'Владимир',
  'Ольга',
];
//Массив комментариев//
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
];
//Массив описаний фото//
const DEFINITION = [
  'Красивое фото!',
  'Отличный ракурс!',
  'Классный вид!',
];
//Получаем случайное, целое, неповторяющееся число//
const createRandomIdFromRangeGenerator (min, max) => {
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
}
//Получаем случайное число комментариев под фото//
const getAmountOfComments = () => {
  for (let i = 0; i <= amountOfComments(); i++) {
    getRandomArrayElement(COMMENTS);
  }
}

//Получаем фото с описанием, лайками, комментариями//
const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: photos/{{generateURL()}}.jpg,
  description: getRandomArrayElement(DEFINITION),
  likes: generateLikes(),
  message: getRandomArrayElement(COMMENTS),
});

//Получаем случайного комментатора с аватаром и именем//
const createCommentator = () => ({
id: generateCommentatorId(),
avatar: img/avatar-{{generateAvatar()}}.svg
message: getAmountOfComments(),
name: getRandomArrayElement(NAMES),
});
