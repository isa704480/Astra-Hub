import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import {
  getBodyById,
  makeLiveSnapshot,
  offlineObservations,
} from "../data/mockData";
import { useSpaceStore } from "../store/useSpaceStore";

export function MarsScreen({ navigation }: any) {
  const mars = getBodyById("mars");
  const { toggleFavorite, isFavorite } = useSpaceStore();
  const [tick, setTick] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const live = useMemo(() => makeLiveSnapshot("mars"), [tick]);

  return (
    <LinearGradient
      colors={["#1a0d14", "#2d1911", "#431e1a"]}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Red planet telemetry</Text>
            <Text style={styles.title}>Mars</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Compare")}
            style={styles.compareButton}
          >
            <Text style={styles.compareText}>Taqqoslash</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient colors={mars.gradient} style={styles.heroCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.emoji}>{mars.emoji}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(mars.id)}
              hitSlop={12}
            >
              <Ionicons
                name={isFavorite(mars.id) ? "heart" : "heart-outline"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.badge}>{mars.badge}</Text>
          <Text style={styles.name}>{mars.name}</Text>
          <Text style={styles.subtitle}>{mars.subtitle}</Text>

          <View style={styles.liveRow}>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>LOCAL TIME</Text>
              <Text style={styles.liveValue}>{live.time}</Text>
            </View>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>Dust</Text>
              <Text style={styles.liveValue}>{live.status}</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.description}>{mars.description}</Text>

        <View style={styles.roverCard}>
          <View style={styles.roverHeader}>
            <View>
              <Text style={styles.roverEyebrow}>ROVER MISSIYASI</Text>
              <Text style={styles.roverName}>
                {offlineObservations.mars.rover}
              </Text>
            </View>
            <Ionicons name="radio" size={22} color="#EF4444" />
          </View>
          <Text style={styles.roverStatus}>
            {offlineObservations.mars.roverStatus} · Sol{" "}
            {offlineObservations.mars.sol}
          </Text>
          <View style={styles.roverMetrics}>
            <Text style={styles.roverMetric}>
              Harorat {offlineObservations.mars.temperature}
            </Text>
            <Text style={styles.roverMetric}>
              Bosim {offlineObservations.mars.pressure}
            </Text>
            <Text style={styles.roverMetric}>
              Shamol {offlineObservations.mars.wind}
            </Text>
            <Text style={styles.roverMetric}>
              Chang {offlineObservations.mars.dustOpacity}
            </Text>
          </View>
          <Text style={styles.roverNote}>
            {offlineObservations.mars.source} · real vaqt telemetriyasi emas
          </Text>
        </View>

        <View style={styles.statsGrid}>
          {mars.stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Marsga oid yangilik</Text>
          <Text style={styles.highlightText}>{mars.fact}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 54, paddingBottom: 30 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  eyebrow: {
    color: "#ffd9bc",
    fontSize: 11,
    letterSpacing: 1.3,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: { color: "#f5f7ff", fontSize: 30, fontWeight: "800" },
  compareButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
  },
  compareText: { color: "#ffffff", fontWeight: "700" },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    minHeight: 220,
    shadowColor: "#ffb38b",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emoji: { fontSize: 42 },
  badge: {
    color: "#fffaf5",
    opacity: 0.9,
    marginTop: 18,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  name: { color: "#fff", fontSize: 34, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#fff3ec", marginTop: 8, fontSize: 15 },
  liveRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  liveChip: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 10,
  },
  liveKey: { color: "#ffece0", fontSize: 11, textTransform: "uppercase" },
  liveValue: { color: "#fff", fontSize: 15, fontWeight: "700", marginTop: 4 },
  description: {
    color: "#fff0ea",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 18,
  },
  roverCard: {
    backgroundColor: "rgba(45,55,72,0.6)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
    padding: 16,
    marginTop: 16,
  },
  roverHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roverEyebrow: { color: "#9CA3AF", fontSize: 10, letterSpacing: 1 },
  roverName: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 4,
  },
  roverStatus: { color: "#D1D5DB", fontSize: 12, marginTop: 8 },
  roverMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    marginTop: 12,
    paddingTop: 8,
  },
  roverMetric: {
    color: "#D1D5DB",
    fontSize: 12,
    width: "50%",
    paddingVertical: 6,
  },
  roverNote: { color: "#9CA3AF", fontSize: 10, marginTop: 8 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 20 },
  statCard: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 16,
    padding: 14,
    marginRight: "2%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  statIcon: { color: "#ffe6d7", fontSize: 18 },
  statLabel: { color: "#ffe0d2", fontSize: 12, marginTop: 8 },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 },
  highlightBox: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 16,
  },
  highlightTitle: {
    color: "#fffaf7",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  highlightText: { color: "#ffe8df", lineHeight: 22 },
});
