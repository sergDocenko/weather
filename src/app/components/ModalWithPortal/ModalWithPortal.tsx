import React, { FC } from "react";
import  Portal  from "../Portal/Portal";
import { ModalWindow } from "../ModalWindow/ModalWindow";

type ModalWithPortalProps = {
  isOpen: boolean;
  close: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string;
  closeButton?: boolean;
};

export const ModalWithPortal: FC<ModalWithPortalProps> = ({
  children,
  ...props
}) => {
  return (
    <Portal selector={"body"}>
      <ModalWindow {...props}>{children}</ModalWindow>
    </Portal>
  );
};
