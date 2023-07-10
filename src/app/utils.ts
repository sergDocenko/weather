import type { DropdownOption } from "./components/Dropdown/Dropdown";

export function getOptionsFromRange(
  min: number,
  max: number
): DropdownOption[] {
  const array = [];
  for (let i = min; i <= max; i++)
    array.push({ name: i.toString(), value: i.toString() });
  return array;
}

export function getURL(base: string, params: { [key: string]: string }) {
  const resURL = new URL(base);
  Object.entries(params).forEach(([key, value]) =>
    resURL.searchParams.set(key, value)
  );
  return resURL;
}
export function parseWeatherData(cityAllData: any) {
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
}
export function getWeekDay(dayNumber: number): string {
  switch (dayNumber) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "";
  }
}
