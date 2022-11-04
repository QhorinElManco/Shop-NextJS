export interface IProduct {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  size: IProductSizes[];
  slug: string;
  tags: string[];
  title: string;
  type: IProductTypes;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

export type IProductSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type IProductTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';
