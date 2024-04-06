import { isEscapeKey, openPopup, closePopup } from './util.js';
import { sendData } from './api.js';
import { scaleReset } from './image-scale.js';

const LIMIT_OF_HASHTAG = 5;
const LIMIT_OF_COMMENT = 140;

const REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

const IMAGES_FORMAT = ['jpg', 'jpeg', 'png'];

const SubmitButtonTexts = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикуется...'
};

const inputElement = document.querySelector('#upload-file');
const picturePreview = document.querySelector('.img-upload__preview img');
const body = document.querySelector('body');
const uploadButton = document.querySelector('.img-upload__input');
const sumbitButton = document.querySelector('.img-upload__submit');
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
const effectsPreview = document.querySelectorAll('.effects__preview');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'information__error'
}, false);

const resetAllData = () => {
  sliderElement.noUiSlider.reset();
  body.classList.remove('modal-open');
  scaleReset();
  form.reset();
};

inputElement.addEventListener('change', (evt) => {
  const file = evt.target.files[0];
  if (!file) {
    return;
  }
  const fileExtension = file.name.toLowerCase().split('.').at(-1);

  const isImage = IMAGES_FORMAT.includes(fileExtension);
  if (isImage) {
    picturePreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((el) => {
      el.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    picturePreview.style.filter = 'none';
    effectSlider.setAttribute('disabled', true);
    effectLevel.style.display = 'none';
  }
});

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (evt.target === hashtag || evt.target === textComment) {
      evt.stopPropagation();
    } else {
      closePopup(popup, onDocumentKeydown);
      resetAllData();
    }
  }
};

const addPhoto = () => {
  const file = uploadButton.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGES_FORMAT.some((element) => fileName.endsWith(element));
  if (matches) {
    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
    picturePreview.src = URL.createObjectURL(file);
  }
};

uploadButton.addEventListener('change', () => {
  openPopup(popup, onDocumentKeydown);
  effectLevel.classList.add('hidden');
  body.classList.add('modal-open');
  addPhoto();
});

uploadButtonClose.addEventListener('click', () => {
  closePopup(popup, onDocumentKeydown);
  resetAllData();
});

const blockSubmitButton = () => {
  sumbitButton.disabled = true;
  sumbitButton.textContent = SubmitButtonTexts.SENDING;
};

const unblockSubmitButton = () => {
  sumbitButton.disabled = false;
  sumbitButton.textContent = SubmitButtonTexts.IDLE;
};

const validateHashtagName = (hashtags) => {
  hashtags = hashtag.value.trim().split(' ');
  if (hashtag.value === '') {
    return true;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!REGEX.test(hashtags[i])) {
      return false;
    }
  }
  return true;
};

const validateHashtagAmount = () => hashtag.value.trim().split(' ').length <= LIMIT_OF_HASHTAG;

const validateHashtagSimilar = (hashtags) => {
  const hashtagArr = hashtags.toLowerCase().trim().split(' ');
  const tags = [...new Set(hashtagArr)];
  return hashtagArr.length === tags.length;
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

const closeMessage = (evt) => {
  evt.stopPropagation();
  const existElement = document.querySelector('.success') || document.querySelector('.error');
  const closeButton = existElement.querySelector('button');
  if (evt.target === existElement || evt.target === closeButton || isEscapeKey(evt)) {
    existElement.remove();
    body.removeEventListener('click', closeMessage);
    body.removeEventListener('keydown', closeMessage);
  }
};

const appendMessage = (template) => {
  const messageNode = template.cloneNode(true);
  body.append(messageNode);
  body.addEventListener('click', closeMessage);
  body.addEventListener('keydown', closeMessage);
};

const setUserForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (valid) {
      blockSubmitButton();
      pristine.reset();
      sendData(new FormData(evt.target))
        .then(() => {
          appendMessage(templateSuccessForm);
          popup.classList.add('hidden');
          body.classList.remove('modal-open');
          evt.target.reset();
          sliderElement.noUiSlider.reset();
          form.reset();
          resetAllData();
          form.removeEventListener('submit', addPhoto);
        })
        .catch(() => {
          appendMessage(templateErrorForm);
        })
        .finally(() => unblockSubmitButton());
    }
  });
};

errorButton.addEventListener('click', () => {
  closePopup(templateErrorForm, onDocumentKeydown);
  templateErrorForm.remove();
});

setUserForm();
