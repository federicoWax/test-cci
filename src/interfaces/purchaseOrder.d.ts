export interface PurchaseOrder {
  readonly id?: string;
  readonly orderNumber?: number;
  readonly date: Date;
  client: string;
  address: string;
  subtotal: number;
  tax: number;
  total: number;
}