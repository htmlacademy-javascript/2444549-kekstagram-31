const MIN_LIMIT = 0;
const MAX_LIMIT = 100;
const STEP = 25;
const scaleElement = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const image = document.querySelector('.img-upload__preview');
let number = parseInt(scaleElement.value, 10);

const changeScale = () => {
  image.style.transform = `scale(${number / 100})`;
};

scaleSmallerBtn.addEventListener('click', () => {
  if (number > MIN_LIMIT) {
    scaleBiggerBtn.disabled = false;
  }
  if (number === MIN_LIMIT) {
    scaleSmallerBtn.disabled = true;
  } else {
    scaleSmallerBtn.disabled = false;
    number -= STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});

scaleBiggerBtn.addEventListener('click', () => {
  if (number < MAX_LIMIT) {
    scaleSmallerBtn.disabled = false;
  }
  if (number === MAX_LIMIT) {
    scaleBiggerBtn.disabled = true;
  } else {
    scaleBiggerBtn.disabled = false;
    number += STEP;
    scaleElement.value = `${number}%`;
    changeScale();
  }
});
