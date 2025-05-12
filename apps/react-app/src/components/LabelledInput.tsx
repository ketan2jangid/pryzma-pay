import React from "react";

interface LabelledInputParams {
    label?: string;
    isPassword?: boolean;
    hintText?: string;
    onChange: (v: React.ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput({
    label,
    hintText,
    isPassword = false,
    onChange
} : LabelledInputParams) {
  return (
    <div className="py-2">
        {label ? <p className="px-1 mb-1 text-lg font-semibold text-gray-500">{label}</p> : null}
        <input 
            type={ isPassword ? "password" : "text"} 
            placeholder={ hintText ?? ""} 
            onChange={onChange}
            className="border-4 rounded-lg border-gray-900 px-3 py-1 text-gray-300 focus:border-gray-500 "
            />
    </div>
  )
}

export default LabelledInput;