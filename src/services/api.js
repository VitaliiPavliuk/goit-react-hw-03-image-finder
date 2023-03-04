import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33371810-0a52094386dea8583f801697d';
const PER_PAGE = 12;

export const requestImages = async (query, page) => {
  const searchParams = {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      page: page,
      per_page: PER_PAGE,
    },
  };

  const { data } = await axios.get(`${BASE_URL}`, searchParams);

  return data;
};

// export const requestPostComments = async postId => {
//   const { data } = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
//   );

//   return data;
// };

// export class PixabayAPI {
//   static BASE_URL = 'https://pixabay.com/api/';
//   static API_KEY = '33371810-0a52094386dea8583f801697d';
//   static PER_PAGE = 12;

//   constructor() {
//     this.page = null;
//     this.query = null;
//   }

//   fetchPhotosByQuery() {
//     const searchParams = {
//       params: {
//         key: PixabayAPI.API_KEY,
//         q: this.query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: this.page,
//         per_page: PixabayAPI.PER_PAGE,
//       },
//     };

//     return axios.get(`${PixabayAPI.BASE_URL}`, searchParams);
//   }
// }
