import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  LinearGradient,
  Path,
  Stop,
} from "react-native-svg";

import { CelestialType, getBodyById } from "../data/mockData";

interface PlanetSurfaceMapProps {
  bodyId: CelestialType;
}

const colors: Record<CelestialType, [string, string, string]> = {
  mercury: ["#5b5b61", "#c1b7a6", "#e0cda7"],
  venus: ["#a84827", "#ed9d58", "#ffd48b"],
  earth: ["#064b96", "#168bd2", "#72d7c2"],
  moon: ["#595d68", "#aeb2b8", "#e5e7eb"],
  mars: ["#6e211a", "#c65438", "#f49c70"],
  jupiter: ["#844b37", "#ca8b61", "#f2d2a2"],
  saturn: ["#8f7041", "#d8b879", "#f4e1ad"],
  uranus: ["#257d89", "#66bdc5", "#b6ece4"],
  neptune: ["#08286e", "#1762c2", "#72b9f1"],
};

const craterSets: Record<CelestialType, Array<[number, number, number]>> = {
  mercury: [
    [108, 69, 12],
    [146, 116, 8],
    [181, 76, 16],
    [208, 122, 9],
    [132, 151, 6],
  ],
  venus: [
    [115, 85, 9],
    [171, 128, 12],
    [205, 81, 6],
  ],
  earth: [],
  moon: [
    [108, 69, 12],
    [146, 116, 8],
    [181, 76, 16],
    [208, 122, 9],
    [132, 151, 6],
  ],
  mars: [
    [108, 69, 10],
    [146, 116, 8],
    [181, 76, 13],
    [208, 122, 7],
    [132, 151, 5],
  ],
  jupiter: [],
  saturn: [],
  uranus: [],
  neptune: [],
};

export function PlanetSurfaceMap({ bodyId }: PlanetSurfaceMapProps) {
  const body = getBodyById(bodyId);
  const [dark, base, light] = colors[bodyId];
  const isSaturn = bodyId === "saturn";
  const isGiant = ["jupiter", "saturn", "uranus", "neptune"].includes(bodyId);

  return (
    <View style={styles.container}>
      <Svg
        width="100%"
        height={238}
        viewBox="0 0 320 220"
        accessibilityLabel={`${body.name} sirt yoki bulut qatlamlarining offline xaritasi`}
      >
        <Defs>
          <LinearGradient id="planetSurfaceFill" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor={light} />
            <Stop offset="0.48" stopColor={base} />
            <Stop offset="1" stopColor={dark} />
          </LinearGradient>
          <ClipPath id="planetSurfaceClip">
            <Circle cx="160" cy="108" r="70" />
          </ClipPath>
        </Defs>

        {isSaturn && (
          <Ellipse
            cx="160"
            cy="108"
            rx="112"
            ry="28"
            fill="none"
            stroke="#ead6a8"
            strokeWidth="14"
            opacity="0.62"
          />
        )}

        <Circle cx="160" cy="108" r="72" fill={`${base}35`} />
        <Circle cx="160" cy="108" r="70" fill="url(#planetSurfaceFill)" />

        <G clipPath="url(#planetSurfaceClip)">
          {isGiant ? (
            <G>
              <Path
                d="M82 66 Q160 52 238 67"
                stroke={light}
                strokeWidth="11"
                opacity="0.55"
              />
              <Path
                d="M82 87 Q160 76 238 89"
                stroke={dark}
                strokeWidth="8"
                opacity="0.55"
              />
              <Path
                d="M82 108 Q160 96 238 110"
                stroke={light}
                strokeWidth="13"
                opacity="0.45"
              />
              <Path
                d="M82 132 Q160 120 238 134"
                stroke={dark}
                strokeWidth="10"
                opacity="0.48"
              />
              <Path
                d="M87 153 Q160 146 233 154"
                stroke={light}
                strokeWidth="7"
                opacity="0.45"
              />
              {bodyId === "jupiter" && (
                <Ellipse
                  cx="183"
                  cy="121"
                  rx="19"
                  ry="10"
                  fill="#a64f38"
                  opacity="0.85"
                />
              )}
            </G>
          ) : bodyId === "earth" ? (
            <G>
              <Path
                d="M107 75 L124 66 139 72 147 84 139 92 126 89 119 102 107 96 101 84Z"
                fill="#63b887"
              />
              <Path
                d="M143 108 L156 101 168 106 175 119 169 133 163 151 151 143 149 128 139 120Z"
                fill="#8ac979"
              />
              <Path
                d="M183 75 L201 72 214 84 209 97 195 99 189 91 178 91Z"
                fill="#a0cf79"
              />
              <Path
                d="M199 125 L211 121 220 129 216 139 204 141Z"
                fill="#77bd78"
              />
              <Path
                d="M92 113 Q160 96 228 114"
                stroke="#b7f4ee"
                strokeWidth="2"
                opacity="0.45"
                fill="none"
              />
            </G>
          ) : bodyId === "venus" ? (
            <G fill="none" stroke="#ffe0aa" strokeWidth="6" opacity="0.42">
              <Path d="M91 84 Q128 61 163 84 T232 81" />
              <Path d="M88 111 Q127 91 163 111 T234 109" />
              <Path d="M92 139 Q129 118 164 138 T228 136" />
            </G>
          ) : (
            <G>
              {bodyId === "mars" && (
                <Path
                  d="M104 127 Q132 102 148 121 T183 118 Q199 103 218 123 L223 160 100 160Z"
                  fill="#8c3329"
                  opacity="0.52"
                />
              )}
              {craterSets[bodyId].map(([cx, cy, radius], index) => (
                <G key={`${cx}-${cy}-${index}`}>
                  <Circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill={dark}
                    opacity="0.43"
                  />
                  <Circle
                    cx={cx - 2}
                    cy={cy - 2}
                    r={radius * 0.66}
                    fill="none"
                    stroke={light}
                    strokeWidth="1.5"
                    opacity="0.58"
                  />
                </G>
              ))}
            </G>
          )}
          <Ellipse
            cx="192"
            cy="108"
            rx="39"
            ry="77"
            fill="#050b19"
            opacity="0.22"
          />
          <Circle
            cx="160"
            cy="108"
            r="69"
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1"
          />
        </G>

        {isSaturn && (
          <Ellipse
            cx="160"
            cy="108"
            rx="112"
            ry="28"
            fill="none"
            stroke="#f1dfb6"
            strokeWidth="4"
            opacity="0.85"
          />
        )}
        <Circle
          cx="160"
          cy="108"
          r="70"
          fill="none"
          stroke="rgba(255,255,255,0.42)"
          strokeWidth="1"
        />
      </Svg>
      <View style={styles.captionRow}>
        <Text style={styles.planetName}>
          {body.emoji} {body.name}
        </Text>
        <Text style={styles.modelTag}>
          {isGiant ? "BULUT QATLAMLARI" : "SIRT MODELI"}
        </Text>
      </View>
      <Text style={styles.note}>
        Illyustrativ offline xarita; haqiqiy surat yoki topografik skan emas.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DFE6EE",
    padding: 12,
    overflow: "hidden",
  },
  captionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  planetName: { color: "#172437", fontSize: 16, fontWeight: "700" },
  modelTag: {
    color: "#0891B2",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  note: {
    color: "#778396",
    fontSize: 10,
    lineHeight: 14,
    marginTop: 8,
    paddingHorizontal: 4,
  },
});
