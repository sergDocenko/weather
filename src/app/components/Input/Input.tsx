import React, { FC, forwardRef } from "react";
import clsx from "clsx";
import styles from "./input.module.css";

type Inputprops = {
  className?: string;
  placeholder?: string;
  onChange: (event: any) => void;
  onClick?: (event: any) => void;
};

const Input = (
  { className: classNameProp, placeholder, onChange, onClick }: Inputprops,
  ref: any
) => {
  const className = clsx(styles.input, classNameProp);
  return (
    <input
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      type="text"
      onClick={onClick}
    />
  );
};

export default forwardRef(Input);
