import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, useWindowDimensions, View } from "react-native";
import Svg, { Line, Rect, Text as SvgText } from "react-native-svg";

import { planetProfiles, spaceBodies } from "../data/mockData";
import { PlanetChartProps } from "./PlanetWidgets";

const planets = spaceBodies.filter((body) => body.id !== "moon");
const shortNames: Record<string, string> = {
  mercury: "Mer",
  venus: "Ven",
  earth: "Yer",
  mars: "Mars",
  jupiter: "Yup",
  saturn: "Sat",
  uranus: "Ura",
  neptune: "Nep",
};

export function PlanetChart({ metric }: PlanetChartProps) {
  const { width: windowWidth } = useWindowDimensions();
  const chartWidth = Math.max(280, Math.min(390, windowWidth - 72));
  const opacity = useRef(new Animated.Value(0)).current;
  const values = planets.map((body) =>
    metric === "gravity"
      ? planetProfiles[body.type].gravityMps2
      : planetProfiles[body.type].meanTemperatureC,
  );
  const minimum = metric === "gravity" ? 0 : -220;
  const maximum = metric === "gravity" ? 28 : 500;
  const plot = { left: 34, right: 8, top: 12, bottom: 34 };
  const plotWidth = chartWidth - plot.left - plot.right;
  const plotHeight = 164;
  const baseline = plot.top + (maximum / (maximum - minimum)) * plotHeight;
  const slot = plotWidth / planets.length;

  useEffect(() => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [metric, opacity]);

  return (
    <Animated.View style={{ opacity }}>
      <View style={styles.chartArea}>
        <Svg
          width={chartWidth}
          height={220}
          accessibilityLabel={
            metric === "gravity"
              ? "Sayyoralar gravitatsiyasi"
              : "Sayyoralar harorati"
          }
        >
          {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
            const y = plot.top + fraction * plotHeight;
            const value = maximum - fraction * (maximum - minimum);
            return (
              <React.Fragment key={fraction}>
                <Line
                  x1={plot.left}
                  y1={y}
                  x2={chartWidth - plot.right}
                  y2={y}
                  stroke="#E9EEF4"
                  strokeWidth="1"
                />
                <SvgText
                  x={plot.left - 5}
                  y={y + 3}
                  textAnchor="end"
                  fill="#667085"
                  fontSize="8"
                >
                  {Math.round(value)}
                </SvgText>
              </React.Fragment>
            );
          })}
          {planets.map((body, index) => {
            const value = values[index];
            const valueY =
              plot.top + ((maximum - value) / (maximum - minimum)) * plotHeight;
            const x = plot.left + index * slot + slot * 0.2;
            const height = Math.max(2, Math.abs(baseline - valueY));
            return (
              <React.Fragment key={body.id}>
                <Rect
                  x={x}
                  y={Math.min(baseline, valueY)}
                  width={slot * 0.6}
                  height={height}
                  rx="4"
                  fill={body.accent}
                />
                <SvgText
                  x={plot.left + index * slot + slot / 2}
                  y={plot.top + plotHeight + 18}
                  textAnchor="middle"
                  fill="#667085"
                  fontSize="8"
                >
                  {shortNames[body.id]}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chartArea: { width: "100%", height: 220, alignItems: "center" },
});
