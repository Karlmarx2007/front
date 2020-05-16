import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IProductListState } from './all';
import { productListAction } from '../actions/productActions';
import Loader from '../components/loader';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import { Product } from '../models/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateProduct from '../components/create-product';

const Inventory = () => {
  const [state, setState] = useState({
    openModal: false
  });
  const dispatch = useDispatch();
  const productList = useSelector<IProductListState, any>(
    state => state.productList
  );
  
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(productListAction())
  }, [dispatch]);

  console.log('products > ', products);
  

  const createProductHandler = (value: boolean) => {
    setState({ ...state, openModal: value });
  }


  return (
    <Container>
      {!state.openModal ? <Row>
        <Col><Button variant="secondary" onClick={() => createProductHandler(true)}>Create Product</Button></Col>
      </Row> : undefined
      }
      {
        state.openModal ? 
          <Row>
            <Col><CreateProduct productHandler={createProductHandler}/></Col>
          </Row> : undefined
      }
      <Row className="mt-4">
        <Col><h5>All Inventory</h5></Col>
      </Row>
      {
        products ? 
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Dominant</th>
                        <th>Status</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p: Product, index: number) =>
                        <tr key={index + 1 + p.title}>
                          <td>{index + 1}</td>
                          <td>{p.title}</td>
                          <td>{p.type}</td>
                          <td>{p.dominant}</td>
                          <td>{p.available ? 'Available' : 'Out of stock'}</td>
                          <td><FontAwesomeIcon icon="edit" className="fas" /></td>
                          <td><FontAwesomeIcon icon="trash" className="fas" /></td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row> : undefined}
      
    </Container>
  );
  // return loading ? (
  //   <Fragment>
  //     <Loader size="large" />
  //   </Fragment>
  // ) : error ? (
  //   <Fragment>{error}</Fragment>
  // ) : !products.length ? (
  //   <Fragment>No Products to display</Fragment>
  // ) :(
  //   <Fragment>
  //     Inventory
  //   </Fragment>
  // )
}

export default Inventory;