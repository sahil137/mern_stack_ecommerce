import React, { useEffect, useState } from 'react';
import Loader from '../Layout/Loader/Loader';
import '../../assets/css/update_password.css';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../Layout/MetaData';
import { LockOpen, Lock, VpnKey } from '@mui/icons-material';
import { clearError, updatePassword } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const state = useSelector((state) => state.userProfileReducer);
  const { error, isUpdated, loading } = state;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success('Profile Updated Succussfully');
      navigate('/account');
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, alert, error, isUpdated, navigate]);

  const handleUpdatePasswordSubmit = (event) => {
    event.preventDefault();

    const myForm = new FormData();

    myForm.set('confirmPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmNewPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={handleUpdatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKey />
                  <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpen />
                  <input
                    name="newPassword"
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <Lock />
                  <input
                    name="confirmNewPassword"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
