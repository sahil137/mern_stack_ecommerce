import {
  AccountTree,
  AttachMoney,
  Description,
  Spellcheck,
  StorageOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/new_product.css';
import { ADMIN_NEW_PRODUCT_RESET } from '../../constants/productConstants';
import {
  clearErrors,
  createNewProduct,
} from '../../redux/actions/productAction';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const newProductState = useSelector((state) => state.newProductReducer);

  const { loading, error, success } = newProductState;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'Laptop',
    'Footwear',
    'Electronics',
    'SmartPhones',
    'Camera',
    'Accessories',
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Product Created Successfully ');
      navigate('/dashboard');
      dispatch({ type: ADMIN_NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const submitFormHandler = (event) => {
    event.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('stock', stock);

    images.forEach((image) => {
      myForm.append('images', image);
    });

    console.log(myForm);

    dispatch(createNewProduct(myForm));
  };

  const productImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          <form
            onSubmit={submitFormHandler}
            className="createProductForm"
            encType="multipart/form-data"
          >
            <h1>Create Product</h1>
            <div>
              <Spellcheck />
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Product Name"
              />
            </div>
            <div>
              <AttachMoney />
              <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            </div>
            <div>
              <Description />
              <textarea
                placeholder="Product Description"
                cols="30"
                rows="1"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <AccountTree />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageOutlined />
              <input
                type="number"
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
                required
              />
            </div>
            <div id="createProductFromFile">
              <input
                onChange={productImagesChange}
                type="file"
                name="avatar"
                accept="image/* "
              />
            </div>
            <div id="createProductFromImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>
            <Button
              disabled={loading ? true : false}
              id="createProductBtn"
              type="submit"
            >
              Create Product
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
