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

import { getBodyById, getMoonPhase, makeLiveSnapshot } from "../data/mockData";
import { useSpaceStore } from "../store/useSpaceStore";

export function MoonScreen({ navigation }: any) {
  const moon = getBodyById("moon");
  const { toggleFavorite, isFavorite } = useSpaceStore();
  const [tick, setTick] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const live = useMemo(() => makeLiveSnapshot("moon"), [tick]);
  const phase = useMemo(() => getMoonPhase(new Date()), [tick]);

  return (
    <LinearGradient
      colors={["#050d18", "#101b31", "#1b2a45"]}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Lunar phase telemetry</Text>
            <Text style={styles.title}>Oy</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Compare")}
            style={styles.compareButton}
          >
            <Text style={styles.compareText}>Taqqoslash</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient colors={moon.gradient} style={styles.heroCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.emoji}>{moon.emoji}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(moon.id)}
              hitSlop={12}
            >
              <Ionicons
                name={isFavorite(moon.id) ? "heart" : "heart-outline"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.badge}>{moon.badge}</Text>
          <Text style={styles.name}>{moon.name}</Text>
          <Text style={styles.subtitle}>{moon.subtitle}</Text>

          <View style={styles.liveRow}>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>LOCAL TIME</Text>
              <Text style={styles.liveValue}>{live.time}</Text>
            </View>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>Temp</Text>
              <Text style={styles.liveValue}>{live.temperature}</Text>
            </View>
          </View>
        </LinearGradient>

        <Text style={styles.description}>{moon.description}</Text>

        <View style={styles.phaseCard}>
          <View style={styles.phaseOrb}>
            <Text style={styles.phaseEmoji}>🌙</Text>
          </View>
          <View style={styles.phaseInfo}>
            <Text style={styles.phaseLabel}>HOZIRGI FAZA</Text>
            <Text style={styles.phaseName}>{phase.name}</Text>
            <Text style={styles.phaseDetail}>
              {phase.illumination}% yoritilgan · keyingi fazagacha{" "}
              {phase.daysToNextPhase} kun
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {moon.stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Oyga oid qiziqarli fikr</Text>
          <Text style={styles.highlightText}>{moon.fact}</Text>
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
    color: "#b7d8ff",
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
  compareText: { color: "#f5f7ff", fontWeight: "700" },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    minHeight: 220,
    shadowColor: "#c7d5ff",
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
    color: "#f6f8ff",
    opacity: 0.9,
    marginTop: 18,
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  name: { color: "#fff", fontSize: 34, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#edf4ff", marginTop: 8, fontSize: 15 },
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
  liveKey: { color: "#dfe9ff", fontSize: 11, textTransform: "uppercase" },
  liveValue: { color: "#fff", fontSize: 15, fontWeight: "700", marginTop: 4 },
  description: {
    color: "#eaf2ff",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 18,
  },
  phaseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(45,55,72,0.6)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(209,213,219,0.22)",
    padding: 16,
    marginTop: 16,
  },
  phaseOrb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "rgba(209,213,219,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  phaseEmoji: { fontSize: 30 },
  phaseInfo: { flex: 1 },
  phaseLabel: { color: "#9CA3AF", fontSize: 10, letterSpacing: 1 },
  phaseName: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    marginTop: 3,
  },
  phaseDetail: { color: "#D1D5DB", fontSize: 11, marginTop: 4 },
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
  statIcon: { color: "#dfe9ff", fontSize: 18 },
  statLabel: { color: "#cfe0ff", fontSize: 12, marginTop: 8 },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "700", marginTop: 4 },
  highlightBox: {
    marginTop: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    padding: 16,
  },
  highlightTitle: {
    color: "#f0f5ff",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  highlightText: { color: "#dfe9ff", lineHeight: 22 },
});
