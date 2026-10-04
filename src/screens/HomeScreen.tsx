import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BrandMark } from "../components/BrandMark";

import {
  getBodyById,
  getMoonPhase,
  offlineObservations,
  spaceBodies,
} from "../data/mockData";
import { OrbitalMap } from "../components/OrbitalMap";
import { PlanetSwiper } from "../components/PlanetSwiper";

export function HomeScreen({ navigation }: any) {
  const earth = getBodyById("earth");
  const planets = spaceBodies.filter((body) => body.id !== "moon");
  const [now, setNow] = useState(new Date());

  useFocusEffect(
    useCallback(() => {
      const timer = setInterval(() => setNow(new Date()), 1000);
      return () => clearInterval(timer);
    }, []),
  );

  const moonPhase = getMoonPhase(now);

  return (
    <LinearGradient
      colors={["#F7F9FC", "#EEF3F8", "#E9EFF6"]}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topBar}>
          <View style={styles.brandTitleRow}>
            <BrandMark size={36} />
            <View style={styles.brandTitleText}>
              <Text numberOfLines={1} style={styles.eyebrow}>
                ASTRO HUB · QUYOSH TIZIMI
              </Text>
              <Text numberOfLines={1} style={styles.title}>
                Olam xaritasi
              </Text>
            </View>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Qiyoslash"
            onPress={() => navigation.navigate("Compare")}
            style={styles.compareButton}
          >
            <Ionicons name="git-compare-outline" size={19} color="#344054" />
          </TouchableOpacity>
        </View>

        <View style={styles.systemCard}>
          <View style={styles.systemIntro}>
            <View style={styles.sunOrb}>
              <Text style={styles.sunEmoji}>☀️</Text>
            </View>
            <View style={styles.systemCopy}>
              <Text style={styles.systemEyebrow}>8 SAYYORA · 1 YULDUZ</Text>
              <Text style={styles.systemTitle}>Quyosh tizimi</Text>
              <Text style={styles.systemTime}>
                Mahalliy vaqt · {now.toLocaleTimeString()}
              </Text>
            </View>
          </View>
          <Text style={styles.systemDescription}>
            Orbital xaritadan jismni tanlang yoki sayyoralarni surib ko‘ring.
          </Text>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Sayyoralarni tanlang</Text>
          <Text style={styles.sectionMeta}>8 SAYYORA</Text>
        </View>

        <PlanetSwiper
          planets={planets}
          onSelect={(bodyId) => navigation.navigate("Detail", { bodyId })}
        />

        <View style={styles.mapCard}>
          <View style={styles.mapHeader}>
            <Text style={styles.mapTitle}>Orbital xarita</Text>
            <Text style={styles.sectionMeta}>1 SEC</Text>
          </View>
          <Text style={styles.mapSubtitle}>Sakkiz sayyora • orbital model</Text>
          <OrbitalMap
            date={now}
            onSelect={(bodyId) => navigation.navigate("Detail", { bodyId })}
          />
          <View style={styles.mapReadout}>
            <Text style={styles.mapReadoutText}>OY 384,400 km</Text>
            <Text style={styles.mapReadoutText}>MARS ~392 mln km*</Text>
            <Text style={styles.mapReadoutText}>
              OY FAZASI {moonPhase.illumination}%
            </Text>
          </View>
          <Text style={styles.offlineNote}>
            * Masofa namunaviy; orbita sanadan hisoblanadi va chizma masshtabli
            emas.
          </Text>
        </View>

        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <View>
              <Text style={styles.locationName}>
                {offlineObservations.earth.location}
              </Text>
              <Text style={styles.coordinates}>
                {offlineObservations.earth.latitude} ·{" "}
                {offlineObservations.earth.longitude}
              </Text>
            </View>
            <Ionicons name="location" size={20} color="#06B6D4" />
          </View>
          <View style={styles.weatherGrid}>
            <View style={styles.weatherMetric}>
              <Text style={styles.weatherValue}>
                {offlineObservations.earth.temperature}
              </Text>
              <Text style={styles.weatherLabel}>Harorat</Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={styles.weatherValue}>
                {offlineObservations.earth.humidity}
              </Text>
              <Text style={styles.weatherLabel}>Namlik</Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={styles.weatherValue}>
                {offlineObservations.earth.pressure}
              </Text>
              <Text style={styles.weatherLabel}>Bosim</Text>
            </View>
            <View style={styles.weatherMetric}>
              <Text style={styles.weatherValue}>
                {offlineObservations.earth.wind}
              </Text>
              <Text style={styles.weatherLabel}>Shamol</Text>
            </View>
          </View>
          <Text style={styles.offlineNote}>
            {offlineObservations.earth.source} · real ob-havo emas
          </Text>
        </View>

        <View style={styles.listCard}>
          <Text style={styles.listTitle}>Key facts</Text>
          {earth.highlights.map((item) => (
            <View key={item} style={styles.factRow}>
              <Ionicons name="sparkles" size={14} color="#9ae6ff" />
              <Text style={styles.factText}>{item}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#0F1419" },
  content: { paddingHorizontal: 18, paddingTop: 52, paddingBottom: 36 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  brandTitleRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  brandTitleText: { marginLeft: 10, flex: 1, minWidth: 0, marginRight: 6 },
  eyebrow: {
    color: "#2563EB",
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: { color: "#172437", fontSize: 28, fontWeight: "800", flexShrink: 1 },
  compareButton: {
    backgroundColor: "#FFFFFF",
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DCE4EE",
  },
  compareText: { color: "#344054", fontWeight: "700" },
  systemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DFE6EE",
    padding: 16,
    marginBottom: 16,
  },
  systemIntro: { flexDirection: "row", alignItems: "center" },
  sunOrb: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFF5D8",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  sunEmoji: { fontSize: 32 },
  systemCopy: { flex: 1 },
  systemEyebrow: {
    color: "#B77900",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  systemTitle: {
    color: "#172437",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
  systemTime: { color: "#667085", fontSize: 11, marginTop: 4 },
  systemDescription: {
    color: "#667085",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 13,
  },
  heroCard: {
    borderRadius: 28,
    padding: 18,
    minHeight: 390,
    shadowColor: "#5dc1ff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  liveLabel: {
    color: "#dff6ff",
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  orbitWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  orbitRing: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  planetCore: {
    width: 118,
    height: 118,
    borderRadius: 59,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#fff",
    shadowOpacity: 0.35,
    shadowRadius: 18,
  },
  planetEmoji: { fontSize: 54 },
  orbitDot: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  heroBadge: {
    color: "#f2fcff",
    opacity: 0.9,
    fontSize: 11,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginTop: 18,
  },
  heroTitle: { color: "#fff", fontSize: 34, fontWeight: "800", marginTop: 8 },
  heroSubtitle: { color: "#edf7ff", marginTop: 8, fontSize: 15 },
  liveGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 18 },
  liveItem: {
    width: "48%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: "2%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  liveKey: {
    color: "#d9ebff",
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  liveValue: { color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 6 },
  locationCard: {
    marginTop: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DFE6EE",
    shadowColor: "#344054",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 2,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationName: { color: "#172437", fontSize: 16, fontWeight: "700" },
  coordinates: { color: "#778396", fontSize: 12, marginTop: 4 },
  weatherGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 14 },
  weatherMetric: { width: "50%", paddingVertical: 8 },
  weatherValue: { color: "#25364B", fontSize: 16, fontWeight: "700" },
  weatherLabel: { color: "#778396", fontSize: 11, marginTop: 3 },
  offlineNote: {
    color: "#778396",
    fontSize: 10,
    marginTop: 10,
    lineHeight: 14,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: { color: "#172437", fontSize: 18, fontWeight: "800" },
  sectionMeta: {
    color: "#2563EB",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  carousel: { paddingRight: 12, paddingBottom: 6 },
  carouselCard: { width: 200, marginRight: 12 },
  carouselGradient: { borderRadius: 20, padding: 16, minHeight: 160 },
  carouselEmoji: { fontSize: 32 },
  carouselName: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 12,
  },
  carouselSubtitle: { color: "#edf5ff", fontSize: 13, marginTop: 4 },
  mapCard: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#DFE6EE",
  },
  mapHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mapTitle: {
    color: "#172437",
    fontSize: 18,
    fontWeight: "800",
  },
  mapSubtitle: {
    color: "#778396",
    fontSize: 12,
    marginTop: 4,
    marginBottom: 6,
  },
  mapReadout: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E8EDF3",
    paddingTop: 10,
  },
  mapReadoutText: { color: "#475467", fontSize: 10, fontWeight: "700" },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DFE6EE",
    padding: 16,
    marginTop: 18,
  },
  listTitle: {
    color: "#172437",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  factRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  factText: { color: "#475467", fontSize: 15, marginLeft: 10 },
});
