import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/user_orders.css';
import MetaData from '../Layout/MetaData';
import { useAlert } from 'react-alert';
import Loader from '../Layout/Loader/Loader';
import { Typography } from '@mui/material';
import { clearErrors, getUserOrders } from '../../redux/actions/orderActions';
import { Link } from 'react-router-dom';
import { LaunchOutlined } from '@mui/icons-material';

const UserOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const orderState = useSelector((state) => state.userOrderReducer);
  const userState = useSelector((state) => state.userAuthReducer);

  const { loading, error, orders } = orderState;
  // console.log('Orders', orders);
  // // const { order } = order;
  const { user } = { userState };
  console.log(userState.user);

  const columns = [
    { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, 'status') === 'Delivered'
          ? 'greenColor'
          : 'redColor';
      },
    },
    {
      field: 'itemsQty',
      headerName: 'Items Qty',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: 'amount',
      headerName: 'Amount',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, 'id')}`}>
            <LaunchOutlined />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getUserOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <MetaData title={`${user?.name}'s Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="myOrdersPage">
            <Typography id="myOrdersTable">Your Orders</Typography>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
          </div>
        </>
      )}
    </>
  );
};

export default UserOrders;
