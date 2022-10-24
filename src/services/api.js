import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/';

 export const makeApiRequest = async (value, page) => {
    const response = await axios.get(`?q=${value}&page=${page}&key=${process.env.REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
    return await response.data
}
