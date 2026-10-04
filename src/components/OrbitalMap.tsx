import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, Ellipse, G, Text as SvgText } from "react-native-svg";
import { CelestialType, spaceBodies } from "../data/mockData";

interface OrbitalMapProps {
  date: Date;
  onSelect: (bodyId: CelestialType) => void;
}

const TAU = Math.PI * 2;
const DAY_MS = 24 * 60 * 60 * 1000;

function orbitPosition(
  date: Date,
  periodDays: number,
  radiusX: number,
  radiusY: number,
) {
  const days = date.getTime() / DAY_MS;
  const angle = ((days / periodDays) % 1) * TAU - Math.PI / 2;
  return {
    x: 170 + Math.cos(angle) * radiusX,
    y: 102 + Math.sin(angle) * radiusY,
  };
}

export function OrbitalMap({ date, onSelect }: OrbitalMapProps) {
  const orbitalBodies = [
    {
      id: "mercury",
      period: 87.97,
      radiusX: 23,
      radiusY: 14,
      color: "#d1d5db",
      size: 3,
    },
    {
      id: "venus",
      period: 224.7,
      radiusX: 36,
      radiusY: 23,
      color: "#f4c27a",
      size: 4,
    },
    {
      id: "earth",
      period: 365.256,
      radiusX: 50,
      radiusY: 31,
      color: "#3B82F6",
      size: 5,
    },
    {
      id: "mars",
      period: 686.98,
      radiusX: 66,
      radiusY: 42,
      color: "#EF4444",
      size: 4,
    },
    {
      id: "jupiter",
      period: 4332.59,
      radiusX: 88,
      radiusY: 54,
      color: "#d4a373",
      size: 7,
    },
    {
      id: "saturn",
      period: 10759.2,
      radiusX: 109,
      radiusY: 68,
      color: "#e2ca91",
      size: 6,
    },
    {
      id: "uranus",
      period: 30688.5,
      radiusX: 128,
      radiusY: 79,
      color: "#8bd5d7",
      size: 5,
    },
    {
      id: "neptune",
      period: 60182,
      radiusX: 145,
      radiusY: 90,
      color: "#57b5ed",
      size: 5,
    },
  ] as const;
  const planets = orbitalBodies.map((body) => ({
    ...body,
    position: orbitPosition(date, body.period, body.radiusX, body.radiusY),
  }));
  const earth = orbitPosition(date, 365.256, 50, 31);
  const moonDays = date.getTime() / DAY_MS;
  const moonAngle = ((moonDays / 27.3) % 1) * TAU;
  const moon = {
    x: earth.x + Math.cos(moonAngle) * 17,
    y: earth.y + Math.sin(moonAngle) * 12,
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapViewport}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 340 204"
          accessibilityLabel="Quyosh tizimi orbit xaritasi"
        >
          {planets.map((body) => (
            <Ellipse
              key={`${body.id}-orbit`}
              cx="170"
              cy="102"
              rx={body.radiusX}
              ry={body.radiusY}
              fill="none"
              stroke="rgba(124,58,237,0.34)"
              strokeWidth="1"
              strokeDasharray="4 5"
            />
          ))}
          <Circle cx="170" cy="102" r="17" fill="rgba(251,191,36,0.16)" />
          <Circle cx="170" cy="102" r="8" fill="#FBBF24" />
          <Ellipse
            cx={earth.x}
            cy={earth.y}
            rx="17"
            ry="12"
            fill="none"
            stroke="rgba(209,213,219,0.45)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <Circle cx={moon.x} cy={moon.y} r="3.5" fill="#D1D5DB" />
          <SvgText x="181" y="106" fill="#FBBF24" fontSize="9">
            Quyosh
          </SvgText>
          {planets.map((body) => {
            const celestial = spaceBodies.find((item) => item.id === body.id)!;
            const point = body.position;
            return (
              <G key={body.id}>
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={body.size + 8}
                  fill="transparent"
                />
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={body.size + 2}
                  fill={`${body.color}40`}
                />
                <Circle
                  cx={point.x}
                  cy={point.y}
                  r={body.size}
                  fill={body.color}
                />
                <SvgText
                  x={point.x + 7}
                  y={point.y - 5}
                  fill={body.color}
                  fontSize="8"
                >
                  {celestial.name}
                </SvgText>
              </G>
            );
          })}
          <SvgText x={moon.x + 5} y={moon.y + 4} fill="#D1D5DB" fontSize="8">
            Oy
          </SvgText>
          <G opacity="0.7">
            <Circle cx="20" cy="24" r="1" fill="#fff" />
            <Circle cx="314" cy="33" r="1.2" fill="#fff" />
            <Circle cx="294" cy="174" r="1" fill="#fff" />
            <Circle cx="35" cy="176" r="1.2" fill="#fff" />
          </G>
        </Svg>
        {planets.map((body) => {
          const celestial = spaceBodies.find((item) => item.id === body.id)!;
          return (
            <Pressable
              key={`${body.id}-target`}
              accessibilityRole="button"
              accessibilityLabel={`${celestial.name} haqida batafsil`}
              onPress={() => onSelect(body.id)}
              style={[
                styles.planetHitArea,
                {
                  left: `${(body.position.x / 340) * 100}%`,
                  top: `${(body.position.y / 204) * 100}%`,
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.legend}>
        <Text style={styles.legendItem}>
          <Text style={styles.sun}>●</Text> Quyosh
        </Text>
        <Text style={styles.legendItem}>
          <Text style={styles.moon}>●</Text> Oy
        </Text>
        {planets.map((body) => {
          const celestial = spaceBodies.find((item) => item.id === body.id)!;
          return (
            <Text key={body.id} style={styles.legendItem}>
              <Text style={{ color: body.color }}>●</Text> {celestial.name}
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DFE6EE",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingTop: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 8,
  },
  mapViewport: { width: "100%", aspectRatio: 340 / 204, position: "relative" },
  planetHitArea: {
    position: "absolute",
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: -16,
    marginTop: -16,
    backgroundColor: "transparent",
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    rowGap: 8,
    columnGap: 8,
    paddingBottom: 14,
    paddingTop: 2,
  },
  legendItem: { color: "#9CA3AF", fontSize: 11 },
  sun: { color: "#FBBF24" },
  moon: { color: "#D1D5DB" },
  mars: { color: "#EF4444" },
});
