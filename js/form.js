import { isEscapeKey, openPreview, closePreview } from './util.js';

const bodyElement = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const imgUploadPopup = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const uploadButtonClose = imgUploadPopup.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const textComment = imgUploadPopup.querySelector('.text__description');
const regex = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_LIMIT = 5;
const COMMENT_LIMIT = 140;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'information__error'
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target === hashtag || evt.target === textComment) {
      evt.stopPropagation();
    } else {
      imgUploadPopup.classList.add('hidden');
      uploadButton.value = '';
    }
  }
};

const validateHashtagName = (arr) => {
  arr = hashtag.value.trim('').split();
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i <= arr.length; i++) {
    if (!regex.test(arr[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagAmount = () => hashtag.value.trim('').split().length <= HASHTAG_LIMIT;

const validateHashtagSimilar = (arr) => {
  arr = hashtag.value.trim('').split();
  for (let i = 0; i < arr.length; i++) {
    const checkTag = arr[i];
    let count = 0;
    for(let k = 0; k < arr.length; k++) {
      if (checkTag === arr[k]) {
        count++;
      }
    }
    if (count > 1) {
      return false;
    }
  }
  return true;
};


const validateCommentaryLimit = () => textComment.length <= COMMENT_LIMIT;

uploadButton.addEventListener('change', () => {
  openPreview(imgUploadPopup, onDocumentKeydown);
  bodyElement.classList.add('modal-open');
});

uploadButtonClose.addEventListener('click', () => {
  closePreview(imgUploadPopup, onDocumentKeydown);
  bodyElement.classList.remove('modal-open');
});

pristine.addValidator(
  hashtag,
  validateHashtagName,
  'Неправильно введен хэштег'
);

pristine.addValidator(
  hashtag,
  validateHashtagAmount,
  'Превышен лимит хэштегов. Максимум хэштегов - 5'
);

pristine.addValidator(
  hashtag,
  validateHashtagSimilar,
  'Нельзя использовать одинаковые хэштеги'
);

pristine.addValidator(
  textComment,
  validateCommentaryLimit,
  'Превышен предел количества символов. Максимум 140 символов'
);

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if(!isValid) {
    evt.preventDefault();
  }
});

/*const validateHashtagSimilar = (arr) => {
  const uniqueHashtags = new Set(arr);
  return arr.length === uniqueHashtags.size;
};
*/
