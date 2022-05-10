import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../assets/css/dashboard.css';
import MetaData from '../Layout/MetaData';
import Sidebar from './Sidebar';
// import { Doughnut, Line } from 'react-chartjs-2';

const Dashboard = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state.productReducer);
  const { error, products } = productState;

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  // const lineState = {
  //   labels: ['Initial Amount', 'Amount Earned'],
  //   datasets: [
  //     {
  //       label: 'TOTAL AMOUNT',
  //       backgroundColor: ['tomato'],
  //       hoverBackgroundColor: ['rgb(197, 72, 49)'],
  //       data: [0, 4000],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ['Out of Stock', 'InStock'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#00A6B4', '#6800B4'],
  //       hoverBackgroundColor: ['#4B5000', '#35014F'],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard- Admin Panel" />
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>Total Amount</p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>
        {/* <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
