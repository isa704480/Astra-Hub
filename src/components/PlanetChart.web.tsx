import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { planetProfiles, spaceBodies } from "../data/mockData";
import { PlanetChartProps } from "./PlanetWidgets";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const planets = spaceBodies.filter((body) => body.id !== "moon");
const shortNames: Record<string, string> = {
  mercury: "Merkuriy",
  venus: "Venera",
  earth: "Yer",
  mars: "Mars",
  jupiter: "Yupiter",
  saturn: "Saturn",
  uranus: "Uran",
  neptune: "Neptun",
};

export function PlanetChart({ metric }: PlanetChartProps) {
  const data = useMemo(
    () => ({
      labels: planets.map((body) => shortNames[body.id]),
      datasets: [
        {
          label:
            metric === "gravity"
              ? "Gravitatsiya (m/s²)"
              : "O‘rtacha harorat (°C)",
          data: planets.map((body) =>
            metric === "gravity"
              ? planetProfiles[body.type].gravityMps2
              : planetProfiles[body.type].meanTemperatureC,
          ),
          backgroundColor: planets.map((body) => body.accent),
          borderRadius: 6,
          borderSkipped: false as const,
          maxBarThickness: 34,
        },
      ],
    }),
    [metric],
  );

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 700, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: "#172437",
          padding: 10,
          callbacks: {
            label: (context) =>
              `${context.dataset.label}: ${context.parsed.y}${metric === "gravity" ? " m/s²" : "°C"}`,
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            color: "#667085",
            maxRotation: 0,
            minRotation: 0,
            font: { size: 10 },
          },
        },
        y: {
          grid: { color: "#E9EEF4" },
          ticks: { color: "#667085", font: { size: 10 } },
        },
      },
    }),
    [metric],
  );

  return (
    <View style={styles.chartArea}>
      <Bar
        key={metric}
        aria-label={
          metric === "gravity"
            ? "Sayyoralar gravitatsiyasi"
            : "Sayyoralar o‘rtacha harorati"
        }
        data={data}
        options={options}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chartArea: { width: "100%", height: 220, position: "relative" },
});
