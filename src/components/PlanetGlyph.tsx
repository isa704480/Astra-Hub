import React from "react";
import { CelestialType, getBodyById } from "../data/mockData";
import Svg, {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

interface PlanetGlyphProps {
  bodyId: CelestialType;
  size?: number;
}

const colors: Record<CelestialType, [string, string]> = {
  mercury: ["#827c76", "#d1c9bc"],
  venus: ["#b85e2e", "#f6bd67"],
  earth: ["#0750a3", "#53bcbd"],
  moon: ["#747c87", "#d6d9df"],
  mars: ["#8c3028", "#e76f51"],
  jupiter: ["#92563f", "#e8bd8d"],
  saturn: ["#9c7948", "#f0d598"],
  uranus: ["#347d8a", "#9bd9d7"],
  neptune: ["#102f80", "#4e94e7"],
};

export function PlanetGlyph({ bodyId, size = 52 }: PlanetGlyphProps) {
  const body = getBodyById(bodyId);
  const [dark, light] = colors[bodyId];
  const clipId = `glyph-clip-${bodyId}`;
  const gasGiant = ["jupiter", "saturn", "uranus", "neptune"].includes(bodyId);
  const cratered = ["mercury", "moon", "mars"].includes(bodyId);

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      accessibilityLabel={`${body.name} sayyora belgisi`}
    >
      <Defs>
        <RadialGradient
          id={`glyph-fill-${bodyId}`}
          cx="0.34"
          cy="0.28"
          r="0.78"
        >
          <Stop offset="0" stopColor={light} />
          <Stop offset="1" stopColor={dark} />
        </RadialGradient>
        <ClipPath id={clipId}>
          <Circle cx="50" cy="50" r="34" />
        </ClipPath>
      </Defs>

      {bodyId === "saturn" && (
        <Ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="14"
          fill="none"
          stroke="#d9c18d"
          strokeWidth="7"
          opacity="0.85"
        />
      )}
      <Circle cx="50" cy="50" r="35" fill={`url(#glyph-fill-${bodyId})`} />
      <G clipPath={`url(#${clipId})`}>
        {bodyId === "earth" && (
          <G fill="#79c98e">
            <Path d="M22 39l8-10 12 1 4 8-6 7-10-2-4 9-9-4z" />
            <Path d="M49 48l10-5 9 5-2 9-7 13-7-7 1-9-8-2z" />
            <Path d="M66 30l10 4 4 8-8 5-8-6z" />
          </G>
        )}
        {bodyId === "venus" && (
          <G fill="none" stroke="#ffe0a5" strokeWidth="4" opacity="0.58">
            <Path d="M14 37q18-11 35 0t36 0" />
            <Path d="M12 51q18-10 37 0t38 0" />
            <Path d="M15 65q17-11 35 0t35 0" />
          </G>
        )}
        {gasGiant && (
          <G fill="none" strokeWidth="5" opacity="0.55">
            <Path d="M14 34q34 9 72 0" stroke={light} />
            <Path d="M12 46q38-8 76 0" stroke={dark} />
            <Path d="M12 57q38 9 76 0" stroke={light} />
            <Path d="M16 69q34-8 68 0" stroke={dark} />
            {bodyId === "jupiter" && (
              <Ellipse
                cx="65"
                cy="58"
                rx="9"
                ry="5"
                fill="#a94735"
                stroke="none"
                opacity="0.95"
              />
            )}
          </G>
        )}
        {cratered && (
          <G>
            <Circle cx="34" cy="39" r="6" fill={dark} opacity="0.48" />
            <Circle cx="62" cy="35" r="4" fill={dark} opacity="0.4" />
            <Circle cx="58" cy="63" r="7" fill={dark} opacity="0.38" />
            <Circle cx="31" cy="64" r="3" fill={light} opacity="0.56" />
          </G>
        )}
        <Ellipse cx="65" cy="50" rx="20" ry="42" fill="#061426" opacity="0.2" />
      </G>
      <Circle
        cx="50"
        cy="50"
        r="35"
        fill="none"
        stroke="rgba(255,255,255,0.58)"
        strokeWidth="1.5"
      />
      {bodyId === "saturn" && (
        <Ellipse
          cx="50"
          cy="50"
          rx="47"
          ry="14"
          fill="none"
          stroke="#f0dda9"
          strokeWidth="2.5"
        />
      )}
      <Circle cx="37" cy="31" r="5" fill="#fff" opacity="0.18" />
    </Svg>
  );
}
