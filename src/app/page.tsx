import citiesData from "../cities.json";
import countriesData from "../countries.json";
import { WeatherTable } from "./components/WeatherTable/WeatherTable";
import styles from "./page.module.css";
import { fetchAllCitiesData } from "./services/weatherService";

export default async function Home() {
  const allCitiesWeatherData = await fetchAllCitiesData(citiesData, 0);

  return (
    <main className={styles.main}>
      <WeatherTable
        countries={countriesData}
        citiesWeatherData={allCitiesWeatherData}
      ></WeatherTable>
    </main>
  );
}
