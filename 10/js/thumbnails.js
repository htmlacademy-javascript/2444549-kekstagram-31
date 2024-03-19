import { getThumbnail } from './data.js';
let count = 0;
const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content;
const templatePicture = template.querySelector('.picture');

const photoData = getThumbnail();
const photoDataFragment = document.createDocumentFragment();

photoData.forEach(({url, description, likes, comments}) => {
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

export { pictures, photoData };
