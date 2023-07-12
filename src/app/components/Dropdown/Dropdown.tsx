"use client";

import clsx from "clsx";
import React, {
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
  className?: string;
  onChange?: (selectedOptions: DropdownOption[]) => void;
  selectedProp?: DropdownOption[];
  tabIndex?: number;
};

const DropDown: FC<DropdownProps> = ({
  options: optionsProp,
  placeholder = "Select...",
  multiple = false,
  search = false,
  className: classNameProp,
  onChange,
  selectedProp = [],
  tabIndex = 0,
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
    classNameProp,
    [styles.dropdown]: true,
    [styles.dropdown_active]: active,
  });
  const options = optionsProp.filter((option) =>
    option.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  function handleActive() {
    setActive(true);
  }

  function toggleActive(e: SyntheticEvent) {
    e.stopPropagation();
    setActive((prev) => !prev);
  }
  function setSingleOption(option: DropdownOption) {
    const resOptions = [option];
    setSelected(resOptions);
    if (onChange) onChange(resOptions);
  }

  function setMultipleOptions(option: DropdownOption) {
    const found = selected.find(
      (optionSelected) => option.value === optionSelected.value
    );
    const resOptions: DropdownOption[] = found
      ? selected.filter((selectedOption) => selectedOption !== option)
      : [...selected, option];
    if (onChange) onChange(resOptions);
    setSelected(resOptions);
  }

  function handleSelectItem(option: DropdownOption, event?: SyntheticEvent) {
    event && event.stopPropagation();
    if (multiple) {
      setMultipleOptions(option);
    } else {
      setSingleOption(option);
      setActive(false);
    }
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

  function handleInputKeyEnter(event: KeyboardEvent) {
    event.stopPropagation();
    const option = optionsProp.find((option) => option.name === filterValue);
    if (option) {
      handleSelectItem(option);
      setActive(false);
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
      tabIndex={tabIndex}
    >
      <div className={styles.dropdown__head}>
        {active && search ? (
          <div className={styles.dropdown__control}>
            <Input
              className={styles["dropdown__control-input"]}
              onChange={handleInputChange}
              ref={inputRef}
              onEnter={handleInputKeyEnter}
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
export const Dropdown = React.memo(DropDown);
