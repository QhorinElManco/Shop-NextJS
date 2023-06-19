import { IUser } from 'interfaces';
import { Model, Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, min: 2, max: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not supported',
        default: 'user',
        required: true,
      },
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = models.User || model('User', userSchema);

export default User;
