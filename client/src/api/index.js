import axios from 'axios';

// const ROOT_URL = axios.create({ baseURL: process.env.REACT_APP_AXIOS_URI });

export const fetchAllProducts = (keyword) =>
  axios.get(`/api/v1/products?keyword=${keyword}`);
export const fetchProductDetails = (id) => axios.get(`/api/v1/products/${id}`);
