import React, { useState } from 'react';
import '../../assets/css/search.css';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layout/MetaData';
const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate('/products');
    }
  };
  return (
    <>
      <MetaData title={'Search a product'} />
      <form className="searchBox" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Search a product..."
          onChange={handleChange}
        />
        <input type="submit" value="Search"></input>
      </form>
    </>
  );
};

export default Search;
