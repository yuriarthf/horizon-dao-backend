import { Types } from "mongoose";

export interface User {
  _id: Types.ObjectId;
  nonce: number;
  address: string;
  testTokensRequested: string;
  createdAt: number;
  updatedAt: number;
}
