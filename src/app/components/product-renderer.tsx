import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import ProductFallback from './product-fallback';
import { Product } from '../models/product';
import Loader from './loader';

const Photo = lazy(() => import('./photo'));
export interface ISearchState {
  searchWord: string;
};

type Props = {
  products: Product[],
  loading: boolean,
  error: any
}

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const ProductRenderer: React.FC<Props> = ({products, loading, error}) => {
  const search = useSelector<ISearchState, any>(
    state => state.searchWord.toLocaleLowerCase()
  );

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <StyledDiv>
      {products.filter((p: Product) => p.title.toLowerCase().includes(search)).map((p: Product) => (
        <Suspense fallback={<ProductFallback />} key={p._id}><Photo {...p} /></Suspense>
      ))}
    </StyledDiv>
  );
}

export default ProductRenderer;