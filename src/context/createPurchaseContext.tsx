import { createContext, createRef, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useState } from "react";
import { PurchaseOrder } from "../interfaces/purchaseOrder";
import { initPurchaseOrder } from "../constans";
import Alert from "../components/alert";

interface CreatePurchaseOrderContextData {
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  refButtonCreateOrder?: RefObject<HTMLButtonElement>;
  refButtonFinish?: RefObject<HTMLButtonElement>;
  purchaseOrder: PurchaseOrder;
  setPurchaseOrder: Dispatch<SetStateAction<PurchaseOrder>>;
  onFinish: () => void;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

const CreatePurchaseOrderContext = createContext<CreatePurchaseOrderContextData>({
  setActiveStep: () => false,
  setPurchaseOrder: () => initPurchaseOrder,
  purchaseOrder: initPurchaseOrder,
  onFinish: () => { },
  error: "",
  setError: () => ""
});

export const CreatePurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(initPurchaseOrder);
  const [error, setError] = useState<string>("");
  const refButtonCreateOrder = createRef<HTMLButtonElement>();
  const refButtonFinish = createRef<HTMLButtonElement>();

  const onFinish = async () => {
    if (!purchaseOrder.products.length) {
      setError("Necesita agregar por lo menos 1 producto a la orden.");
      setTimeout(() => {
        setError("");
      }, 4000);

      return;
    }

    /*  if (purchaseOrder.products.some(product => product.quantity < 1 || product.price < 1)) {
       setError("Los precios y cantidades deben ser mayores a 0.");
       setTimeout(() => {
         setError("");
       }, 4000);
 
       return;
     } */
  }

  return <CreatePurchaseOrderContext.Provider
    value={{
      activeStep,
      setActiveStep,
      refButtonCreateOrder,
      refButtonFinish,
      purchaseOrder,
      setPurchaseOrder,
      onFinish,
      error,
      setError
    }}
  >
    {children}
    {Boolean(error) && <Alert severity="error" error={error} />}
  </CreatePurchaseOrderContext.Provider>;
}

export const useCreatePurchaseOrder = () => useContext(CreatePurchaseOrderContext);