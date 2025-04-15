import { createContext, useCallback, useState } from "react";
import Toast from "../../Presentation/Components/Toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const onToast = useCallback(({msg, type}) => {
    setToast({msg, type});
    setTimeout(() => {
      setToast(null);
    }, 5000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast, onToast }}>
      {children}
      {toast && <Toast toast={toast}/>}
    </ToastContext.Provider>
  );
}