import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33371810-0a52094386dea8583f801697d';
export const PER_PAGE = 12;

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
