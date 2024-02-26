const PUBLISHED_IMG_COUNT = 25;

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
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
//Массив описаний фото//
const DEFINITION = [
  'Красивое фото!',
  'Отличный ракурс!',
  'Классный вид!',
];

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

//Вызовы функций для генерации случайных заданных значений из диапазона//
const minPhotoId = 1;
const maxPhotoId = 25;
const generatePhotoId = createRandomIdFromRangeGenerator(minPhotoId, maxPhotoId);
const minUrl = 1;
const maxUrl = 25;
const generateURL = createRandomIdFromRangeGenerator(minUrl, maxUrl);
const minLikes = 15;
const maxLikes = 300;
const generateLikes = createRandomIdFromRangeGenerator(minLikes, maxLikes);
const minCommentatorId = 1;
const maxCommentatorId = 999;
const generateCommentatorId = createRandomIdFromRangeGenerator(minCommentatorId, maxCommentatorId);
const minAvatar = 1;
const maxAvatar = 6;
const generateAvatar = createRandomIdFromRangeGenerator(minAvatar, maxAvatar);
const minComments = 0;
const maxComments = 30;
const amountOfComments = createRandomIdFromRangeGenerator(minComments, maxComments);


//Получаем случайный элемент массива//
const getRandomArrayElement = (elements) => elements[createRandomIdFromRangeGenerator(0, elements.length - 1)];

//Получаем случайное число комментариев под фото//
const getAmountOfComments = () => {
  for (let i = 0; i <= amountOfComments(); i++) {
    getRandomArrayElement(COMMENTS);
  }
};

//Получаем случайного комментатора с аватаром и именем//
const getCommentator = () => ({
  id: generateCommentatorId(),
  avatar: `img/avatar-${generateAvatar()}.svg`,
  message: getAmountOfComments(),
  name: getRandomArrayElement(NAMES),
});

//Получаем фото с описанием, лайками, комментариями//
const createPhotoDescription = () => ({
  id: generatePhotoId(),
  url: `photos/${generateURL()}.jpg`,
  description: getRandomArrayElement(DEFINITION),
  likes: generateLikes(),
  comments: Array.from({length: amountOfComments()}), getCommentator,
});

const PhotoDescription = Array.from({length: PUBLISHED_IMG_COUNT}, createPhotoDescription);

PhotoDescription();
