export interface PurchaseOrder {
  readonly id?: string;
  readonly orderNumber?: number;
  readonly date: Date;
  client: string;
  address: string;
  subtotal?: number;
  tax?: number;
  total: number;
  products: OrderProduct[];
}

export interface OrderProduct {
  readonly id?: string | number;
  readonly orderNumber?: number;
  product: string;
  quantity: number | string;
  price: number | string;
  total: number; //es con iva
}

export type PurchaseOrderInput = Omit<PurchaseOrder, "id" | "orderNumber" | "date" | "subtotal" | "tax" | "products" | "total"> & {
  products: OrderProductInput[];
};

export type OrderProductInput = Omit<OrderProduct, "id" | "orderNumber" | "total">;
