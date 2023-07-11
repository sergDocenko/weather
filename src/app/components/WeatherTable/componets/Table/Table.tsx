import { ChartWeather } from "@/app/components/ChartWeather/ChartWeather";
import { useModal } from "@/app/components/ModalWindow/hooks/useModal";
import { ModalWithPortal } from "@/app/components/ModalWithPortal/ModalWithPortal";
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

  type columnData = {
    headlabel: string;
    cells: string[];
  };

  type tabledataType = columnData[];

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
            <tr key={index} onClick={handleSelecteCity.bind(null, cityData)}>
              <td>{cityData.city}</td>
              <td>{cityData.minTemperature}</td>
              <td>{cityData.maxTemperature}</td>
              <td>{cityData.winddirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalWithPortal
        isOpen={isOpenModal}
        close={closeModal}
        title={selectedCity.city}
        closeButton={true}
      >
        <ChartWeather cityWeatherData={selectedCity} />
      </ModalWithPortal>
    </div>
  );
};
