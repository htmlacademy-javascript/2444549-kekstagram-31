import { getRandomInteger, getRandom } from './util.js';
let id = 0;

//константы//
const PUBLISHED_IMG_COUNT = 25;

const URL_ID = {
  min: 1,
  max: 25,
};

const LIKES = {
  min: 15,
  max: 300,
};

const COMMENTATOR_ID = {
  min: 1,
  max: 999,
};

const AVATAR = {
  min: 1,
  max: 6,
};

const COMMENTS_AMOUNT = {
  min: 0,
  max: 30,
};

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

const generatePhotoId = getRandom(URL_ID.min, URL_ID.max);
const generateIdComments = getRandom(COMMENTATOR_ID.min, COMMENTATOR_ID.max);
const generateGetAccess = (el) => el[getRandomInteger(0, el.length - 1)];

const getCommentator = () => {
  const array = [];
  for (let i = 0; i < getRandomInteger(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max); i++) {
    array.push({
      id: generateIdComments(),
      avatar: `img/avatar-${getRandomInteger(AVATAR.min, AVATAR.max)}.svg`,
      message: generateGetAccess(COMMENTS),
      name: generateGetAccess(NAMES)
    });
  }
  return array;
};

const getPhotoDescription = () => ({
  id: id++,
  url: `photos/${generatePhotoId()}.jpg`,
  description: generateGetAccess(DEFINITION),
  likes: getRandomInteger(LIKES.min, LIKES.max),
  comments: getCommentator()
});

const getThumbnail = () => Array.from({ length: PUBLISHED_IMG_COUNT }, getPhotoDescription);

export { getThumbnail, getPhotoDescription };
