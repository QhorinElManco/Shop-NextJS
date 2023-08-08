import type { NextApiRequest, NextApiResponse } from 'next';
import { db, seedDatabase } from '../../database';
import { MCountry, MProduct, MUser } from '../../models';

type Data = {
  message: string;
};

export default async function handler(_: NextApiRequest, res: NextApiResponse<Data>) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  await db.connect();

  // Seed users
  await MUser.deleteMany(); // Si no hay argumentos en deleteMany eliminar todas las entradas del documento
  await MUser.insertMany(seedDatabase.initialData.users);

  // Seed products
  await MProduct.deleteMany();
  await MProduct.insertMany(seedDatabase.initialData.products);

  // Seed countries
  await MCountry.deleteMany();
  await MCountry.insertMany(seedDatabase.initialData.countries);

  await db.disconnect();

  return res.status(200).json({ message: 'Proceso realizado correctamente' });
}
