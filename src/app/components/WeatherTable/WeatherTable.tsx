"use client";
import React, { FC, useCallback, useState } from "react";
import type { CityWeatherData, CountriesData, CountryData } from "../../types";
import { Dropdown, DropdownOption } from "../Dropdown/Dropdown";
import { Actions } from "./componets/Actions/Actions";
import { Table } from "./componets/Table/Table";
import { countryFilter, temperatureFilter } from "./filters";
import { useTemperature } from "./hooks/useTemperature";
import styles from "./weatherTable.module.css";

type WeatherTableProp = {
  children?: React.ReactNode;
  countries: CountriesData;
  citiesWeatherData: CityWeatherData[];
};

export const WeatherTable: FC<WeatherTableProp> = ({
  children,
  countries,
  citiesWeatherData,
}) => {
  const {
    minMaxTemperature,
    handleSetMaxTemperature,
    handleSetMinTemperature,
    getMaxTemperatureOptions,
    getMinTemperatureOptions,
  } = useTemperature();

  const [selectedCountries, setSelectedCountries] =
    useState<CountryData[]>(countries);

  function allFilters(data: CityWeatherData[]) {
    let weatherData = temperatureFilter(data, minMaxTemperature);
    weatherData = countryFilter(weatherData, selectedCountries);
    return weatherData;
  }

  const handleSelectCountry = useCallback((options: CountriesData) => {
    if (options.length) {
      setSelectedCountries(options);
    } else {
      setSelectedCountries(countries);
    }
  }, [countries]);

  const handleSelectMinTemperature = useCallback((option: DropdownOption[]) => {
    handleSetMinTemperature(Number(option[0]?.value));
  }, [handleSetMinTemperature]);
  const handleSelectMaxTemperature = useCallback((option: DropdownOption[]) => {
    handleSetMaxTemperature(Number(option[0]?.value));
  }, [handleSetMaxTemperature]);

  return (
    <div className={styles.weather_container}>
      <Actions>
        <Dropdown
          options={countries}
          placeholder="Country"
          multiple={true}
          search={true}
          onChange={handleSelectCountry}
        />
        <Dropdown
          options={getMinTemperatureOptions()}
          placeholder="Min"
          search={true}
          onChange={handleSelectMinTemperature}
        />
        <Dropdown
          options={getMaxTemperatureOptions().reverse()}
          placeholder="Max"
          search={true}
          onChange={handleSelectMaxTemperature}
        />
      </Actions>
      <Table citiesWeatherData={allFilters(citiesWeatherData)} />
      {children}
    </div>
  );
};
