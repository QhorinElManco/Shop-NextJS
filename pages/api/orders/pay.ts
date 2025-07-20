import axios from 'axios';
import { isValidObjectId } from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { errors } from '@/utils';
import { IPayPal } from '@/interfaces';
import { MOrder } from '@/models/';

const getPayPalAccessToken = async (): Promise<string | null> => {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CL;
  const secret = process.env.NEXT_PAYPAL_SE;
  const url = process.env.NEXT_PAYPAL_OAUTH_URL;

  if (!clientId || !secret || !url) {
    throw new errors.EnvironmentVariableNotDefinedError('PayPal environment variables missing');
  }

  const body = new URLSearchParams('grant_type=client_credentials');
  const base64Token = Buffer.from(`${clientId}:${secret}`, 'utf-8').toString('base64');

  try {
    const { data } = await axios.post(url, body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data.access_token;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line no-console
      console.log(error.response?.data ?? error.message);
    } else {
      // eslint-disable-next-line no-console
      console.log('Error: ', error);
    }
    return null;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  const { orderId = '', transactionId = '' } = req.body;

  if (!isValidObjectId(orderId)) {
    return res.status(400).json({ message: 'Invalid order ID' });
  }

  const token = await getPayPalAccessToken();

  if (!token) {
    return res.status(500).json({ message: 'Unable to get PayPal access token' });
  }

  const url = process.env.NEXT_PAYPAL_ORDERS_URL;

  if (!url) {
    throw new errors.EnvironmentVariableNotDefinedError('PayPal orders URL not defined');
  }

  const { data } = await axios.get<IPayPal.PayPalResponse>(
    `${process.env.NEXT_PAYPAL_ORDERS_URL}/${transactionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (data.status !== 'COMPLETED') {
    return res.status(400).json({ message: 'Payment not completed' });
  }

  await db.connect();
  const order = await MOrder.findById(orderId);

  if (!order) {
    await db.disconnect();
    return res.status(404).json({ message: 'Order not found' });
  }

  if (order.total !== Number(data.purchase_units[0].amount.value)) {
    await db.disconnect();
    return res.status(400).json({ message: 'Order total does not match' });
  }

  order.transactionId = transactionId;
  order.isPaid = true;
  await order.save();
  await db.disconnect();

  return res.status(200).json({ message: 'Order paid' });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      return payOrder(req, res);
    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
