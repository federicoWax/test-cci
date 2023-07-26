import { createContext, createRef, Dispatch, MutableRefObject, ReactNode, RefObject, SetStateAction, useContext, useRef, useState } from "react";

interface CreatePurchaseOrderContextData {
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
  refButtonCreateForm?: RefObject<HTMLButtonElement>;
}

const CreatePurchaseOrderContext = createContext<CreatePurchaseOrderContextData>({
  setActiveStep: () => false
});

export const CreatePurchaseOrderProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();
  const refButtonCreateForm = createRef<HTMLButtonElement>();

  return <CreatePurchaseOrderContext.Provider value={{ activeStep, setActiveStep, refButtonCreateForm }}>
    {children}
  </CreatePurchaseOrderContext.Provider>;
}

export const useCreatePurchaseOrder = () => useContext(CreatePurchaseOrderContext);

