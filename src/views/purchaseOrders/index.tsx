import CreatePurchaseOrder from "./createPurchaseOrder";
import { CreatePurchaseOrderProvider } from "../../context/createPurchaseContext";
import HeaderPurchaseOrders from "./headerPurchaseOrders";
import TablePurchaseOrders from "./tablePurchaseOrders";

const PurchaseOrders = () => {
  return (
    <CreatePurchaseOrderProvider>
      <HeaderPurchaseOrders />
      <TablePurchaseOrders />
      <CreatePurchaseOrder />
    </CreatePurchaseOrderProvider>

  )
}

export default PurchaseOrders;