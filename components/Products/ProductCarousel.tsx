import React, { FC } from 'react';
import { Carousel } from '@mantine/carousel';
import { Image } from '@mantine/core';

interface Props {
  images: string[];
}

export const ProductCarousel: FC<Props> = ({ images }) => (
  <Carousel sx={{ maxWidth: 700 }} mx="auto" controlsOffset="xs" withIndicators loop>
    {images.map((image) => (
      <Carousel.Slide key={image}>
        <Image src={`/products/${image}`} alt={image} withPlaceholder />
      </Carousel.Slide>
    ))}
  </Carousel>
);
