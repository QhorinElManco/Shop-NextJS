import { Card, Grid, Image, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IProduct } from 'interfaces';
import { FC, useMemo } from 'react';
import NextLink from 'next/link';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { hovered: isHovered, ref } = useHover();

  const productImage = useMemo(
    () => (isHovered ? `products/${product.images[1]}` : `products/${product.images[0]}`),
    [isHovered, product.images]
  );

  return (
    <Grid.Col xs={12} sm={12} md={3} ref={ref}>
      <Card>
        <Card.Section component={NextLink} href="product/slug" prefetch={false}>
          <Image className="fade" src={productImage} alt={product.title} withPlaceholder />
        </Card.Section>
        {/*<Card.Section>*/}
        <Title order={6}>{product.title}</Title>
        <Title order={6}>{`$${product.price}`}</Title>
        {/*</Card.Section>*/}
      </Card>
    </Grid.Col>
  );
};
