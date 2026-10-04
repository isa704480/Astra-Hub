import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BrandMark } from "../components/BrandMark";

export function SplashScreen() {
  return (
    <LinearGradient
      colors={["#F7F9FC", "#EEF3F8", "#E9EFF6"]}
      style={styles.container}
    >
      <BrandMark size={94} />
      <Text style={styles.title}>Astro Hub</Text>
      <Text style={styles.subtitle}>Uch sayyora. Bitta kosmik markaz.</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    color: "#172437",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 18,
  },
  subtitle: {
    color: "#667085",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
});
