import { renderSimilarListPictures } from './thumbnails.js';
import { debounce } from './util.js';

const MIN_PHOTO_COUNT = 0;
const MAX_PHOTO_COUNT = 10;
const NUMBER = 0.5;

const filtersForm = document.querySelector('.img-filters__form');
const buttonsChangeFilter = document.querySelectorAll('.img-filters__button');
const debounceRender = debounce(renderSimilarListPictures);

const changeFilter = (posts) => {

  filtersForm.addEventListener('click',
    (evt) => {
      const newPosts = [...posts];

      for (const btn of buttonsChangeFilter) {
        btn.classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');

      if(evt.target.id === 'filter-discussed') {
        renderSimilarListPictures(newPosts.sort((a,b) => b.comments.length - a.comments.length));
      } else if (evt.target.id === 'filter-random'){
        debounceRender(newPosts.splice(MIN_PHOTO_COUNT,MAX_PHOTO_COUNT).sort(() => NUMBER - Math.random()));
      } else {
        renderSimilarListPictures(posts);
      }
    });
};

const filterSort = (posts) => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  renderSimilarListPictures(posts);
  changeFilter(posts);
};

export { filterSort };
