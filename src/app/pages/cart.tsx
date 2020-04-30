import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Image from "react-bootstrap/Image";
import Loader from '../components/loader';
import { CartItem } from '../models/cart-item';


export interface ICartState {
  cart: CartItem[];
}
const StyledImage = styled(Image)`
  max-height: 3rem;
  max-width: 3rem;
`;
const StyledTableData = styled.td`
  text-align: center;
  vertical-align: middle;
`

const getTotalPrice = (a: number, b?: number) => b ? a + b : a;

const Cart = (props: any) => {
  let totalPrice;
  let imageSrc;
  const dispatch = useDispatch();
  const cart: {cartItems: CartItem[]} = useSelector<ICartState, any>(state => state.cart);
  const productId = props.match.params.id;
  const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  if (cart.cartItems.length) {
    totalPrice = cart.cartItems.map(c => c.price).reduce((a, b) => b ? a + b : a, 0).toFixed(2);
    imageSrc = require(`../../assets/images/${cart.cartItems[cart.cartItems.length - 1].source}`);
  }

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);
  
  return !cart.cartItems.length ? (
    <div>
      <Loader size="large" />
    </div>
  ) : (
    <Container>
      <Row>
        <Col>
          <h2>Your Shopping Cart</h2>
            <Table responsive borderless style={{maxWidth: '400px'}}>
            <tbody>
              <tr>
                <td style={{color: 'green'}}><FontAwesomeIcon icon="check-circle" className="fas" /></td>
                <td><StyledImage src={String(imageSrc)} alt="ii" rounded fluid /></td>
                <td style={{ color: 'green' }}><b>Added to Cart</b></td>
                </tr>
                <tr>
                  <td colSpan={3}>Subtotal ({cart.cartItems.length} items): <span style={{ color: 'red' }}><b>CDN${totalPrice}</b></span></td>
                </tr>
                <tr>
                  <td><Button>Cart</Button></td>
                  <td colSpan={2}><Button variant="primary">Proceed to checkout ({cart.cartItems.length} items)</Button></td>
                </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
 )
}

export default Cart;