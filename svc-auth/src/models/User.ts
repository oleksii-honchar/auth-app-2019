import { Schema, Document, model } from 'mongoose';

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
      default: Date.now
    },
    email: {
      type: String,
      required: true,
      maxlength: 100
    },
    passwordHash: {
      type: String,
      required: true,
      maxlength: 60
    },
    firstName: {
      type: String,
      required: true,
      maxlength: 100
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 100
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: {
      transform (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.passwordHash;
      }
    }
  }

);

export const User = model<User>('User', UserSchema);
