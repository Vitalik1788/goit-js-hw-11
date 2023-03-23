const axios = require('axios').default;

const API_KEY = '34648725-bf27d478d17617710acdd3b55';
const BASE_URL = 'https://pixabay.com/api/';

export default async function getElements(userInputAmount) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${API_KEY}&q=${userInputAmount}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
