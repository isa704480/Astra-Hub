import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PlanetGlyph } from "../components/PlanetGlyph";
import { PlanetRoomScene } from "../components/PlanetRoomScene";
import { SonificationPlayer } from "../components/SonificationPlayer";
import {
  CelestialType,
  getBodyById,
  planetProfiles,
  spaceBodies,
} from "../data/mockData";

export function PlanetRoomScreen({ route, navigation }: any) {
  const requestedId = route.params?.bodyId as string | undefined;
  const initialId =
    spaceBodies.find((body) => body.id === requestedId)?.type ?? "earth";
  const [bodyId, setBodyId] = useState<CelestialType>(initialId);
  const [rotation, setRotation] = useState(0);
  const body = getBodyById(bodyId);
  const profile = planetProfiles[bodyId];

  const selectBody = (id: CelestialType) => {
    setBodyId(id);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Orqaga"
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back" size={20} color="#EAF2FC" />
        </TouchableOpacity>
        <View style={styles.heading}>
          <Text style={styles.eyebrow}>ASTRO HUB · 3D ROOM</Text>
          <Text numberOfLines={1} style={styles.title}>
            {body.name}
          </Text>
        </View>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Sayyorani chapga burish"
          onPress={() => setRotation((value) => value - 0.55)}
          style={styles.iconButton}
        >
          <Ionicons name="sync-outline" size={19} color="#EAF2FC" />
        </TouchableOpacity>
      </View>

      <View style={styles.sceneFrame}>
        <PlanetRoomScene bodyId={bodyId} rotation={rotation} />
        <View pointerEvents="none" style={styles.sceneLabel}>
          <Text style={styles.sceneLabelName}>
            {body.emoji} {body.name}
          </Text>
          <Text style={styles.sceneLabelType}>{body.badge.toUpperCase()}</Text>
        </View>
        <View style={styles.rotationControls}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Chapga burish"
            onPress={() => setRotation((value) => value - 0.6)}
            style={styles.rotationButton}
          >
            <Ionicons name="arrow-back-outline" size={19} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="O‘ngga burish"
            onPress={() => setRotation((value) => value + 0.6)}
            style={styles.rotationButton}
          >
            <Ionicons name="arrow-forward-outline" size={19} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.selector}
      >
        {spaceBodies.map((item) => (
          <TouchableOpacity
            key={item.id}
            accessibilityRole="button"
            accessibilityState={{ selected: item.id === bodyId }}
            onPress={() => selectBody(item.type)}
            style={[
              styles.planetChip,
              item.id === bodyId && styles.planetChipActive,
            ]}
          >
            <PlanetGlyph bodyId={item.type} size={38} />
            <Text
              style={[
                styles.planetChipName,
                item.id === bodyId && styles.planetChipNameActive,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.infoPanel}>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>MODEL HARORATI</Text>
            <Text style={styles.metricValue}>{profile.meanTemperatureC}°C</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>GRAVITATSIYA</Text>
            <Text style={styles.metricValue}>{profile.gravityMps2} m/s²</Text>
          </View>
        </View>

        <SonificationPlayer bodyId={bodyId} bodyName={body.name} darkTheme={true} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#06111E", paddingBottom: 18 },
  header: {
    height: 68,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heading: { flex: 1, marginHorizontal: 10 },
  eyebrow: {
    color: "#76C9D5",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
  },
  title: { color: "#F3F7FC", fontSize: 19, fontWeight: "800", marginTop: 2 },
  sceneFrame: {
    height: 300,
    marginHorizontal: 14,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(120,174,221,0.23)",
  },
  sceneLabel: { position: "absolute", top: 14, left: 14 },
  sceneLabelName: { color: "#F3F7FC", fontSize: 15, fontWeight: "800" },
  sceneLabelType: {
    color: "#8CA0B7",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 3,
  },
  rotationControls: {
    position: "absolute",
    right: 12,
    bottom: 12,
    flexDirection: "row",
  },
  rotationButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(3,13,24,0.72)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  selector: { paddingHorizontal: 14, paddingVertical: 12 },
  planetChip: {
    width: 66,
    minHeight: 68,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  planetChipActive: {
    borderColor: "#4D9FF5",
    backgroundColor: "rgba(51,119,193,0.18)",
  },
  planetChipName: {
    color: "#98A9BD",
    fontSize: 9,
    fontWeight: "700",
    marginTop: 3,
  },
  planetChipNameActive: { color: "#FFFFFF" },
  infoPanel: {
    marginHorizontal: 14,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "#0D1C2D",
  },
  metricsRow: { flexDirection: "row", alignItems: "center" },
  metric: { flex: 1 },
  metricLabel: {
    color: "#8396AD",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  metricValue: {
    color: "#F3F7FC",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 4,
  },
  audioButton: {
    minHeight: 42,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 11,
    backgroundColor: "#1D73C9",
  },
  audioButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
    marginLeft: 6,
  },
  atmosphere: { color: "#C2CFDE", fontSize: 11, lineHeight: 16, marginTop: 12 },
  audioNote: { color: "#8294A9", fontSize: 9, lineHeight: 13, marginTop: 8 },
});
