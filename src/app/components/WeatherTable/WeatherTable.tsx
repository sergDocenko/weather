"use client";
import React, { FC, useState } from "react";
import type {
  CityWeatherData,
  CountriesData,
  CountryData,
  DropdownOption,
} from "../../types";
import { Dropdown } from "../Dropdown/Dropdown";
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

  function handleSelectCountry(options: CountriesData) {
    if (options.length) {
      setSelectedCountries(options);
    } else {
      setSelectedCountries(countries);
    }
  }

  function handleSelectMinTemperature(option: DropdownOption[]) {
    handleSetMinTemperature(Number(option[0]?.value));
  }
  function handleSelectMaxTemperature(option: DropdownOption[]) {
    handleSetMaxTemperature(Number(option[0]?.value));
  }

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
          options={getMaxTemperatureOptions()}
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
