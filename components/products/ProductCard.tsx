import { Card, Grid, Image, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { IProduct } from 'interfaces';
import NextLink from 'next/link';
import { FC, useMemo, useState } from 'react';
import { fetcher } from 'utils/request';

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const { hovered: isHovered, ref } = useHover();
  const queryClient = useQueryClient();
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  const productImage = useMemo(
    () => (isHovered ? `/products/${product.images[1]}` : `/products/${product.images[0]}`),
    [isHovered, product.images]
  );

  const prefetchProduct = () =>
    queryClient.prefetchQuery(['product', product.slug], () =>
      fetcher<IProduct>(`/api/products/${product.slug}`, {})
    );

  return (
    <Grid.Col md={3} sm={4} xs={12} ref={ref}>
      <Card
        p="md"
        radius="md"
        component={NextLink}
        href={`product/${product.slug}`}
        prefetch={false}
        sx={(theme) => ({
          transition: 'transform 150ms ease, box-shadow 150ms ease',
          '&:hover': {
            transform: 'scale(1.01)',
            boxShadow: theme.shadows.md,
          },
        })}
        onMouseEnter={prefetchProduct}
      >
        <Image
          className="fade"
          src={productImage}
          alt={product.title}
          onLoad={() => setIsImageLoaded(true)}
          withPlaceholder
        />
        <Title order={6} className="fade" sx={{ display: isImageLoaded ? 'block' : 'none' }}>
          {product.title}
        </Title>
        <Title
          order={6}
          color="dimmed"
          className="fade"
          sx={{ display: isImageLoaded ? 'block' : 'none' }}
        >
          {`$${product.price}`}
        </Title>
      </Card>
    </Grid.Col>
  );
};
