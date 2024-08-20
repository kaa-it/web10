import React, { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className: string;
  children: ReactNode;
  name?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  className, 
  children, 
  ...props 
}, ref) => {
  return (<button 
    {...props} 
    ref={ref}
    className={clsx("button", className)}
    >
      {children}
    </button>);
});
