import React, { useState } from "react";

export const minMaxConf = {
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
  return {
    handleSetMaxTemperature,
    handleSetMinTemperature,
    minMaxTemperature,
  };
}
