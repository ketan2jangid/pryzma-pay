import { createContext, ReactNode, useCallback, useState } from "react";
import Snackbar from "../components/Snackbar";

export enum SnackbarType {
    Info = "info",
    Success = "success",
    Error = "error",
}
  

type SnackbarContextType = {
  msg: string;
  type: SnackbarType;
  isDisplayed: boolean;
  showSnackbar: (msg: string, type?: SnackbarType) => void;
  closeSnackbar: () => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [msg, setMsg] = useState("");
  const [type, setType] = useState<SnackbarType>(SnackbarType.Info);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const showSnackbar = useCallback((message: string, snackbarType: SnackbarType = SnackbarType.Info) => {
    setMsg(message);
    setType(snackbarType);
    setIsDisplayed(true);

    const timer = setTimeout(() => {
      setIsDisplayed(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const closeSnackbar = useCallback(() => setIsDisplayed(false), []);

  return (
    <SnackbarContext.Provider value={{ msg, type, isDisplayed, showSnackbar, closeSnackbar }}>
      {children}
      {isDisplayed && <Snackbar msg={msg} type={type} />}
    </SnackbarContext.Provider>
  );
};
