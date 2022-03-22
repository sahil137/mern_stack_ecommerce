import axios from 'axios';

// const ROOT_URL = axios.create({ baseURL: process.env.REACT_APP_AXIOS_URI });

export const fetchAllProducts = () => axios.get(`/api/v1/products`);
export const fetchProductDetails = (id) => axios.get(`/api/v1/products/${id}`);
