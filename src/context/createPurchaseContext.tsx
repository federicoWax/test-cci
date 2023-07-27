import { createContext, createRef, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useState } from "react";
import { PurchaseOrder } from "../interfaces/purchaseOrder";
import { initPurchaseOrder } from "../constans";

interface CreatePurchaseOrderContextData {
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  refButtonCreateForm?: RefObject<HTMLButtonElement>;
  purchaseOrder: PurchaseOrder;
  setPurchaseOrder: Dispatch<SetStateAction<PurchaseOrder>>;
}

const CreatePurchaseOrderContext = createContext<CreatePurchaseOrderContextData>({
  setActiveStep: () => false,
  setPurchaseOrder: () => initPurchaseOrder,
  purchaseOrder: initPurchaseOrder
});

export const CreatePurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(initPurchaseOrder);
  const refButtonCreateForm = createRef<HTMLButtonElement>();

  return <CreatePurchaseOrderContext.Provider value={{ activeStep, setActiveStep, refButtonCreateForm, purchaseOrder, setPurchaseOrder }}>
    {children}
  </CreatePurchaseOrderContext.Provider>;
}

export const useCreatePurchaseOrder = () => useContext(CreatePurchaseOrderContext);

