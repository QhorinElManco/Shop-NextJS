import React, { FC } from 'react';
import { IProduct } from 'interfaces';
import { Card, Grid, Image, Title } from '@mantine/core';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => (
  // console.log('product-card');
  <Grid.Col xs={12} sm={12} md={3}>
    <Card>
      <Card.Section>
        <Image src={`products/${product.images[0]}`} alt={product.title} withPlaceholder />
      </Card.Section>
      {/*<Card.Section>*/}
      <Title order={6}>{product.title}</Title>
      <Title order={6}>{`$${product.price}`}</Title>
      {/*</Card.Section>*/}
    </Card>
  </Grid.Col>
);
