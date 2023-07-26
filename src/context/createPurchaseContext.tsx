import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface CreatePurchaseContextData {
  activeStep?: number;
  setActiveStep: Dispatch<SetStateAction<number | undefined>>;
}

const CreatePurchaseContext = createContext<CreatePurchaseContextData>({
  setActiveStep: () => false,
});

export const CreatePurchaseProvider = ({ children }: { children: ReactNode }) => {
  const [activeStep, setActiveStep] = useState<number | undefined>();

  return <CreatePurchaseContext.Provider value={{ activeStep, setActiveStep }}>
    {children}
  </CreatePurchaseContext.Provider>;
}

export const useCreatePurchase = () => useContext(CreatePurchaseContext);

