import Notiflix from 'notiflix';

import getElements from "./js/fetch-function";
import onCreateGalleryItem from './js/render-markup';


const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  galleryMarkup: document.querySelector('.cards-list'),
};

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const inputAmount = refs.input.value;
  getElements(inputAmount).then(response => {
    if (response.data.total === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    const markup = onCreateGalleryItem(response);
    refs.galleryMarkup.innerHTML = markup;
  })
};




