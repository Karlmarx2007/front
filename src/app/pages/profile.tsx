import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../actions/order-actions';
import { Order } from '../models/order';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CartItem } from '../models/cart-item';
import Loader from '../components/loader';
interface IUserOrder {
  orders: [Order];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  heading: {
    width: '100%',
    textAlign: 'center'
  }
});

function createData(name: string, price: number, quantity: number, status: string, date: Date) {
  return { name, price, quantity, status, date };
}

const Profile = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector<IUserOrder, any>(
    (state) => state.orders
  );
  const orders = userOrders && userOrders.orders ? userOrders.orders : [];
  const error = userOrders.error || '';
  const loading = userOrders && userOrders.loading || false;
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const data = orders.length && orders.map((order: Order) => {
    return order.cartItems.map((item: CartItem) => {
      return createData(item.title, item.price, item.quantity, order.status, order.date);
    })
  });
  const classes = useStyles();

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : orders.length ? (
        <Fragment>
          <h2 className={classes.heading}>My Orders</h2>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity(g)</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((rows: any) => (
                  rows.map((row: any, index: number) => (
                    <TableRow key={row.name + index}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">{new Date(row.date).toDateString()}</TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </TableContainer>
    </Fragment>
  ) : null
}

export default Profile;