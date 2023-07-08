import React, { FC } from "react";
import styles from "./table.module.css";
import type { CityWeatherData } from "../../../../types";
import { useModal } from "@/app/components/ModalWindow/hooks/useModal";
import { ModalWindow } from "@/app/components/ModalWindow/ModalWindow";

type TableProp = {
  citiesWeatherData: CityWeatherData[];
};

export const Table: FC<TableProp> = ({ citiesWeatherData }) => {
  const { openModal, closeModal, isOpen: isOpenModal } = useModal();

  function modalToggle() {
    if (isOpenModal) {
      closeModal();
    } else openModal();
  }

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead className={styles.tr_h}>
          <tr>
            <th>City</th>
            <th>Temparature min</th>
            <th>Temparature max</th>
            <th>Wind direction</th>
          </tr>
        </thead>
        <tbody>
          {citiesWeatherData.map((cityData, index) => (
            <tr key={index} onClick={modalToggle}>
              <td>{cityData.city}</td>
              <td>{cityData.minTemperature}</td>
              <td>{cityData.maxTemperature}</td>
              <td>{cityData.winddirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalWindow isOpen={isOpenModal} close={closeModal}>
        <h1>Modal</h1>
      </ModalWindow>
    </div>
  );
};
