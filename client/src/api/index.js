import axios from 'axios';

// const ROOT_URL = axios.create({ baseURL: process.env.REACT_APP_AXIOS_URI });

// get request to fetch all products
export const fetchAllProducts = (keyword, currentPage, price, rating) =>
  axios.get(
    `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`
  );
// get request to fetch products category
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

// get request to fetch product Details
export const fetchProductDetails = (id) => axios.get(`/api/v1/products/${id}`);

// post request login user
export const loginUser = (formData, config) =>
  axios.post('/api/v1/users/login', formData, { config });

// post request register user
export const registerUser = (userData, config) =>
  axios.post('/api/v1/users/register', userData, { config });

// logout user
export const logout = () => axios.get('/api/v1/users/logout');

// update user details
export const updateProfile = (userData, config) =>
  axios.patch('/api/v1/users/userProfile/update', userData, { config });

// update password
export const updatePassword = (password, config) =>
  axios.patch('/api/v1/users/password/update', password, { config });

// forgot password
export const forgotPassword = (email, config) =>
  axios.post('/api/v1/users/password/forgot', email, { config });

export const resetPassword = (token, password, config) =>
  axios.patch(`/api/v1/users/password/reset/${token}`, password, { config });

// get request to get user profile
export const getUserProfile = () => axios.get('/api/v1/users/userProfile');
