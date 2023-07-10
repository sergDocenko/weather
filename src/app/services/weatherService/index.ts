import type {
  FetchDefaultParams,
  CityWeatherData,
  CityData,
} from "@/app/types";
import {
  getPreviosDate,
  parseWeatherData,
  getURL,
  getNormalizeDate,
} from "../../utils";
import httpService from "../http";

const baseUrl = `https://api.open-meteo.com/v1/forecast`;

const defaultParam: FetchDefaultParams = {
  daily: "temperature_2m_max,temperature_2m_min,winddirection_10m_dominant",
  timezone: "GMT",
  end_date: getNormalizeDate(new Date()),
};

export async function fetchWeatherData(
  location: { latitude: string; longitude: string },
  dayCount: number = 6,
  defaultParams: FetchDefaultParams = {
    ...defaultParam,
  },

  baseURL: string = baseUrl
): Promise<CityWeatherData> {
  defaultParams.start_date = defaultParams.start_date
    ? defaultParams.start_date
    : getPreviosDate(dayCount);

  const url = getURL(baseURL, { ...location, ...defaultParams });
  const response = await httpService.get(url.href);
  return await response.data;
}

export async function fetchCityWeatherData(
  cityData: CityData,
  defaultParams?: FetchDefaultParams,
  dayCount?: number
): Promise<CityWeatherData> {
  const data = await fetchWeatherData(
    {
      latitude: cityData.location.latitude,
      longitude: cityData.location.longitude,
    },
    dayCount,
    defaultParams
  );

  return {
    city: cityData.city,
    location: cityData.location,
    countryCode: cityData.countryCode,
    ...parseWeatherData(data),
  };
}

export async function fetchAllCitiesData(
  cities: CityData[],
  dayCount?: number,
  defaultParams?: FetchDefaultParams
): Promise<CityWeatherData[]> {
  const requestsPromises = cities.map((cityData: CityData) => {
    return fetchCityWeatherData(cityData, defaultParams, dayCount);
  });
  return Promise.all(requestsPromises);
}
