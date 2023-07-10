import React, { FC, useEffect, useState } from "react";
import styles from "./chartWeather.module.css";
import clsx from "clsx";
import { ChartBar } from "@/app/components/ChartBar/ChartBar";
import type { CityWeatherData, WeatherData } from "../../types";
import { fetchWeatherData } from "@/app/services/weatherService";
import { parseWeatherData, getWeekDay } from "../../utils";

type ChartWeatherProps = {
  className?: string;
  cityWeatherData: CityWeatherData;
};

export const ChartWeather: FC<ChartWeatherProps> = ({
  className: classNameProp,
  cityWeatherData,
}) => {
  const className = clsx(classNameProp, styles["chart-wrapper"]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  useEffect(() => {
    fetchWeatherData(cityWeatherData.location, 6).then((data) => {
      setWeatherData(parseWeatherData(data));
    });
  }, []);

  const xAxisLabels = weatherData
    ? weatherData?.dailyTime.map((date) =>
        getWeekDay(new Date(date).getUTCDay())
      )
    : [];
  return (
    <div className={className}>
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
