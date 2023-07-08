export type CountryData = {
  name: string;
  value: string;
};

export type CountriesData = CountryData[];

export type MinMaxTemperature = {
  min: number;
  max: number;
};
export type CityWeatherData = {
  city: string;
  minTemperature: number[];
  maxTemperature: number[];
  winddirection: number[];
  dailyTime: string[];
  countryCode: string;
};

export type CityData = {
  countryCode: string;
  city: string;
  location: {
    latitude: string;
    longitude: string;
  };
};
export type FetchDefaultParams = {
  daily?: string;
  timezone?: string;
  start_date?: string;
  end_date?: string;
};

export type MinMaxtemperature = {
  min: number;
  max: number;
};
export type DropdownOption = {
  name: string;
  value: string;
};
