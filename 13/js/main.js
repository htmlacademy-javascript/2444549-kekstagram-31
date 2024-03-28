import { getData } from './api.js';
import { createErrorComment } from './thumbnails.js';
import { renderSimilarListPictures } from './thumbnails.js';
import './full-size-modal.js';
import './user-form.js';
import './util.js';
import './image-scale.js';
import './apply-filters.js';


getData(renderSimilarListPictures, createErrorComment);
