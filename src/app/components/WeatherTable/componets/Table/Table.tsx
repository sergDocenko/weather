import React, { FC } from "react";
import styles from "./table.module.css";
import type { CityWeatherData } from "../../../../types";

type TableProp = {
  citiesWeatherData: CityWeatherData[];
};

export const Table: FC<TableProp> = ({ citiesWeatherData }) => {

  return (
    <div className={styles.table_container}>
      <table className={styles.table}>
        <thead className={styles.tr_h}>
          <tr>
            <th>City</th>
            <th>Temparature max</th>
            <th>Temparature min</th>
            <th>Wind direction</th>
          </tr>
        </thead>
        <tbody>
          {citiesWeatherData.map((cityData) => (
            <tr key={cityData.city}>
              <td>{cityData.city}</td>
              <td>{cityData.maxTemperature}</td>
              <td>{cityData.minTemperature}</td>
              <td>{cityData.winddirection}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
