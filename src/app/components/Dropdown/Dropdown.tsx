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

  function handleActive(event: any) {
    event.stopPropagation();
    setActive(true);
  }

  function toggleActive(e: SyntheticEvent) {
    e.stopPropagation();
    setActive((prev) => !prev);
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

  function handleBlur(event: any) {
    event.stopPropagation();
    setActive(false);
  }

  function handleFocus(event: any) {
    event.stopPropagation();
    setActive(true);
  }

  function handleInputEnter() {
    const option = optionsProp.find((option) => option.name === filterValue);

    if (!option) {
      return;
    }

    if (multiple) {
      setMultipleItems(option);
      setActive(false);
    } else {
      setSingleItem(option);
      setActive(false);
    }
  }

  function handleSelect(option: DropdownOption, event: SyntheticEvent) {
    event.stopPropagation();

    if (multiple) {
      setMultipleItems(option);
    } else {
      setSingleItem(option);
      setActive(false);
    }
  }

  function setSingleItem(option:DropdownOption) {
    const change = [option];

    setSelected(change);

    if(onChange) {
      onChange(change);
    }
  }

  function setMultipleItems(option:DropdownOption) {
    const found = selected.find((item) => item === option);
    const change = found ? selected.filter((item) => item !== option) : [...selected, option];

    setSelected(change);

    if(onChange) {
      onChange(change);
    }
  }

  return (
    <div
      className={className}
      onClick={handleActive}
      ref={dropdownRef}
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className={styles.dropdown__head}>
        {active && search ? (
          <div className={styles.dropdown__control}>
            <Input
              className={styles["dropdown__control-input"]}
              onChange={handleInputChange}
              ref={inputRef}
              onEnter={handleInputEnter}
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
                onClick={handleSelect.bind(null, option)}
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
