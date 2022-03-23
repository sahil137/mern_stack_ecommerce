import axios from 'axios';

// const ROOT_URL = axios.create({ baseURL: process.env.REACT_APP_AXIOS_URI });

export const fetchAllProducts = (keyword, currentPage) =>
  axios.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}`);
export const fetchProductDetails = (id) => axios.get(`/api/v1/products/${id}`);
