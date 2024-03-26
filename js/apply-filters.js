const effectsList = document.querySelector('.effects__list');
const effectsItems = effectsList.querySelectorAll('.effects__item');
const picrurePreview = document.querySelector('.img-upload__preview img');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');

const addCheckHandler = (effectItem) => {
  const effectsRadio = effectItem.querySelector('.effects__radio');

  effectsRadio.addEventListener('click', () => {
    picrurePreview.className = '';
    picrurePreview.classList.add(`effects__preview--${effectsRadio.value}`);
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

  switch(picrurePreview.className) {
    case 'effects__preview--chrome':
      picrurePreview.style.filter = `grayscale(${effectValue.value})`;
      break;
    case 'effects__preview--sepia':
      picrurePreview.style.filter = `sepia(${effectValue.value})`;
      break;
    case 'effects__preview--marvin':
      picrurePreview.style.filter = `invert(${effectValue.value}%)`;
      break;
    case 'effects__preview--heat':
      picrurePreview.style.filter = `brightness(${effectValue.value})`;
      break;
    case 'effects__preview--phobos':
      picrurePreview.style.filter = `blur(${effectValue.value}px)`;
      break;
    case 'effects__preview--none':
      picrurePreview.style.filter = 'none';
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

  effectsRadio.addEventListener('click', () =>{
    if (picrurePreview.className === 'effects__preview--chrome' || picrurePreview.className === 'effects__preview--sepia') {
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
    } else if (picrurePreview.className === 'effects__preview--marvin') {
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
    } else if (picrurePreview.className === 'effects__preview--heat') {
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
    } else if (picrurePreview.className === 'effects__preview--phobos') {
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
    } else if (picrurePreview.className === 'effects__preview--none') {
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
