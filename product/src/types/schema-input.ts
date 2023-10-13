export interface CreateProductInput {
  name: string;
  price: number;
  userId: string;
  quantity: number;
}

export interface UpdateProductInput {
  // Define the properties of the updateProduct input
  // For example:
  id: string;
  name?: string;
  description?: string;
  price?: number;
}

export interface CreateOrderInput {
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
}

export interface UpdateOrderInput {
  // Define the properties of the updateOrder input
  // For example:
  id: string;
  quantity: number;
}
