const MIN_LIMIT = 0;
const MAX_LIMIT = 100;
const STEP = 25;

const scaleElement = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview');
let number = parseInt(scaleElement.value, 10);
let limit = 1;

const scaleReset = () => {
  limit = 1;
  image.style.transform = `scale(${limit})`;
};

const changeScale = () => {
  image.style.transform = `scale(${number / 100})`;
};

scaleSmallerButton.addEventListener('click', () => {
  if (number === MIN_LIMIT) {
    scaleSmallerButton.disabled = true;

  } else {
    scaleBiggerButton.disabled = false;
    number -= STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (number === MAX_LIMIT) {
    scaleBiggerButton.disabled = true;
  } else {
    scaleSmallerButton.disabled = false;
    number += STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});

export { scaleReset };
