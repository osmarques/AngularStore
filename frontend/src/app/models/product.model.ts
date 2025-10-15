export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface UpdateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
}