import { Schema, Document, model } from 'mongoose';
import { UserRoles } from '@src/enums';

export interface User extends Document {
  createdAt: Date;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
}

const UserSchema = new Schema<User>(
  {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    email: {
      type: String,
      required: true,
      maxlength: 100,
    },
    passwordHash: {
      type: String,
      required: true,
      maxlength: 60,
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: UserRoles.user,
    },
  },
  {
    toJSON: {
      transform (doc, ret) {
        const res = { ...ret };
        res.id = res._id;
        delete res._id;
        delete res.passwordHash;
        return res;
      },
    },
  },

);

export const User = model<User>('User', UserSchema);
