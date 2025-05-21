export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: string;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}
