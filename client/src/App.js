import React, { useEffect } from 'react';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';

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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
