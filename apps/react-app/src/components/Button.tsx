import React from "react";

export enum ButtonType {
  Flat,
  Outlined,
  Icon,
  Text
}

interface ButtonParams {
  children: React.ReactNode;
  type?: ButtonType,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  icon?: React.ReactNode,
  classes?: string
}

function Button({ children, type = ButtonType.Flat, onClick, icon, classes }: ButtonParams) {
  switch (type) {
    case ButtonType.Flat:
      return (<button
        onClick={onClick}
        className={`px-8 py-2 bg-neon rounded-full text-lg font-bold relative inline-flex items-center group text-black ${classes}`} >
        {children}
      </button>);
    
    case ButtonType.Outlined:
    
    case ButtonType.Icon:
      return (<button
        onClick={onClick}
        className={`mt-8 px-8 py-4 bg-neon rounded-full text-lg font-bold relative inline-flex items-center group ${classes}`} >
        {children}
        <span className="relative w-0 overflow-hidden group-hover:w-4 transition-all duration-300 ease-in ml-2">
          {/* className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300 ease-in" */}
          {icon}
        </span>
      </button>);
    
    case ButtonType.Text: 
    return (<button
      onClick={onClick}
      className={`text-gray-300 hover:text-neon hover:underline rounded-full text-md font-bold relative inline-flex items-center group ${classes}`} >
      {children}
    </button>);
  }

  return (
    <button onClick={onClick} className="bg-purple-400 py-1 px-6 text-white font-bold rounded-md border-b-4 border-b-purple-600">
      {children}
    </button>
  )
}

export default Button;