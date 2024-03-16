import { Model, Schema, model, models } from 'mongoose';
import { IOrder } from '@/interfaces';

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    orderItems: [
      {
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      address: { type: String, required: true },
      address2: { type: String },
      country: { type: String, required: true },
      postalCode: { type: Number, required: true },
      phoneNumber: { type: String, required: true },
    },

    paymentResult: { type: String },
    numberOfItems: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String },
    transactionId: { type: String },
  },

  { timestamps: true }
);

const Order: Model<IOrder> = models.Order || model('Order', orderSchema);

export default Order;
