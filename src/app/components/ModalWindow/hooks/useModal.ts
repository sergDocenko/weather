import { useState } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  return {
    isOpen,
    openModal,
    closeModal,
  };
}
