import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { planetProfiles, spaceBodies } from "../data/mockData";
import { PlanetSwiper } from "../components/PlanetSwiper";

export function PlanetsScreen({ navigation }: any) {
  const planets = spaceBodies.filter((body) => body.id !== "moon");
  const [activeId, setActiveId] = useState("mercury");
  const activePlanet =
    planets.find((body) => body.id === activeId) ?? planets[0];
  const profile = planetProfiles[activePlanet.type];
  const profileOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    profileOpacity.setValue(0.55);
    Animated.timing(profileOpacity, {
      toValue: 1,
      duration: 260,
      useNativeDriver: true,
    }).start();
  }, [activeId, profileOpacity]);

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>QUYOSH TIZIMI</Text>
        <Text style={styles.title}>Sayyoralar</Text>
        <Text style={styles.subtitle}>
          8 sayyora · bosing va batafsil ko‘ring
        </Text>
        <PlanetSwiper
          planets={planets}
          onSelect={(bodyId) => navigation.navigate("Detail", { bodyId })}
          onActiveChange={setActiveId}
        />
        <Animated.View
          style={[styles.profilePanel, { opacity: profileOpacity }]}
        >
          <View style={styles.profileHeader}>
            <View style={styles.profileHeading}>
              <Text style={styles.profileEyebrow}>TANLANGAN SAYYORA</Text>
              <Text style={styles.profileName}>
                {activePlanet.emoji} {activePlanet.name}
              </Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              onPress={() =>
                navigation.navigate("Detail", { bodyId: activePlanet.id })
              }
              style={styles.detailButton}
            >
              <Text style={styles.detailButtonText}>Batafsil ›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.metricsRow}>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>GRAVITATSIYA</Text>
              <Text style={styles.metricValue}>{profile.gravityMps2} m/s²</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>HARORAT</Text>
              <Text style={styles.metricValue}>
                {profile.meanTemperatureC}°C
              </Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricLabel}>KUN</Text>
              <Text style={styles.metricValue}>{profile.dayLength}</Text>
            </View>
          </View>

          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Atmosfera</Text>
            <Text style={styles.factValue}>{profile.atmosphere}</Text>
          </View>
          <View style={styles.factRow}>
            <Text style={styles.factLabel}>Muz</Text>
            <Text style={styles.factValue}>{profile.ice}</Text>
          </View>
          <Text style={styles.note}>
            O‘rtacha/reference qiymatlar · offline model
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F4F7FB" },
  content: { paddingHorizontal: 18, paddingTop: 28, paddingBottom: 28 },
  eyebrow: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  title: { color: "#172437", fontSize: 28, fontWeight: "800", marginTop: 5 },
  subtitle: { color: "#6B7788", fontSize: 13, marginTop: 5, marginBottom: 18 },
  profilePanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E7EF",
    padding: 15,
    marginTop: 6,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileHeading: { flex: 1 },
  profileEyebrow: {
    color: "#778396",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.9,
  },
  profileName: {
    color: "#172437",
    fontSize: 19,
    fontWeight: "800",
    marginTop: 4,
  },
  detailButton: {
    backgroundColor: "#EFF5FF",
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  detailButtonText: { color: "#1D4ED8", fontSize: 11, fontWeight: "800" },
  metricsRow: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E8EDF3",
  },
  metric: { flex: 1, paddingRight: 6 },
  metricLabel: {
    color: "#778396",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  metricValue: {
    color: "#25364B",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
  },
  factRow: { paddingTop: 11 },
  factLabel: { color: "#778396", fontSize: 10, fontWeight: "700" },
  factValue: { color: "#475467", fontSize: 12, lineHeight: 17, marginTop: 3 },
  note: { color: "#98A2B3", fontSize: 9, marginTop: 12 },
});
