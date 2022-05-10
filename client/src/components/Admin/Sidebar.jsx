import {
  Add,
  Dashboard,
  ExpandMore,
  ImportExport,
  People,
  PostAdd,
  RateReview,
} from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/sidebar.css';
import logo from '../../assets/images/FullLogo.jpeg';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { List } from '@mui/material';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <Link to="/admin/dashboard">
        <p>
          <Dashboard /> Dashboard
        </p>
      </Link>

      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<PostAdd />} />
          </Link>

          <Link to="/admin/create-product">
            <TreeItem nodeId="3" label="Create" icon={<Add />} />
          </Link>
        </TreeItem>
      </TreeView>

      <Link to="/admin/orders">
        <p>
          <List />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <People /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
