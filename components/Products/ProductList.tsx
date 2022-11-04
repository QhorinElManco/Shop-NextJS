import React, { FC } from 'react';
import { Grid } from '@mantine/core';
import { IProduct } from 'interfaces';
import { ProductCard } from './ProductCard';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => (
  // console.log('Product-list');
  <Grid>
    {products.map((product) => (
      <ProductCard product={product} key={product.slug} />
    ))}
  </Grid>
);
