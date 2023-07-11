"use client";
import React, { useEffect } from "react";
import styles from "./chart.module.css"

import {
  select,
  scaleBand,
  scaleLinear,
  groupSort,
  max,
  axisBottom,
  transition,
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
function rightRoundedRect(x:any, y:any , width:any, height:any, radius:any) {
  return "M" + x + "," + y
       + "h" + (width - radius)
       + "a" + radius + "," + radius + " 0 0 1 " + radius + "," + radius
       + "v" + (height - 2 * radius)
       + "a" + radius + "," + radius + " 0 0 1 " + -radius + "," + radius
       + "h" + (radius - width)
       + "z";
}

function chart() {
  // Declare the chart dimensions and margins.
  const width = 928;
  const height = 500;
  const marginTop = 30;
  const marginRight = 0;
  const marginBottom = 30;
  const marginLeft = 40;
  const marginBar = 5;

  // Declare the x (horizontal position) scale.
  const x = scaleBand()
    .domain(
      data.map((item) => item.letter)
      // groupSort(
      //   data,
      //   ([d]) => -d.frequency,
      //   (d) => d.letter
      // )
    ) // descending frequency
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  // Declare the y (vertical position) scale.
  const y = scaleLinear()
    .domain([0, 20])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  
  const svg = select("#chart")
 
    .append("svg")
    .attr("class", `${styles.chart}`)  
     
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    
    .attr("style", "max-width: 100%; height: auto;");

    

  // Add a rect for each bar.
  svg.selectAll("g")  
    .append("g")    
    // .attr("d", rightRoundedRect(-240, -120, 480, 240, 20))
    // .attr("fill", "steelblue")    
    .data(data)
    
    .join("rect")
    
    .attr(
      "x",
      (d, i) =>
        i * ((width - marginLeft - marginRight) / data.length) +
        marginLeft +
        marginBar
    )
    .attr("y", (d) => y(d.frequency * 100))
    .attr("height", (d) => y(0) - y(d.frequency * 100))
    .attr(
      "width",
      (width - marginLeft - marginRight) / data.length - marginBar
    );

  // Add the x-axis and label.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)

    .call(axisBottom(x).tickSizeOuter(0))
    .call((g) => g.select(".domain").remove());

  // Add the y-axis and label, and remove the domain line.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(axisLeft(y).tickFormat((y: any) => y.toFixed()))
    .call((g) => g.select(".domain").remove())
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
    chart();
  }, []);

  return <div id="chart">eubuwecbuwhec</div>;
};
