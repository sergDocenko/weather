"use client";
import React, { useEffect } from "react";

import {
  select,
  scaleBand,
  scaleLinear,
  groupSort,
  max,
  axisBottom,
  create,
  axisLeft,
} from "d3";

const data = [
  { letter: "A", frequency: 0.08167 },
  { letter: "B", frequency: 0.01492 },
  { letter: "C", frequency: 0.02782 },
  { letter: "D", frequency: 0.04253 },
  { letter: "E", frequency: 0.12702 },
  { letter: "F", frequency: 0.02288 },
  { letter: "G", frequency: 0.02015 },
  { letter: "H", frequency: 0.06094 },
  { letter: "I", frequency: 0.06966 },
  { letter: "J", frequency: 0.00153 },
  { letter: "K", frequency: 0.00772 },
  { letter: "L", frequency: 0.04025 },
  { letter: "M", frequency: 0.02406 },
  { letter: "N", frequency: 0.06749 },
  { letter: "O", frequency: 0.07507 },
  { letter: "P", frequency: 0.01929 },
  { letter: "Q", frequency: 0.00095 },
  { letter: "R", frequency: 0.05987 },
  { letter: "S", frequency: 0.06327 },
  { letter: "T", frequency: 0.09056 },
  { letter: "U", frequency: 0.02758 },
  { letter: "V", frequency: 0.00978 },
  { letter: "W", frequency: 0.0236 },
  { letter: "X", frequency: 0.0015 },
  { letter: "Y", frequency: 0.01974 },
  { letter: "Z", frequency: 0.00074 },
];

function chart() {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;

  // Declare the x (horizontal position) scale.
  const x = scaleBand()
    .domain(
    
      groupSort(
        data,
        ([d]) => -d.frequency,
        (d) => d.letter
      )
    ) // descending frequency
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = scaleLinear()
    .domain([0, 2])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .attr("style", "max-width: 100%; height: auto;");

  // Add a rect for each bar.
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll()
    .data(data)
    .join("rect")
      .attr("x", (d,i) => (i+1)*60)
      .attr("y", (d) => y(d.frequency))
      .attr("height", (d) => y(0) - y(d.frequency))
      .attr("width", 40);

  // Add the x-axis and label.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(axisBottom(x).tickSizeOuter(0));

  // Add the y-axis and label, and remove the domain line.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(axisLeft(y).tickFormat((y: any) => (y * 100).toFixed()))
    // .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Frequency (%)")
    );

  // Return the SVG element.
  // return svg.node();
}

function drawChart() {
  const data = [12, 5, 6, 6, 9, 10];

  const svg = select("#chart")
    .append("svg")
    .attr("width", 700)
    .attr("height", 300);
  // svg
  // .append("text")
  // .attr("x", 100)
  // .attr("y", 100)
  // .text("Hello d3js");

  // svg.selectAll("rect").data(data).enter().append("rect");
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 80)
    .attr("y", (d, i) => 300 - 10 * d)
    .attr("width", 65)
    .attr("height", (d, i) => d * 10)
    // .attr("stroke","black")
    .attr("stroke-width", 13)
    .attr("fill", "green");
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d)
    .attr("x", (d, i) => i * 70)
    .attr("y", (d, i) => 300 - 10 * d - 3);
}
export const BarChart = () => {
  useEffect(() => {
    // drawChart();
    chart()
  }, []);

  return <div id="chart">eubuwecbuwhec</div>;
};
