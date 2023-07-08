"use client";
import type { DropdownOption } from "@/app/types";
import clsx from "clsx";
import {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "../Input/Input";
import styles from "./dropdown.module.css";

type DropdownProps = {
  options: DropdownOption[];
  placeholder?: string;
  multiple?: boolean;
  search?: boolean;
  onChange?: (selectedOptions: DropdownOption[]) => void;
};

export const Dropdown: FC<DropdownProps> = ({
  options: optionsProp,
  placeholder = "Select...",
  multiple = false,
  search = false,
  onChange,
}) => {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);
  const dropdownRef = useRef<any>(null);
  const inputRef = useRef<any>(null);
  const [filterValue, setFilterValue] = useState("");

  const handleDocumentClick = useCallback((event: any) => {
    if (!dropdownRef.current.contains(event.target)) {
      setActive(false);
    }
  }, []);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [selected]);

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
    event.stopPropagation();
    setSelected([option]);
    setActive(false);
  }

  function handleSelectMultipleItems(option: DropdownOption) {
    if (selected.includes(option)) {
      setSelected(
        selected.filter((selectedOption) => selectedOption !== option)
      );
    } else {
      setSelected([...selected, option]);
    }
  }

  function renderPlaceholder() {
    return selected.length
      ? selected.map((option) => option.name).join(", ")
      : placeholder;
  }

  function handleInputChange(event: SyntheticEvent) {
    const input = event.target as HTMLInputElement;
    setFilterValue(input.value);
  }

  const options = optionsProp.filter((option) =>
    option.name.includes(filterValue)
  );

  return (
    <div className={className} onClick={handleActive} ref={dropdownRef}>
      <div className={styles.dropdown__head}>
        {active && search ? (
          <div className={styles.dropdown__control}>
            <Input
              className={styles["dropdown__control-input"]}
              onChange={handleInputChange}
              ref={inputRef}
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
              [styles["dropdown__list-item_active"]]: selected.includes(option),
            });
            return (
              <li
                key={index}
                className={className}
                onClick={
                  multiple
                    ? handleSelectMultipleItems.bind(null, option)
                    : handleSelectItem.bind(null, option)
                }
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
