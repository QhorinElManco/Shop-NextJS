import { IProduct } from 'interfaces';
import mongoose, { Model, model, Schema } from 'mongoose';

const productSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    size: [
      {
        type: String,
        enum: {
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          message: '{VALUE} is not size supported',
        },
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    tags: [{ type: String }],
    title: {
      type: String,
      required: true,
    },
    type: [
      {
        type: String,
        enum: {
          values: ['shirts', 'pants', 'hoodies', 'hats'],
          message: '{VALUE} is not product supported',
        },
      },
    ],
    gender: [
      {
        type: String,
        enum: {
          values: ['men', 'women', 'kid', 'unisex'],
          message: '{VALUE} is not gender supported',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// TODO: Crear indice de Mongo

const Product: Model<IProduct> = mongoose.models.Product || model('Product', productSchema);

export default Product;
