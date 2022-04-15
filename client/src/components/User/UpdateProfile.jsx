import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/update_profile.css';
import MetaData from '../Layout/MetaData';
import { Face, MailOutline } from '@mui/icons-material';
import Loader from '../Layout/Loader/Loader';
import {
  updateUserProfile,
  clearError,
  loadUser,
} from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { UPDATE_USER_PROFILE_RESET } from '../../constants/userConstants';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userAuthReducer);
  const state = useSelector((state) => state.userProfileReducer);
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = state;
  const { user } = userData;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState('/logo192.png');

  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('avatar', avatar);
    dispatch(updateUserProfile(myForm));
  };

  const handleUpdateProfile = (event) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success('Profile Updated Successfully');
      dispatch(loadUser());

      navigate('/account');

      dispatch({
        type: UPDATE_USER_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <div className="updateProfileName">
                  <Face />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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

                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleUpdateProfile}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
