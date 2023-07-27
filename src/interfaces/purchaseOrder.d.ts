export interface PurchaseOrder {
  readonly id?: string;
  readonly orderNumber?: number;
  readonly date: Date;
  client: string;
  address: string;
  subtotal: number;
  tax: number;
  total: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  readonly id?: string | number;
  readonly orderNumber?: number;
  product: string;
  quantity: number;
  price: number;
  total: number; //es con iva
}