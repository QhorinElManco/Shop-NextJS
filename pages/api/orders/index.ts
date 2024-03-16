import { db, dbUsers } from 'database';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { IOrder } from '@/interfaces';
import { MOrder, MProduct } from '@/models';
import { errors } from '@/utils';
import { authOptions } from '../auth/[...nextauth]';

type Data =
  | {
      message: string;
    }
  | IOrder;

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }

  const { body } = req;
  const { orderItems, total } = body as IOrder;

  if (orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }

  const productIds = orderItems.map((item) => item._id);

  await db.connect();
  const dbProducts = await MProduct.find({ _id: { $in: productIds } });

  try {
    const subtotal = orderItems.reduce((prev, current) => {
      const currentPrice = dbProducts.find((p) => p.id === current._id)?.price;

      if (!currentPrice) {
        throw new errors.ProductDoesNotExist('Product does not exist');
      }

      return currentPrice * current.quantity + prev;
    }, 0);

    const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0;
    const backendTotal = subtotal * (taxRate + 1);

    if (backendTotal !== total) {
      return res.status(400).json({ message: 'Total does not match' });
    }

    const user = await dbUsers.getUserByEmail(session.user.email);
    const newOrder = new MOrder({ ...body, isPaid: false, user: user?._id });
    newOrder.total = Math.round(backendTotal * 100) / 100; // round to 2 decimal places
    await newOrder.save();
    await db.disconnect();

    return res.status(201).json(newOrder);
  } catch (e) {
    if (e instanceof errors.ProductDoesNotExist || e instanceof errors.TotalDoesNotMatch) {
      await db.disconnect();
      return res.status(400).json({ message: e.message });
    }

    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  switch (req.method) {
    case 'POST':
      return createOrder(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};
