import axios from 'axios';

// const ROOT_URL = axios.create({ baseURL: process.env.REACT_APP_AXIOS_URI });

export const fetchAllProducts = (keyword, currentPage, price, rating) =>
  axios.get(
    `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
  );

export const fetchAllProductsCategory = (
  keyword,
  currentPage,
  price,
  category,
  rating
) =>
  axios.get(
    `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&rating[gte]=${rating}`
  );
export const fetchProductDetails = (id) => axios.get(`/api/v1/products/${id}`);

export const loginUser = (formData, config) =>
  axios.post('/api/v1/users/login', formData, { config });

export const registerUser = (userData, config) =>
  axios.post('/api/v1/users/register', userData, { config });
