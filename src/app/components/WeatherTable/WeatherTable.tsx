"use client";
import React, { FC, useState } from "react";
import type {
  CityWeatherData,
  CountriesData,
  CountryData,
  DropdownOption,
} from "../../types";
import { getArrayFromRange } from "../../utils";
import { Select } from "../Select/Select";
import { Actions } from "./componets/Actions/Actions";
import { Table } from "./componets/Table/Table";
import { temperatureFilter, countryFilter } from "./filters";
import { useTemperature, minMaxConf } from "./hooks/useTemperature";
import styles from "./weatherTable.module.css";
import { Dropdown } from "../Dropdown/Dropdown";

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
        <Select
          selectedOption={minMaxTemperature.min}
          getOptionValue={handleSetMinTemperature}
          options={getArrayFromRange(minMaxConf.min, minMaxConf.max - 1)}
          label="Min"
        />
        <Select
          selectedOption={minMaxTemperature.max}
          getOptionValue={handleSetMaxTemperature}
          options={getArrayFromRange(
            minMaxConf.min + 1,
            minMaxConf.max
          ).reverse()}
          label="Max"
        />
      </Actions>
      <Table citiesWeatherData={allFilters(citiesWeatherData)} />
      {children}
    </div>
  );
};
