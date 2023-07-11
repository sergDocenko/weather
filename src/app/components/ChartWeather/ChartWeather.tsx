import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./chartWeather.module.css";
import clsx from "clsx";
import { ChartBar } from "@/app/components/ChartBar/ChartBar";
import type { CityWeatherData, WeatherData } from "../../types";
import { fetchWeatherData } from "@/app/services/weatherService";
import { parseWeatherData, getWeekDay } from "../../utils";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";

type ChartWeatherProps = {
  className?: string;
  cityWeatherData: CityWeatherData;
};

const options: DropdownOption[] = [
  { name: "4 Days", value: "4" },
  { name: "5 Days", value: "5" },
  { name: "6 Days", value: "6" },
  { name: "7 Days", value: "7" },
  { name: "8 Days", value: "8" },
  { name: "9 Days", value: "9" },
];

export const ChartWeather: FC<ChartWeatherProps> = ({
  className: classNameProp,
  cityWeatherData,
}) => {
  const className = clsx(classNameProp, styles["chart"]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [daysPeriod, setDaysPeriod] = useState(6);
  useEffect(() => {
    fetchWeatherData(cityWeatherData.location, daysPeriod).then((data) => {
      setWeatherData(parseWeatherData(data));
    });
  }, [cityWeatherData.location, daysPeriod]);

  const handleChangeDaysPeriod = useCallback((options: DropdownOption[]) => {
    setDaysPeriod(Number(options[0].value) - 1);
  }, []);

  const xAxisLabels = weatherData
    ? weatherData?.dailyTime.map((date) =>
        getWeekDay(new Date(date).getUTCDay())
      )
    : [];
  return (
    <div className={className}>
      <div className={styles.chart__actions}>
        <h3 className={styles.chart__actions__label}>Сhoose a period</h3>
        <Dropdown
          className={styles.chart__actions__dropdown}
          options={options}
          placeholder="Days"
          onChange={handleChangeDaysPeriod}
          tabIndex={1}
        />
      </div>

      {weatherData && (
        <ChartBar
          xAxisLabels={xAxisLabels}
          barsData={weatherData.maxTemperature}
          height={340}
        />
      )}
    </div>
  );
};
