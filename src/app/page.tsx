import countriesData from "../countries.json";
import citiesData from "../cities.json";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";
import styles from "./page.module.css";
import { CityData, CityWeatherData, FetchDefaultParams } from "./types";
import {
  getNormalizeDate, 
  getPreviosDate,
  getURL,
  parseCityData,
} from "./utils";

const baseURL = `https://api.open-meteo.com/v1/forecast`;
const defaultParam: FetchDefaultParams = {
  daily: "temperature_2m_max,temperature_2m_min,winddirection_10m_dominant",
  timezone: "GMT",
  end_date: getNormalizeDate(new Date()),
};

export default async function Home() {
  // const weather = await fetchCityData("IT", baseURL, {
  //   latitude: "54.5049",
  //   longitude: "24.8208",
  // });
  const allCitiesWeatherData = await fetchAllCitiesData(citiesData, baseURL, 0);

  // console.log(allCitiesWeatherData);

  return (
    <main className={styles.main}>
      <WeatherTable
        countries={countriesData}
        citiesWeatherData={allCitiesWeatherData}
      ></WeatherTable>
    </main>
  );
}

async function fetchAllCitiesData(
  cities: CityData[],
  baseURL: string,
  dayCount: number,
  defaultParams?: FetchDefaultParams
) {
  const requestsPromises = cities.map((cityData: CityData) => {
    return fetchCityData(
      cityData.city,
      cityData.countryCode,
      baseURL,
      {
        latitude: cityData.location.latitude,
        longitude: cityData.location.longitude,
      },
      defaultParams,
      dayCount
    );
  });
  return Promise.all(requestsPromises);
}

async function fetchCityData(
  cityName: string,
  countryCode:string,
  baseURL: string,
  params: { latitude: string; longitude: string },
  defaultParams: FetchDefaultParams = {
    ...defaultParam,
  },
  dayCount: number = 6
): Promise<CityWeatherData> {
  defaultParams.start_date = getPreviosDate(dayCount);

  const url = getURL(baseURL, { ...params, ...defaultParams });
  const response = await fetch(url.href);
  const jsonRes = await response.json();

  return {city:cityName,countryCode, ...parseCityData(jsonRes) };
}
