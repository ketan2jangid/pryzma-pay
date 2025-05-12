import React from "react";
import { SnackbarType } from "../context/SnackbarProvider";


type SnackbarProps = {
  msg: string;
  type: SnackbarType;
};

const styles = {
    info: "bg-blue-400 border-2 border-blue-600",
    success: "bg-green-400 border-2 border-green-600",
    error: "bg-red-400 border-2 border-red-600",
};
  
const Snackbar: React.FC<SnackbarProps> = ({ msg, type }) => {
return (
    <div className={`z-40 fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-2 rounded shadow-md text-white font-semibold text-xl ${styles[type]}`}>
    {msg}
    </div>
);
};
  

export default Snackbar;
