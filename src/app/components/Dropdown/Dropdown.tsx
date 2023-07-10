"use client";
// import type { DropdownOption } from "@/app/types";
import clsx from "clsx";
import {
  FC,
  SyntheticEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../Input/Input";
import styles from "./dropdown.module.css";

export type DropdownOption = {
  name: string;
  value: string;
};

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  multiple?: boolean;
  search?: boolean;
  onChange?: (selectedOptions: DropdownOption[]) => void;
  selectedProp?: DropdownOption[];
};

export const Dropdown: FC<DropdownProps> = ({
  options: optionsProp,
  placeholder = "Select...",
  multiple = false,
  search = false,
  onChange,
  selectedProp = [],
}) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<DropdownOption[]>(selectedProp);
  const dropdownRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [filterValue, setFilterValue] = useState("");

  const handleDocumentClick = useCallback((event: any) => {
    if (!dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (active) {
      inputRef?.current?.focus();
    } else setFilterValue("");
  }, [active]);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);

  const className = clsx({
    [styles.dropdown]: true,
    [styles.dropdown_active]: active,
  });

  function handleActive() {
    setActive(true);
  }

  function toggleActive(e: SyntheticEvent) {
    e.stopPropagation();
    setActive((prev) => !prev);
  }

  function handleSelectItem(option: DropdownOption, event: SyntheticEvent) {
    let resOptions = null;
    if (multiple) {
      if (
        selected.find((optionSelected) => option.value === optionSelected.value)
      ) {
        resOptions = selected.filter(
          (selectedOption) => selectedOption !== option
        );
      } else {
        resOptions = [...selected, option];
      }
    } else {
      resOptions = [option];

      setActive(false);
    }
    if (onChange) onChange(resOptions);
    setSelected(resOptions);
    event.stopPropagation();
  }

  function renderPlaceholder() {
    return selected.length
      ? selected.map((option) => option.name).join(", ")
      : placeholder;
  }

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setFilterValue(input.value.trim());
  }

  const options = optionsProp.filter((option) =>
    option.name.includes(filterValue)
  );

  function handleInputKeyDown(e: KeyboardEvent) {
   
    if (e.key === "Enter") {
      const option = optionsProp.find((option) => option.name === filterValue);
      if (option) {
        handleSelectItem(option, e);
        setActive(false);
      }
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      setActive(true);
    }
    if (e.key === "Escape") {
      setActive(false);
    }
  }

  return (
    <div
      className={className}
      onClick={handleActive}
      onKeyDown={handleKeyDown}
      ref={dropdownRef}
      tabIndex={0}
    >
      <div className={styles.dropdown__head}>
        {active && search ? (
          <div className={styles.dropdown__control}>
            <Input
              className={styles["dropdown__control-input"]}
              onChange={handleInputChange}
              ref={inputRef}
              onKeyDown={handleInputKeyDown}
            />
          </div>
        ) : (
          <div className={styles.dropdown__placeholder}>
            {renderPlaceholder()}
          </div>
        )}
        <span className={styles.dropdown__arrow} onClick={toggleActive}>
          &#8250;
        </span>
      </div>

      <ul className={styles.dropdown__list}>
        {options.length ? (
          options.map((option, index) => {
            const className = clsx({
              [styles["dropdown__list-item"]]: true,
              [styles["dropdown__list-item_active"]]: selected.find(
                (optionSelected) => option.value === optionSelected.value
              ),
            });
            return (
              <li
                key={index}
                className={className}
                onClick={handleSelectItem.bind(null, option)}
              >
                {option.name}
              </li>
            );
          })
        ) : (
          <li className={styles["dropdown__list-item"]}>Nothing found...</li>
        )}
      </ul>
    </div>
  );
};
