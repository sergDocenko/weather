import React, { FC, forwardRef, SyntheticEvent, KeyboardEvent } from "react";
import clsx from "clsx";
import styles from "./input.module.css";

type Inputprops = {
  className?: string;
  placeholder?: string;
  onChange: (event: SyntheticEvent) => void;
  onClick?: (event: SyntheticEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onEnter?: (event: KeyboardEvent) => void;
};

const Input = (
  {
    className: classNameProp,
    placeholder,
    onChange,
    onClick,
    onKeyDown,
    onEnter,
    ...props
  }: Inputprops,
  ref: any
) => {
  const className = clsx(styles.input, classNameProp);
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (onEnter) onEnter(event);
    }
    if (onKeyDown) onKeyDown(event);
  }
  return (
    <input
      className={className}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      type="text"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default forwardRef(Input);
