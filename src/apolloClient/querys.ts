import { gql } from '@apollo/client';

export const GET_PURCHASE_ORDERS = gql`
  query GetPurchaseOrders {
    getPurchaseOrders {
      client
      address
      date
      products {
        id
        product
        quantity
        price
        total
      }
    }
  }
`;