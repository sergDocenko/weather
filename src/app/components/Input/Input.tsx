import React, {
  FC,
  forwardRef,
  SyntheticEvent,
  KeyboardEvent,
  LegacyRef,
} from "react";
import clsx from "clsx";
import styles from "./input.module.css";

type Inputprops = {
  className?: string;
  placeholder?: string;
  onChange: (event: SyntheticEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
  onEnter?: (event: KeyboardEvent) => void;
};

const Input = (
  {
    className: classNameProp,
    placeholder,
    onChange,
    onKeyDown,
    onEnter,
    ...props
  }: Inputprops,
  ref: LegacyRef<HTMLInputElement>
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
      onKeyDown={handleKeyDown}
      {...props}
    />
  );
};

export default forwardRef(Input);
