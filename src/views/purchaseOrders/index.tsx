import { useState } from "react";
import CreatePurchaseOrder from "./createPurchaseOrder";
import { CreatePurchaseOrderProvider } from "../../context/createPurchaseContext";
import HeaderPurchaseOrders from "./headerPurchaseOrders";
import TablePurchaseOrders from "./tablePurchaseOrders";

const PurchaseOrders = () => {
  const [openCreate, setOpenCreate] = useState(false);

  return (
    <div>
      <HeaderPurchaseOrders setOpenCreate={setOpenCreate} />
      <TablePurchaseOrders />
      <CreatePurchaseOrderProvider>
        <CreatePurchaseOrder
          open={openCreate}
          onClose={() => setOpenCreate(false)}
        />
      </CreatePurchaseOrderProvider>
    </div>
  )
}

export default PurchaseOrders;