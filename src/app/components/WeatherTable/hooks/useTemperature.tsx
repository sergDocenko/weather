import { getOptionsFromRange } from "@/app/utils";
import { useState } from "react";
import type { DropdownOption } from "../../Dropdown/Dropdown";

 const minMaxConf = {
  min: -80,
  max: 80,
};
export function useTemperature() {
  const [minMaxTemperature, setMinMaxTemperature] = useState(minMaxConf);
  function handleSetMinTemperature(temperature: number) {
    if (temperature < minMaxTemperature.max)
      setMinMaxTemperature({ ...minMaxTemperature, min: temperature });
  }
  function handleSetMaxTemperature(temperature: number) {
    if (temperature > minMaxTemperature.min)
      setMinMaxTemperature({ ...minMaxTemperature, max: temperature });
  }

  function getMinTemperatureOptions(): DropdownOption[] {
    return getOptionsFromRange(minMaxConf.min, minMaxTemperature.max - 1);
  }
  function getMaxTemperatureOptions(): DropdownOption[] {
    return getOptionsFromRange(minMaxTemperature.min + 1, minMaxConf.max);
  }
  return {
    handleSetMaxTemperature,
    handleSetMinTemperature,
    getMinTemperatureOptions,
    getMaxTemperatureOptions,
    minMaxTemperature,
  };
}
