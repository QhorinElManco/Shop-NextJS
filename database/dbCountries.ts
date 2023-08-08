import { db } from 'database';
import { MCountry } from 'models';

export const getAllCountries = async () => {
  await db.connect();

  const countries = await MCountry.find().lean();
  await db.disconnect();

  return JSON.parse(JSON.stringify(countries));
};
