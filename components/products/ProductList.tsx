import { Grid } from '@mantine/core';
import { FC } from 'react';

import { IProduct } from '@/interfaces';

import { ProductCard } from './product-card';

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => (
  <Grid>
    {products.map((product) => (
      <ProductCard product={product} key={product.slug} />
    ))}
  </Grid>
);
