import { getData } from './api';
import { debounce } from './util.js';
import { getRandomArrayElement } from './util.js';
const pictures = document.querySelector('.pictures');
const body = document.querySelector('body');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const filters = document.querySelector('.img-filters');
const randomButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');
const defaultButton = filters.querySelector('#filter-default');
const errorDuration = 5000;
const RERENDER_DELAY = 500;
const IMAGES_COUNT = 10;
let count = 0;

const createErrorComment = (() => {
  body.append(templateDataError);
  setTimeout(() => {
    templateDataError.remove();
  }, errorDuration);
});

const getRandomImages = (photoData) => {
  const arr = [];

  for (let i = 0; i < IMAGES_COUNT; i++) {
    let random = getRandomArrayElement(photoData);

    if (arr.includes(random)) {
      random = getRandomArrayElement(photoData);
    }
    arr.push(random);
  }
  return arr;
};

const renderSimilarListPictures = (photoData) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].remove();
  }
  const photoDataFragment = document.createDocumentFragment();
  photoData.forEach(({ url, description, likes, comments }) => {
    const photoElement = templatePicture.cloneNode(true);
    const image = photoElement.querySelector('.picture__img');
    const text = photoElement.querySelector('.picture__info');
    const numberOfComments = text.children[0];
    const numberOfLikes = text.children[1];
    image.src = url;
    image.alt = description;
    numberOfLikes.textContent = likes;
    numberOfComments.textContent = comments.length;
    photoElement.setAttribute('data-id', count++);
    photoDataFragment.append(photoElement);
  });
  pictures.append(photoDataFragment);
  filters.classList.remove('img-filters--inactive');
};

randomButton.addEventListener('click', debounce(() => {
  randomButton.classList.add('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData((photoData) => {
    const result = getRandomImages(photoData);
    renderSimilarListPictures(result);
  });
},RERENDER_DELAY));

defaultButton.addEventListener('click', debounce(() => {
  defaultButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  discussedButton.classList.remove('img-filters__button--active');

  getData(renderSimilarListPictures);
},RERENDER_DELAY));

discussedButton.addEventListener('click', debounce(() => {
  discussedButton.classList.add('img-filters__button--active');
  randomButton.classList.remove('img-filters__button--active');
  defaultButton.classList.remove('img-filters__button--active');

  getData((photoData) => {
    const result = photoData.slice();
    result.sort((a, b) => b.comments.length - a.comments.length);
    renderSimilarListPictures(result);
  });
}, RERENDER_DELAY));

export { pictures, renderSimilarListPictures, createErrorComment };
