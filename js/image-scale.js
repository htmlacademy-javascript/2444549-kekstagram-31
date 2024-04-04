const MIN_LIMIT = 0;
const MAX_LIMIT = 100;
const STEP = 25;
const scaleElement = document.querySelector('.scale__control--value');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview');
let number = parseInt(scaleElement.value, 10);

const changeScale = () => {
  image.style.transform = `scale(${number / 100})`;
};

scaleBiggerButton.addEventListener('click', () => {
  if (number > MIN_LIMIT) {
    scaleBiggerButton.disabled = false;
  }
  if (number === MIN_LIMIT) {
    scaleSmallerButton.disabled = true;
  } else {
    scaleSmallerButton.disabled = false;
    number -= STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});

scaleBiggerButton.addEventListener('click', () => {
  if (number < MAX_LIMIT) {
    scaleSmallerButton.disabled = false;
  }
  if (number === MAX_LIMIT) {
    scaleBiggerButton.disabled = true;
  } else {
    scaleBiggerButton.disabled = false;
    number += STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});
