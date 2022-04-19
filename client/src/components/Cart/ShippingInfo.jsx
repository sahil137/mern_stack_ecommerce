import {
  Home,
  LocationCity,
  PinDrop,
  Public,
  MyLocation,
  Phone,
} from '@mui/icons-material';
import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Country, State } from 'country-state-city';
import '../../assets/css/shipping_info.css';
import MetaData from '../Layout/MetaData';
import CheckoutBar from './CheckoutBar';
import { saveShippingInfo } from '../../redux/actions/cartAction';
import { useNavigate } from 'react-router-dom';

const ShippingInfo = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // shipping info using useSelector doesnt seem to work ??
  // const data = useSelector((state) => state.cartReducer);
  // console.log('Data', data);
  // const { shippingInfo } = data;

  // get shiping info from local storage as using useSelector gives undefined
  const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'));

  const [address, setAddress] = useState(shippingInfo?.address);
  const [city, setCity] = useState(shippingInfo?.city);
  const [state, setState] = useState(shippingInfo?.state);
  const [country, setCountry] = useState(shippingInfo?.country);
  const [pincode, setPincode] = useState(shippingInfo?.pincode);
  const [phoneNumber, setPhoneNumber] = useState(shippingInfo?.phoneNumber);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (phoneNumber.length !== 10) {
      alert.error('Phone Number should be 10 digits Long');
      return;
    }
    const data = { address, city, state, country, pincode, phoneNumber };
    dispatch(saveShippingInfo(data));

    navigate('/order/confirm');
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <CheckoutBar activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={handleFormSubmit}
          >
            <div>
              <Home />
              <input
                required
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCity />
              <input
                required
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div>
              <PinDrop />
              <input
                required
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <div>
              <Phone />
              <input
                required
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                maxLength={10}
              />
            </div>
            <div>
              <Public />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <MyLocation />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
