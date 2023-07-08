import { Dropdown } from "../components/Dropdown/Dropdown";

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
     
    </>
  );
}
