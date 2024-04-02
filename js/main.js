import { getData } from './api.js';
import { renderSimilarListPictures, createErrorComment } from './thumbnails.js';
import { adjustSort } from './sort.js';
import './full-size-modal.js';
import './user-form.js';
import './util.js';
import './image-scale.js';

getData()
  .then((data) => {
    renderSimilarListPictures(data);
    adjustSort(data);
  })
  .catch(() => {
    createErrorComment();
  });
