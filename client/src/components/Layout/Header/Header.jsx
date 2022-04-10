import React from 'react';
import { ReactNavbar } from 'overlay-navbar';
import { FaUserAlt, FaSearch, FaShoppingCart } from 'react-icons/fa';
import logo from '../../../assets/images/FullLogo.jpeg';

const options = {
  navColor1: 'white',
  burgerColorHover: '#eb4034',
  logo,
  logoWidth: '250px',
  logoHoverColor: '#eb4034',
  nav2justifyContent: 'space-around',
  nav3justifyContent: 'space-around',
  nav1justifyContent: 'flex-end',
  nav4justifyContent: 'flex-start',
  link1Text: 'Home',
  link2Text: 'Products',
  link3Text: 'Contact',
  link4Text: 'About',
  link1Url: '/',
  link2Url: '/products',
  link3Url: '/contact',
  link4Url: '/about',
  link1ColorHover: '#eb4034',
  link1Color: 'rgba(35, 35, 35,0.8)',
  link1Size: '1.5rem',
  link1Padding: '3vmax',
  profileIcon: true,
  ProfileIconElement: FaUserAlt,
  profileIconColor: 'rgba(35, 35, 35,0.8)',
  profileIconColorHover: '#eb4034',
  searchIcon: true,
  SearchIconElement: FaSearch,
  searchIconColor: 'rgba(35, 35, 35,0.8)',
  cartIcon: true,
  CartIconElement: FaShoppingCart,
  cartIconColor: 'rgba(35, 35, 35,0.8)',
  searchIconColorHover: '#eb4034',
  cartIconColorHover: '#eb4034',
  cartIconMargin: '3vmax',
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
