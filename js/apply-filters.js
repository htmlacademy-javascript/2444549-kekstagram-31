const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const picturePreview = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

const addCheckHandler = (effectItem) => {
  const effectsRadio = effectItem.querySelector('.effects__radio');

  effectsRadio.addEventListener('click', () => {
    picturePreview.className = '';
    picturePreview.classList.add(`effects__preview--${effectsRadio.value}`);
    effectSlider.setAttribute('disabled', true);
  });
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
});

const changeLevelEffect = () => {

  switch(picturePreview.className) {
    case 'effects__preview--chrome':
      picturePreview.style.filter = `grayscale(${effectValue.value})`;
      break;
    case 'effects__preview--sepia':
      picturePreview.style.filter = `sepia(${effectValue.value})`;
      break;
    case 'effects__preview--marvin':
      picturePreview.style.filter = `invert(${effectValue.value}%)`;
      break;
    case 'effects__preview--heat':
      picturePreview.style.filter = `brightness(${effectValue.value})`;
      break;
    case 'effects__preview--phobos':
      picturePreview.style.filter = `blur(${effectValue.value}px)`;
      break;
    case 'effects__preview--none':
      picturePreview.style.filter = 'none';
      break;
  }
};

effectSlider.noUiSlider.on('update', () => {
  effectValue.value = effectSlider.noUiSlider.get();
  changeLevelEffect();
});


const changeSliderRange = (effectItem) => {
  const effectsRadio = effectItem.querySelector('.effects__radio');
  effectSlider.setAttribute('disabled', true);
  effectLevel.style.display = 'none';

  effectsRadio.addEventListener('click', () => {
    if (picturePreview.className === 'effects__preview--chrome' || picturePreview.className === 'effects__preview--sepia') {
      effectSlider.removeAttribute('disabled');
      effectLevel.style.display = 'block';
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
    } else if (picturePreview.className === 'effects__preview--marvin') {
      effectSlider.removeAttribute('disabled');
      effectLevel.style.display = 'block';
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
    } else if (picturePreview.className === 'effects__preview--heat') {
      effectSlider.removeAttribute('disabled');
      effectLevel.style.display = 'block';
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (picturePreview.className === 'effects__preview--phobos') {
      effectSlider.removeAttribute('disabled');
      effectLevel.style.display = 'block';
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
    } else if (picturePreview.className === 'effects__preview--none') {
      effectSlider.setAttribute('disabled', true);
      effectLevel.style.display = 'none';
      effectSlider.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
        connect: 'lower',
      });
    }
  });
};

for (let i = 0; i < effectsItems.length; i++) {
  addCheckHandler(effectsItems[i]);
  changeSliderRange(effectsItems[i]);
}
