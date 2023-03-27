const axios = require('axios').default;


export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalAmount = 0;
  }

  async getElements() {
    const API_KEY = '34648725-bf27d478d17617710acdd3b55';
    const BASE_URL = 'https://pixabay.com/api/';
    try {
      const response = await axios.get(
        `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
      );
      this.incrementPage();
      return response.data;

    } catch (error) {
      console.error(error);
    }
  }

  
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get total() {
    return this.totalAmount;
  }

  set total(newTotal) {
    return this.totalAmount += newTotal;
  }
 
  resetTotal() {
    this.totalAmount = 0;
  }
  
}




