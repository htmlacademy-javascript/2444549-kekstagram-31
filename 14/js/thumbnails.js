import { getNumber } from './util';
const pictures = document.querySelector('.pictures');
const body = document.querySelector('body');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');
const templateDataError = document.querySelector('#data-error').content.querySelector('.data-error');
const errorDuration = 5000;

const createErrorComment = (() => {
  body.append(templateDataError);
  setTimeout(() => {
    templateDataError.remove();
  }, errorDuration);
});

const renderSimilarListPictures = (photoData) => {
  pictures.querySelectorAll('a.picture').forEach((element) => {
    element.remove();
  });
  const photoDataFragment = document.createDocumentFragment();
  photoData.forEach(({ url, description, likes, comments }) => {
    const photoElement = templatePicture.cloneNode(true);
    const image = photoElement.querySelector('.picture__img');
    const text = photoElement.querySelector('.picture__info');
    const numberOfComments = text.children[0];
    const numberOfLikes = text.children[1];
    image.src = url;
    const count = getNumber(image.src) - 1;
    image.alt = description;
    numberOfLikes.textContent = likes;
    numberOfComments.textContent = comments.length;
    photoElement.setAttribute('data-id', count);
    photoDataFragment.append(photoElement);
  });
  pictures.append(photoDataFragment);
};

export { pictures, renderSimilarListPictures, createErrorComment };
