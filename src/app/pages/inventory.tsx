import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IProductListState } from './all';
import { productListAction, productDeleteAction } from '../actions/productActions';
import { Container, Row, Col, Button, Table, Card } from 'react-bootstrap';
import { Product } from '../models/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateProduct from '../components/create-product';
import { IUserSignIn } from './signin';
import Confirm from '../components/confirm';

export interface INewProduct {
  newProductDetails: any
};

export interface IProductDelete {
  productDeleted: any
};

export interface IProductUpdate {
  productUpdate: any
};

const Inventory = () => {
  const [state, setState] = useState<any>({
    openModal: false,
    editProduct: undefined
  });
  const dispatch = useDispatch();
  const productList = useSelector<IProductListState, any>(
    state => state.productList
  );
  const newProductDetails = useSelector<INewProduct, any>(
    state => state.newProductDetails
  );

  const productDeleted = useSelector<IProductDelete, any>(
    state => state.productDeleted
  );

  const productUpdated = useSelector<IProductUpdate, any>(
    state => state.productUpdate
  );

  const userSignIn = useSelector<IUserSignIn, any>(
    (state) => state.userSignIn
  );
  const { userInfo } = userSignIn;

  const { products } = productList;
  useEffect(() => {
    dispatch(productListAction())
  }, [dispatch, newProductDetails, productDeleted, productUpdated]);
  

  const createProductHandler = (openModal: boolean, editProduct?: Product) => {
    setState({openModal, editProduct });
  };

  const handleDelete = (id: string) => {
    dispatch(productDeleteAction(id, userInfo));
  };


  return (
    <Container>
      {!state.openModal ? <Row>
        <Col><Button variant="secondary" onClick={() => createProductHandler(true)}>Create Product</Button></Col>
      </Row> : undefined
      }
      {
        state.openModal ? 
          <Row>
            <Col><CreateProduct product={state.editProduct} productHandler={createProductHandler}/></Col>
          </Row> : undefined
      }
      {
        products && !state.openModal ? 
          <Fragment>
            <Row className="mt-4">
              <Col><h5>All Inventory</h5></Col>
            </Row>
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
                            <td><FontAwesomeIcon icon="edit" className="fas" onClick={() => createProductHandler(true, p)} /></td>
                            {/* <td><FontAwesomeIcon icon="trash" className="fas" onClick={() => handleDelete(p._id)} /></td> */}
                            <td>
                              <Confirm
                                icon="trash"
                                confirm={() => handleDelete(p._id)}
                              />
                              {/* <FontAwesomeIcon icon="trash" className="fas" onClick={() => handleDelete(p._id)} /> */}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Fragment> : undefined}
    </Container>
  );
}

export default Inventory;