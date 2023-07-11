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
export function parseWeatherData({ daily }: any) {
  return {
    dailyTime: daily.time,
    maxTemperature: daily.temperature_2m_max,
    minTemperature: daily.temperature_2m_min,
    winddirection: daily.winddirection_10m_dominant,
  };
}
export function getPreviosDate(daysCount: number) {
  const date: Date = new Date();
  date.setDate(date.getDate() - (daysCount - 1));
  return getNormalizeDate(date);
}
export function getNormalizeDate(date: Date) {
  return date.toISOString().split("T")[0];
}
export function getWeekDay(day: number): string {
  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return week[day] ? week[day] : "";
}
