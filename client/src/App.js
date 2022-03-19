import React, { useEffect } from 'react';

// import { Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';

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
      <Footer />
    </>
  );
};

export default App;
