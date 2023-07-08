"use client";
import React, { useState, FC, useRef, useEffect } from "react";
import styles from "./select.module.css";
import image from "../../../../public/chevron-down.svg";
import Image from "next/image";

type SelectProps = {
  options: number[];
  label?: string;
  getOptionValue: (value: any) => void;
  selectedOption: any;
};

export const Select: FC<SelectProps> = ({
  options,
  label,
  getOptionValue,
  selectedOption,
}) => {
  const selectRef = useRef<any>(null);

  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    function handleDocumentClick(event: any) {
      if (!selectRef.current.contains(event.target) && active) {
        setActive(false);
      }
    }
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [active]);

  function selectToggle() {
    setActive((state) => !state);
  }
  function selectItem(index: number) {
    // setSelectedItem(index);
    getOptionValue(options[index]);
    selectToggle();
  }

  return (
    <div
      className={styles.select_container}
      ref={selectRef}
      id="select_container"
    >
      {label}
      <button onClick={selectToggle}>
        <label htmlFor="select">{selectedOption}</label>
        <Image src={image} alt="/public/chevron-down.jpg" />
      </button>

      {active && (
        <div id="select" className={styles.select}>
          {options?.map((option, index) => (
            <span
              key={index}
              className={styles.option}
              onClick={selectItem.bind(null, index)}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
