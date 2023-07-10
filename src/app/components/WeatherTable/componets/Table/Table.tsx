import { ChartWeather } from "@/app/components/ChartWeather/ChartWeather";
import { ModalWindow } from "@/app/components/ModalWindow/ModalWindow";
import { useModal } from "@/app/components/ModalWindow/hooks/useModal";
import { FC, useState } from "react";
import type { CityWeatherData } from "../../../../types";
import styles from "./table.module.css";

type TableProp = {
  citiesWeatherData: CityWeatherData[];
};

export const Table: FC<TableProp> = ({ citiesWeatherData }) => {
  const { openModal, closeModal, isOpen: isOpenModal } = useModal();
  const [selectedCity, setSelectedCity] = useState<CityWeatherData>(
    citiesWeatherData[0]
  );

  function handleSelecteCity(cityData: CityWeatherData) {
    setSelectedCity(cityData);
    openModal();
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
        <tbody  >
          {citiesWeatherData.map((cityData, index) => (
            <tr key={index} onClick={handleSelecteCity.bind(null, cityData)} tabIndex={2}>
              <td>{cityData.city}</td>
              <td>{cityData.minTemperature}</td>
              <td>{cityData.maxTemperature}</td>
              <td>{cityData.winddirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalWindow isOpen={isOpenModal} close={closeModal} title={selectedCity.city} closeButton={true}>
        <ChartWeather cityWeatherData={selectedCity} />
      </ModalWindow>
    </div>
  );
};
