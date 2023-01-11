export interface User {
  _id: string;
  email: string;
  password: string;
  nonce: string;
  address: string;
  type: string;
  role: string;
  createdAt: number;
  updatedAt: number;
}
