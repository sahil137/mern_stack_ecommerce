import React, { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { Dashboard, Person, ExitToApp, ListAlt } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Backdrop } from '@mui/material';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/actions/userAction';
import '../../../assets/css/user_options.css';

const UserOptions = (props) => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = props;
  const [open, setOpen] = useState(false);

  const dashboard = () => {
    navigate('/dashboard');
  };

  const orders = () => {
    navigate('/orders');
  };

  const account = () => {
    navigate('/account');
  };

  const logout = () => {
    dispatch(logoutUser());
    navigate('/');
    alert.success('Successfully Logged Out');
  };

  const dashboardOptions = [
    { icon: <ListAlt />, name: 'Orders', method: orders },
    { icon: <Person />, name: 'Profile', method: account },
    { icon: <ExitToApp />, name: 'Logout', method: logout },
  ];

  if (user.role === 'admin') {
    dashboardOptions.unshift({
      icon: <Dashboard />,
      name: 'Dashboard',
      method: dashboard,
    });
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial ToolTip"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        style={{ zIndex: '11' }}
        icon={
          <img
            src={user.avatar.url ? user.avatar.url : '/logo192.png'}
            className="speedDialIcon"
            alt="Profile"
          />
        }
      >
        {dashboardOptions.map((item) => (
          <SpeedDialAction
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.method}
            key={item.name}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
