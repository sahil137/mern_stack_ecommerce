import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';
import '../../assets/css/profile.css';

const Profile = () => {
  const state = useSelector((state) => state.userAuthReducer);
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = state;
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <h1>My Profile</h1>
              <img src={user.avatar.url} alt="Avatar" />
              <Link to="/users/updateProfile">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Update Password</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
