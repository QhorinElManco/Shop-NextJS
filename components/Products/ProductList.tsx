import { Grid } from '@mantine/core';
import { IProduct } from 'interfaces';
import { FC } from 'react';
import { ProductCard } from './ProductCard';

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
