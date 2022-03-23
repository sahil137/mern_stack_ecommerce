import React, { useEffect } from 'react';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';

const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
