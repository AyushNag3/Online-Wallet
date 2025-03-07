"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode; // children: This is a special prop in React that represents the content that is passed between the opening and closing tags of a component
  onClick: () => void; // In this type def, its a function that does not return anything
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>
  
  );
};
