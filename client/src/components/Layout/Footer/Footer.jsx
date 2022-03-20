import React from 'react';
import playStore from '../../../assets/svg/google-play-download.svg';
import appStore from '../../../assets/svg/app-store-download.svg';
import '../../../assets/css/footer.css';
const Footer = () => {
  return (
    <footer>
      <div className="left-footer">
        <h4>Downnload Our App</h4>
        <p>Download the app for Android and iOS devices</p>
        <img src={playStore} alt="Google Play Store" />
        <img src={appStore} alt="App Store" />
      </div>
      <div className="mid-footer">
        <h1>Binkart</h1>
        <p>Quality with Quantity</p>

        <p>Copyrights 2022 &copy; Sahil</p>
      </div>
      <div className="right-footer">
        <h4>Follow us</h4>
        <a href="https://www.google.com">Instagram</a>
        <a href="https://www.google.com">Youtube</a>
        <a href="https://www.google.com">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;
