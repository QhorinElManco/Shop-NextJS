export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: IProductSize[];
  slug: string;
  tags: string[];
  title: string;
  type: IProductType;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  createdAt: string;
  updatedAt: string;
}
export const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type IProductSize = (typeof validSizes)[number];

export const validProductTypes = ['shirts', 'pants', 'hoodies', 'hats'] as const;
export type IProductType = (typeof validProductTypes)[number];
