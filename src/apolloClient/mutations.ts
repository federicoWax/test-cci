import { gql } from "@apollo/client";

export const CREATE_PURCHASE_ORDER = gql`
  mutation CreatePurchaseOrder($order: PurchaseOrderInput!) {
    createPurchaseOrder(data: $order) {
      address
      client
      products {
        price
        product
        quantity
      }
    }
  }
`;