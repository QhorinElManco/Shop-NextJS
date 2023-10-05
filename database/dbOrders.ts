import { db } from 'database';
import { IOrder } from 'interfaces';
import { MOrder } from 'models';
import { isValidObjectId } from 'mongoose';

export const getOrderById = async (id: string): Promise<IOrder | null> => {
  if (!isValidObjectId(id)) {
    return null;
  }

  await db.connect();
  const order = await MOrder.findById(id).lean();
  await db.disconnect();

  if (!order) {
    return null;
  }

  return JSON.parse(JSON.stringify(order));
};

export const getOrdersByUserId = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId(userId)) {
    return [];
  }

  await db.connect();
  const orders = await MOrder.find({ user: userId }).lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(orders));
};
