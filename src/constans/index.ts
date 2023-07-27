import { ValidationRule } from "react-hook-form";
import { PurchaseOrder } from "../interfaces/purchaseOrder";

export const maxLength: ValidationRule<number> = { value: 256, message: "Estas excediendo los 256 caracteres disponibles." };

export const initPurchaseOrder: PurchaseOrder = {
  client: "",
  address: "",
  date: new Date(),
  subtotal: 0,
  tax: 0,
  total: 0,
  products: []
};