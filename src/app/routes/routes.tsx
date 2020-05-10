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

const routes = [
  {
    path: '/',
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
    main: () => <SignIn />,
  },
  {
    path: '/signup',
    main: () => <SignUp />,
  },
  {
    path: '/product/:id?',
    main: (props: string) => <ProductDetail {...props}/>,
  },
  {
    path: '/cart/:id',
    main: (props: string) => <Cart {...props}/>
  }
]

export default routes;