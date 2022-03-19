import React, { useEffect } from 'react';

// import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Layout/Home/Home';

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
      </Routes>
      <Footer />
    </>
  );
};

export default App;
