import { gql } from "@apollo/client";

export const CREATE_PURCHASE_ORDER = gql`
  mutation createPurchaseOrder($data: PurchaseOrderInput!) {
    createPurchaseOrder(data: $data) {
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