import { createContext, createRef, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useState } from "react";
import { OrderProduct, PurchaseOrder } from "../interfaces/purchaseOrder";
import { initPurchaseOrder } from "../constans";
import Alert from "../components/alert";
import { useForm, UseFormReturn } from "react-hook-form";

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
  formOrderProducts?: UseFormReturn<OrderProduct[], any, undefined>;
}

const CreatePurchaseOrderContext = createContext<CreatePurchaseOrderContextData>({
  setActiveStep: () => false,
  setPurchaseOrder: () => initPurchaseOrder,
  purchaseOrder: initPurchaseOrder,
  onFinish: () => { },
  error: "",
  setError: () => "",
});

export const CreatePurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(initPurchaseOrder);
  const [error, setError] = useState<string>("");
  const refButtonCreateOrder = createRef<HTMLButtonElement>();
  const refButtonFinish = createRef<HTMLButtonElement>();
  const formOrderProducts = useForm<OrderProduct[]>({
    defaultValues: purchaseOrder.products
  });

  const onFinish = async () => {
    if (!purchaseOrder.products.length) {
      setError("Necesita agregar por lo menos 1 producto a la orden.");
      setTimeout(() => {
        setError("");
      }, 4000);

      return;
    }
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
      setError,
      formOrderProducts
    }}
  >
    {children}
    {Boolean(error) && <Alert severity="error" error={error} />}
  </CreatePurchaseOrderContext.Provider>;
}

export const useCreatePurchaseOrder = () => useContext(CreatePurchaseOrderContext);