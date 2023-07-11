"use client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";
import { data, options } from "./config";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type ChartBarProps = {
  xAxisLabels: string[];
  barsData: number[];
  width?: number;
  height?: number;
};

export const ChartBar: FC<ChartBarProps> = ({
  xAxisLabels,
  barsData,
  width = 430,
  height = 410,
}) => {
  const chartData: any = data;
  chartData.datasets[0].data = barsData;
  chartData.labels = xAxisLabels;
  chartData.datasets = [...chartData.datasets];
  return (
    <Bar options={options} data={chartData} width={width} height={height} />
  );
};
