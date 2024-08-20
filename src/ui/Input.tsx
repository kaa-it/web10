import React, { HTMLInputTypeAttribute, InputHTMLAttributes, ReactNode, useRef } from "react";
import clsx from "clsx";

const FLAG_INPUTS = ['checkbox', 'radio'];

export interface Styleable {
  className?: string;
}

export interface Changable<T> {
  value: T;
  onChange?: (value: T) => void;
}

export interface InputProps extends Styleable, Changable<string | boolean | number>, Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  type: HTMLInputTypeAttribute
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, value, onChange, ...props }, ref) => {

  return (FLAG_INPUTS.includes(type))
    ? <input 
      {...props}
      className={className}
      ref={ref} 
      type={type}
      {...(onChange ? {
        checked: Boolean(value),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked) 
      } : {
        defaultChecked: Boolean(value)
      })} 
    />
    : <input 
      {...props}
      className={className}
      ref={ref} 
      type={type} 
      {...(onChange ? {
        value: String(value),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) 
      } : {
        defaultValue: String(value)
      })} 
    />
});

export interface TextareaProps extends Styleable, Changable<string> {

}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, value, onChange, ...props }, ref) => {
  return <textarea
    {...props}
    className={className}
    ref={ref} 
    {...(onChange ? {
      value: String(value),
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value) 
    } : {
      defaultValue: String(value)
    })}  
  />
});

export type SelectOption = {
  label: string;
  value: string;
};

export interface SelectProps extends Styleable, Changable<string> {
  options: SelectOption[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, value, options, onChange, ...props }, ref) => {
  return <select
    {...props}
    ref={ref}
    className={className}
    {...(onChange ? {
      value: String(value),
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value) 
    } : {
      defaultValue: String(value)
    })} 
  >
    {options.map(({ label, value }) => <option 
      value={value}
      key={value}
    >
      {label}
    </option>)}
  </select>;
});

export interface FieldProps extends Styleable {
  label: string;
  error?: string;
  children: React.ReactElement
};

export function isInputElement(el: any): el is React.ReactElement<InputProps> {
  return  React.isValidElement<InputProps>(el) && !!el.props.type;
}

export const Field = React.forwardRef<HTMLLabelElement, FieldProps>(({ className, label, error, children, ...props }, ref) => {
  const type = isInputElement(children) 
                  ? children.props.type
                  : undefined;

  return (FLAG_INPUTS.includes(String(type)))
    ?  <label
      {...props}
      ref={ref}
      className={className}
    >
      {children}
      <span>{label}</span>
    </label>
    : <label
      {...props}
      ref={ref}
      className={className}
    >
      <span>{label}</span>
      {children}
      <span className="error">{error}</span>
    </label>;
});