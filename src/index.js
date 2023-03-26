import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import ApiService from './js/fetch-function';
import onCreateGalleryItem from './js/render-markup';
import onGalleryListClick from './js/simple_light_box';


const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  galleryMarkup: document.querySelector('.cards-list'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};

const lightbox = new SimpleLightbox('.gallery a');
const apiService = new ApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryListClick);

function onSearch(e) {
  e.preventDefault();
  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  apiService.resetPage();
  apiService.getElements().then(data => {
  apiService.total = data.hits.length;

    if (data.hits.length === 0) {
      Notiflix.Notify.failure(
        `Sorry, there are no images matching your search query: ${apiService.searchQuery}. Please try again.`
      );
      refs.galleryMarkup.innerHTML = '';
      return;
    }
    const markup = onCreateGalleryItem(data);
    refs.galleryMarkup.innerHTML = markup;

    lightbox.refresh();

    if (apiService.total !== data.totalHits) {
      refs.loadMore.style.visibility = 'visible';
    } else if (apiService.total === data.totalHits) {
      refs.loadMore.style.visibility = 'hidden';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
  });
};

function onLoadMore() {
  apiService.getElements().then(data => { 
    apiService.total = data.hits.length;

    const markup = onCreateGalleryItem(data);
    refs.galleryMarkup.insertAdjacentHTML('beforeend', markup);

    if (apiService.total === data.totalHits) {
      refs.loadMore.style.visibility = 'hidden';
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    lightbox.refresh();
  });
}



