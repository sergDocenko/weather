import React, { SyntheticEvent } from "react";
import styles from "./modal.module.css";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  className?: string;
};

export const ModalWindow = ({
  isOpen,
  close,
  children,
  className: classNameProp,
}: ModalProps) => {
  const className = clsx(classNameProp, styles.modal__overlay);
  function handleClose(event: SyntheticEvent) {
    if (event.currentTarget === event.target) close();
  }
  return (
    <>
      {isOpen && (
        <div className={className} onClick={handleClose}>
          {children}
        </div>
      )}
    </>
  );
};
