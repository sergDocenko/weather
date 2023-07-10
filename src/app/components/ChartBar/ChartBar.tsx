"use client";
import React, { FC } from "react";
import { options, data } from "./config";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
  chartData.labels = xAxisLabels;
  chartData.datasets[0].data = barsData;

  return (
    <Bar options={options} data={chartData} width={width} height={height} />
  );
};
