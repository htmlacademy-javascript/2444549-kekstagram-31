import { isEscapeKey, openPopup, closePopup } from './util.js';
import { sendData } from './api.js';
import './apply-filters.js';

const inputElement = document.querySelector('#upload-file');
const picturePreview = document.querySelector('.img-upload__preview img');
const body = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const popup = document.querySelector('.img-upload__overlay');
const sliderElement = document.querySelector('.effect-level__slider');
const form = document.querySelector('.img-upload__form');
const uploadButtonClose = popup.querySelector('.img-upload__cancel');
const hashtag = document.querySelector('.text__hashtags');
const textComment = popup.querySelector('.text__description');
const templateSuccess = document.querySelector('#success').content;
const templateError = document.querySelector('#error').content;
const templateSuccessForm = templateSuccess.querySelector('.success');
const templateErrorForm = templateError.querySelector('.error');
const errorButton = templateErrorForm.querySelector('.error__button');
const successButton = templateSuccessForm.querySelector('.success__button');
const effectsPreview = document.querySelectorAll('.effects__preview');

const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const LIMIT_OF_HASHTAG = 5;
const LIMIT_OF_COMMENT = 140;

const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

inputElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (!file) {
    return;
  }
  const fileExtension = file.name.toLowerCase().split('.').at(-1);

  const isImage = IMAGE_TYPES.includes(fileExtension);
  if (isImage) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }
});

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
      popup.classList.add('hidden');
      sliderElement.noUiSlider.reset();
      uploadButton.value = '';
    }
  }
};

uploadButton.addEventListener('change', () => {
  openPopup(popup, onDocumentKeydown);
  body.classList.add('modal-open');
});

uploadButtonClose.addEventListener('click', () => {
  closePopup(popup, onDocumentKeydown);
  sliderElement.noUiSlider.reset();
  body.classList.remove('modal-open');
});

const validateHashtagName = (array) => {
  array = hashtag.value.trim().split(' ');
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i < array.length; i++) {
    if (!REGEX.test(array[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagAmount = () => hashtag.value.trim().split(' ').length <= LIMIT_OF_HASHTAG;

const validateHashtagSimilar = (array) => {
  const hashtagArr = array.toLowerCase().trim().split(' ');
  const uniqueHashtags = [...new Set(hashtagArr)];
  return hashtagArr.length === uniqueHashtags.length;
};

const validateLimitOfComment = () => textComment.value.length <= LIMIT_OF_COMMENT;
pristine.addValidator(
  hashtag,
  validateHashtagName,
  'Неправильно введен хэштег'
);
pristine.addValidator(
  hashtag,
  validateHashtagAmount,
  'Превышен лимит хэштегов. Максимум 5 доступно'
);
pristine.addValidator(
  hashtag,
  validateHashtagSimilar,
  'Нельзя использовать один и тот же хэштег дважды'
);
pristine.addValidator(
  textComment,
  validateLimitOfComment,
  'Превышен предел по количеству символов'
);

const createErrorForm = () => {
  openPopup(templateErrorForm, onDocumentKeydown);
  body.append(templateErrorForm);
};

const createSuccess = (evt, onSuccess) => {
  onSuccess(popup, onDocumentKeydown);
  evt.target.reset();
  body.append(templateSuccessForm);
};

const setUserForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      sendData(createErrorForm, new FormData(evt.target))
        .then(() => {
          createSuccess(evt, onSuccess);
        });
    }
  });
};

errorButton.addEventListener('click', () => {
  closePopup(templateErrorForm, onDocumentKeydown);
  templateErrorForm.remove();
});

successButton.addEventListener('click', () => {
  closePopup(templateSuccessForm, onDocumentKeydown);
  templateSuccessForm.remove();
  sliderElement.noUiSlider.reset();
});

setUserForm(closePopup);
