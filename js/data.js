import { getRandomArrayElement, createRandomIdFromRangeGenerator } from './util.js';

//константы//
const PUBLISHED_IMG_COUNT = 25;

const PHOTO_ID = {
  min: 1,
  max: 25,
};

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

const photoId = createRandomIdFromRangeGenerator(PHOTO_ID.min, PHOTO_ID.max);
const getUrl = createRandomIdFromRangeGenerator(URL_ID.min, URL_ID.max);
const likes = createRandomIdFromRangeGenerator(LIKES.min, LIKES.max);
const CommentatorId = createRandomIdFromRangeGenerator(COMMENTATOR_ID.min, COMMENTATOR_ID.max);
const Avatar = createRandomIdFromRangeGenerator(AVATAR.min, AVATAR.max);
const amountOfComments = createRandomIdFromRangeGenerator(COMMENTS_AMOUNT.min, COMMENTS_AMOUNT.max);

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
//Получаем случайное число комментариев под фото//
const getAmountOfComments = () => {
  for (let i = 0; i <= amountOfComments(); i++) {
    getRandomArrayElement(COMMENTS);
  }
};
//Получаем случайного комментатора с аватаром и именем//
const getCommentator = () => ({
  id: CommentatorId(),
  avatar: `img/avatar-${Avatar()}.svg`,
  message: getAmountOfComments(),
  name: getRandomArrayElement(NAMES),
});
//Получаем фото с описанием, лайками, комментариями//
const createPhotoDescription = () => ({
  id: photoId(),
  url: `/photos/${getUrl()}.jpg`,
  description: getRandomArrayElement(DEFINITION),
  likes: likes(),
  comments: Array.from({length: amountOfComments()}), getCommentator,
});

const photoDescription = () => Array.from({length: PUBLISHED_IMG_COUNT}, createPhotoDescription);

photoDescription();

export { photoDescription };

