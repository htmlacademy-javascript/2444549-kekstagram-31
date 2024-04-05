import { getData } from './api.js';
import { renderSimilarListPictures, createErrorComment } from './thumbnails.js';
import { filterSort } from './sort.js';
import './full-size-modal.js';
import './user-form.js';
import './util.js';
import './image-scale.js';
import './apply-filters.js';

getData()
  .then((data) => {
    renderSimilarListPictures(data);
    filterSort(data);
  })
  .catch(() => {
    createErrorComment();
  });
