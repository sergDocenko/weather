import { Dropdown } from "../components/Dropdown/Dropdown";
import { ChartBar } from "../components/ChartBar/ChartBar";
import CustomizedTables from "../components/WeatherTable/componets/NewTable/NewTable"

const optionsMock = [
  {
    name: "name-1",
    value: "name1",
  },
  {
    name: "name-2",
    value: "name2",
  },
  {
    name: "name-3",
    value: "name3",
  },
  {
    name: "name-4",
    value: "name4",
  },
];

export default function Sandbox() {
  return (
    <>
     <Dropdown options={[]} />
      <Dropdown options={optionsMock} placeholder="Country" />
      <CustomizedTables/>
     {/* <ChartBar xAxisLabels={xAxisLabels} barsData={barsData} /> */}
    </>
  );
}
