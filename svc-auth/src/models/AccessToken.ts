import { Schema, Document, model } from 'mongoose';

import { User } from '@src/models/User';
import { AccessTokenScopes } from '@src/enums/AccessTokenScopes';

export interface AccessToken extends Document{
  createdAt: Date;
  user: User;
  jwt: string;
  scope: AccessTokenScopes;
}

const AccessTokenSchema = new Schema<AccessToken>({
  createdAt: {
    type: Date,
    default: Date.now,
    expires: `${process.env.ACCESS_TOKEN_TTL_SECONDS}s`,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  jwt: {
    type: String,
    required: true,
    maxLength: 1024,
  },
  scope: Number,
});

export const AccessToken = model<AccessToken>('AccessToken', AccessTokenSchema);
