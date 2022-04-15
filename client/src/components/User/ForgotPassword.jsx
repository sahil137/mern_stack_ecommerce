import React, { useEffect, useState } from 'react';
import '../../assets/css/forgot_password.css';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';
import { MailOutline } from '@mui/icons-material';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, forgotPassword } from '../../redux/actions/userAction';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const state = useSelector((state) => state.forgotPasswordReducer);
  const { error, message, loading } = state;

  const [email, setEmail] = useState('');

  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();

    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  }, [alert, dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>

              <form
                className="forgotPasswordForm"
                onSubmit={handleForgotPasswordSubmit}
              >
                <h4>Enter Email Address to Reset Password</h4>
                <div className="forgotPasswordEmail">
                  <MailOutline />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
