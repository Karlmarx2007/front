import React from 'react';

import All from '../pages/all';
import Sativa from '../pages/sativa';
import Indica from '../pages/indica';
import Edibles from '../pages/edibles';
import Rolls from '../pages/rolls';
import ProductDetail from '../pages/product-detail';
import Cart from '../pages/cart';
import SignIn from '../pages/signin';
import SignUp from '../pages/signup';
import Inventory from '../pages/inventory';
import { RouteComponentProps } from 'react-router-dom';
import Shipping from '../pages/shipping';
import ReviewItems from '../pages/review-items';
import PaymentSuccessful from '../pages/payment-successful';
import Main from '../pages/main';
import Unauthorized from '../pages/unauthorized';
import Profile from '../pages/profile';

const routes = [
  {
    path: '/',
    exact: true, 
    main: () => <Main />,
  },
  {
    path: '/all',
    exact: true,
    main: () => <All />,
  },
  {
    path: '/sativa',
    main: () => <Sativa />,
  },
  {
    path: '/indica',
    main: () => <Indica />,
  },
  {
    path: '/edibles',
    main: () => <Edibles />,
  },
  {
    path: '/rolls',
    main: () => <Rolls />,
  },
  {
    path: '/signin',
    main: (props: string) => <SignIn {...props}/>,
  },
  {
    path: '/signup',
    main: (props: string) => <SignUp {...props}/>,
  },
  {
    path: '/product/:id?',
    main: (props: RouteComponentProps<any>) => <ProductDetail {...props}/>,
  },
  {
    path: '/cart',
    main: () => <Cart />
  },
  {
    path: '/unauthorized',
    main: () => <Unauthorized />
  },
  /*Protected Routes */
  {
    path: '/inventory',
    main: () => <Inventory />,
    protected: true
  },
  {
    path: '/shipping',
    main: (props: RouteComponentProps<any>) => <Shipping {...props} />,
    protected: true
  },
  {
    path: '/review-items',
    main: (props: RouteComponentProps<any>) => <ReviewItems {...props} />,
    protected: true
  },
  {
    path: '/payment-successful',
    main: (props: RouteComponentProps<any>) => <PaymentSuccessful {...props} />,
    protected: true
  },
  {
    path: '/profile',
    main: () => <Profile />,
    protected: true
  },
]

export default routes;