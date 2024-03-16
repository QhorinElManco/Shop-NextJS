import { Card, Grid, Image, Title } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import NextLink from 'next/link';
import { FC, useMemo, useState } from 'react';

import { IProduct } from '@/interfaces';
import { fetcher } from '@/utils/request';

import classes from './ProductCard.module.css';

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
    queryClient.prefetchQuery({
      queryKey: ['product', product.slug],
      queryFn: () => fetcher<IProduct>(`/api/products/${product.slug}`, {}),
    });

  return (
    <Grid.Col span={{ sm: 4, md: 3 }} ref={ref}>
      <Card
        p="md"
        radius="md"
        component={NextLink}
        href={`product/${product.slug}`}
        prefetch={false}
        className={classes.card}
        onMouseEnter={prefetchProduct}
      >
        <Image
          className="fade"
          src={productImage}
          alt={product.title}
          onLoad={() => setIsImageLoaded(true)}
          // withPlaceholder
        />
        <Title order={6} className="fade" display={isImageLoaded ? 'block' : 'none'}>
          {product.title}
        </Title>
        <Title order={6} c="dimmed" className="fade" display={isImageLoaded ? 'block' : 'none'}>
          {`$${product.price}`}
        </Title>
      </Card>
    </Grid.Col>
  );
};
