import type { CityWeatherData, MinMaxTemperature, CountriesData } from "@/app/types";

export function temperatureFilter(
  weatherData: CityWeatherData[],
  temperature: MinMaxTemperature
): CityWeatherData[] {
  return weatherData.filter(
    (data) =>
      data.maxTemperature[0] <= temperature.max &&
      data.minTemperature[0] >= temperature.min
  );
}

export  function countryFilter(weatherData: CityWeatherData[], countries:CountriesData): CityWeatherData[] {
  return weatherData.filter((item) =>
  countries.find((country) => country.value === item.countryCode)
  );   
}
