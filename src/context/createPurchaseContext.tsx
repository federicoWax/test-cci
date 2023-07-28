import { createContext, createRef, Dispatch, ReactNode, RefObject, SetStateAction, useContext, useEffect, useState } from "react";
import { OrderProduct, PurchaseOrder } from "../interfaces/purchaseOrder";
import { initPurchaseOrder } from "../constans";
import Alert from "../components/alert";
import { useForm, UseFormReturn } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_PURCHASE_ORDER } from "../apolloClient/mutations";

interface CreatePurchaseOrderContextData {
  openCreate: boolean;
  setOpenCreate: Dispatch<SetStateAction<boolean>>;
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
  saving: boolean;
}

const CreatePurchaseOrderContext = createContext<CreatePurchaseOrderContextData>({
  openCreate: false,
  setOpenCreate: () => false,
  setActiveStep: () => false,
  setPurchaseOrder: () => initPurchaseOrder,
  purchaseOrder: initPurchaseOrder,
  onFinish: () => { },
  error: "",
  setError: () => "",
  saving: false
});

export const CreatePurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder>(initPurchaseOrder);
  const [error, setError] = useState<string>("");
  const [messageSuccess, setMessageSuccess] = useState<string>("");
  const [openCreate, setOpenCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const refButtonCreateOrder = createRef<HTMLButtonElement>();
  const refButtonFinish = createRef<HTMLButtonElement>();
  const formOrderProducts = useForm<OrderProduct[]>({
    defaultValues: purchaseOrder.products
  });
  const [addPurchaseOrder, { loading: savingMutation }] = useMutation<Response, PurchaseOrder>(CREATE_PURCHASE_ORDER);

  const onFinish = async () => {
    if (savingMutation) return;

    if (!purchaseOrder.products.length) {
      setError("Necesita agregar por lo menos 1 producto a la orden.");
      setTimeout(() => {
        setError("");
      }, 4000);

      return;
    }

    setSaving(true);

    try {
      await addPurchaseOrder({
        variables: purchaseOrder,
        onQueryUpdated(observableQuery) {
          return observableQuery.refetch();
        }
      });

      setOpenCreate(false);
      setPurchaseOrder(initPurchaseOrder);
      setMessageSuccess("Orden de compra guardada con éxito.");
      setTimeout(() => {
        setMessageSuccess("");
      }, 4000);
    } catch (error) {
      console.log(error);
      setError("Error al crear la orden de compra.");
      setTimeout(() => {
        setError("");
      }, 4000);
    } finally {
      setSaving(false);
    }
  }

  return <CreatePurchaseOrderContext.Provider
    value={{
      openCreate,
      setOpenCreate,
      activeStep,
      setActiveStep,
      refButtonCreateOrder,
      refButtonFinish,
      purchaseOrder,
      setPurchaseOrder,
      onFinish,
      error,
      setError,
      formOrderProducts,
      saving
    }}
  >
    {children}
    {Boolean(error) && <Alert severity="error" error={error} />}
    {Boolean(messageSuccess) && <Alert severity="success" error={messageSuccess} />}
  </CreatePurchaseOrderContext.Provider>;
}

export const useCreatePurchaseOrder = () => useContext(CreatePurchaseOrderContext);