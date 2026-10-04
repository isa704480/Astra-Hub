import React from "react";
import Svg, { Circle, Path, Text as SvgText } from "react-native-svg";

interface BrandMarkProps {
  size?: number;
}

export function BrandMark({ size = 48 }: BrandMarkProps) {
  const showHubLabel = size >= 84;

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      accessibilityLabel="Astro Hub logotipi"
    >
      <Circle cx="256" cy="256" r="228" fill="#071421" />
      <Circle
        cx="256"
        cy="256"
        r="78"
        fill="none"
        stroke="#16B8C7"
        strokeWidth="8"
        opacity="0.9"
      />
      <Circle
        cx="256"
        cy="256"
        r="126"
        fill="none"
        stroke="#4C83E8"
        strokeWidth="7"
        opacity="0.85"
      />
      <Circle
        cx="256"
        cy="256"
        r="176"
        fill="none"
        stroke="#16B8C7"
        strokeWidth="6"
        opacity="0.72"
      />
      <Path
        d="M256 256L256 75M256 256L101 337M256 256L411 337"
        fill="none"
        stroke="#50D2D6"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.88"
      />
      <Circle cx="256" cy="256" r="48" fill="#F8B936" />
      {showHubLabel && (
        <SvgText
          x="256"
          y="268"
          textAnchor="middle"
          fontFamily="sans-serif"
          fontSize="36"
          fontWeight="800"
          fill="#071421"
        >
          HUB
        </SvgText>
      )}
      <Circle cx="256" cy="75" r="24" fill="#D6E2EE" />
      <Circle cx="248" cy="67" r="7" fill="#FFFFFF" opacity="0.8" />
      <Circle cx="101" cy="337" r="29" fill="#3B82F6" />
      <Path
        d="M84 338c9-12 17-13 25-3 7 8 11 8 17 3-2 14-13 24-27 24-12 0-21-9-22-21 3 1 5 0 7-3z"
        fill="#73D2C2"
      />
      <Circle cx="411" cy="337" r="28" fill="#EF5A51" />
      <Circle cx="402" cy="328" r="7" fill="#FFAB83" opacity="0.82" />
    </Svg>
  );
}
