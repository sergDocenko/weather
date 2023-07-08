import type { CityData } from "./types";

export function getArrayFromRange(min: number, max: number) {
    const array = [];
    for (let i = min; i <= max; i++) array.push(i);
    return array;
  }  

  export function getURL(base: string, params: { [key: string]: string }) {
    const resURL = new URL(base);
    Object.entries(params).forEach(([key, value]) =>
      resURL.searchParams.set(key, value)
    );
    return resURL;
  }
  export function parseCityData(cityAllData: any) {
    const res = {
      minTemperature: [],
      maxTemperature: [],
      winddirection: [],
      dailyTime: [],
    };
    res.dailyTime = cityAllData.daily.time;
    res.maxTemperature = cityAllData.daily.temperature_2m_max;
    res.minTemperature = cityAllData.daily.temperature_2m_min;
    res.winddirection = cityAllData.daily.winddirection_10m_dominant;
    return res;
  }
  export function getPreviosDate(daysCount: number) {
    const date: Date = new Date();
    date.setDate(date.getDate() - daysCount);
    return getNormalizeDate(date);
  }
  export function getNormalizeDate(date: Date) {
    return date.toISOString().split("T")[0];
  };
  export function getAllCities(data: any): CityData[] {
    const resArray: any = [];
    for (let key in data) {    
      const cityData:CityData={       
        countryCode:key,
        ...data[key]
        
      }
      console.log(cityData,"wqjdnijqwni");
      
      resArray.push(...data[key]);
    }
    return resArray;
  }