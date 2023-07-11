export type CountryData = {
  name: string;
  value: string;
};

export type CountriesData = CountryData[];

export type Location = {
  latitude: string;
  longitude: string;
};
export type WeatherData = {
  minTemperature: number[];
  maxTemperature: number[];
  winddirection: number[];
  dailyTime: string[];
};

export interface CityWeatherData extends WeatherData {
  city: string;
  countryCode: string;
  location: Location;
}

export type CityData = {
  countryCode: string;
  city: string;
  location: Location;
};
export type FetchDefaultParams = {
  daily?: string;
  timezone?: string;
  start_date?: string;
  end_date?: string;
};

export type MinMaxTemperature = {
  min: number;
  max: number;
};
