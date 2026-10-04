import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { CelestialType, getBodyById } from "../data/mockData";
import { PlanetGlyph } from "./PlanetGlyph";

interface Planet3DViewProps {
  bodyId: CelestialType;
}

const orbitDots = [
  { angle: 0, r: 0.92, size: 3, opacity: 0.4 },
  { angle: 45, r: 0.92, size: 2, opacity: 0.3 },
  { angle: 90, r: 0.92, size: 4, opacity: 0.5 },
  { angle: 135, r: 0.92, size: 2, opacity: 0.25 },
  { angle: 180, r: 0.92, size: 3, opacity: 0.35 },
  { angle: 225, r: 0.92, size: 2, opacity: 0.3 },
  { angle: 270, r: 0.92, size: 3, opacity: 0.45 },
  { angle: 315, r: 0.92, size: 2, opacity: 0.2 },
];

const starPositions = [
  { x: 12, y: 8, s: 2 }, { x: 88, y: 15, s: 1.5 }, { x: 25, y: 85, s: 1.5 },
  { x: 78, y: 90, s: 2 }, { x: 50, y: 5, s: 1 }, { x: 8, y: 50, s: 1.5 },
  { x: 92, y: 55, s: 1 }, { x: 35, y: 95, s: 1.5 }, { x: 65, y: 12, s: 1 },
  { x: 15, y: 30, s: 1 }, { x: 85, y: 35, s: 1 }, { x: 5, y: 75, s: 1.5 },
  { x: 95, y: 72, s: 1 }, { x: 42, y: 3, s: 1 }, { x: 58, y: 97, s: 1 },
  { x: 20, y: 60, s: 1 }, { x: 75, y: 65, s: 1 }, { x: 30, y: 20, s: 1.5 },
  { x: 70, y: 80, s: 1 }, { x: 10, y: 92, s: 1.5 },
];

export function Planet3DView({ bodyId }: Planet3DViewProps) {
  const body = getBodyById(bodyId);
  const spinAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.85)).current;
  const glowAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    );

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.85,
          duration: 3000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );

    const glow = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 2500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );

    spin.start();
    pulse.start();
    glow.start();

    return () => {
      spin.stop();
      pulse.stop();
      glow.stop();
    };
  }, [spinAnim, pulseAnim, glowAnim]);

  const spinDeg = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Stars */}
      {starPositions.map((star, i) => (
        <Animated.View
          key={`star-${i}`}
          style={[
            styles.star,
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.s,
              height: star.s,
              opacity: glowAnim,
            },
          ]}
        />
      ))}

      {/* Orbit ring */}
      <Animated.View
        style={[
          styles.orbitRing,
          { transform: [{ rotate: spinDeg }] },
        ]}
      >
        {orbitDots.map((dot, i) => {
          const rad = (dot.angle * Math.PI) / 180;
          const cx = 50 + dot.r * 50 * Math.cos(rad);
          const cy = 50 + dot.r * 50 * Math.sin(rad);
          return (
            <View
              key={`dot-${i}`}
              style={[
                styles.orbitDot,
                {
                  left: `${cx - dot.size / 2}%`,
                  top: `${cy - dot.size / 2}%`,
                  width: dot.size,
                  height: dot.size,
                  opacity: dot.opacity,
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Glow behind planet */}
      <Animated.View
        style={[
          styles.glowCircle,
          {
            backgroundColor: body.accent,
            opacity: glowAnim,
            transform: [{ scale: pulseAnim }],
          },
        ]}
      />

      {/* Planet */}
      <Animated.View
        style={[
          styles.planetWrap,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <PlanetGlyph bodyId={bodyId} size={160} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#071421",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  star: {
    position: "absolute",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  orbitRing: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 130,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  orbitDot: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  glowCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  planetWrap: {
    position: "absolute",
  },
});
