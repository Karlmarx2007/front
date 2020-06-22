import React from 'react';
import Card from '@material-ui/core/Card';

const styles = {
  maxWidth: 320,
  maxHeight: 450,
  marginBottom: '1rem',
  flexGrow: 1
}
const ProductFallback = () => {
  return (
    <Card style={styles}></Card>
  )
}

export default ProductFallback;