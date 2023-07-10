import React, { SyntheticEvent } from "react";
import styles from "./modal.module.css";
import clsx from "clsx";

type ModalProps = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  closeButton?: boolean;
};

export const ModalWindow = ({
  isOpen,
  close,
  children,
  className: classNameProp,
  title = "",
  closeButton = false,
}: ModalProps) => {
  const className = clsx(classNameProp,styles.modal__container );
  function handleClose(event: SyntheticEvent) {
    if (event.currentTarget === event.target) close();
  }
  return (
    <>
      {isOpen && (
        <div className={styles.modal__overlay} onClick={handleClose}>
          <div className={className} >
            <header className={styles.modal__container__header}>
              <h2>{title}</h2>
              {closeButton && (
                <button className={styles.modal__container__header__close} onClick={close} >
                  <span>&#215;</span>
                </button>
              )}
            </header>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
