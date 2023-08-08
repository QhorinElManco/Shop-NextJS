import { ICountry } from 'interfaces';

import { Model, Schema, model, models } from 'mongoose';

const countrySchema = new Schema(
  {
    name: { type: String, required: true, min: 2, max: 80 },
    code: { type: String, required: true, min: 2, max: 80 },
  },
  { timestamps: true }
);

const Country: Model<ICountry> = models.Country || model('Country', countrySchema);

export default Country;
