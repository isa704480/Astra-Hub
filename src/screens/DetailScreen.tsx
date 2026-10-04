import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import {
  getBodyById,
  makeLiveSnapshot,
  planetProfiles,
} from "../data/mockData";
import { PlanetSurfaceMap } from "../components/PlanetSurfaceMap";
import { SonificationPlayer } from "../components/SonificationPlayer";
import { useSpaceStore } from "../store/useSpaceStore";

export function DetailScreen({ route, navigation }: any) {
  const { bodyId } = route.params ?? { bodyId: "earth" };
  const body = getBodyById(bodyId);
  const profile = planetProfiles[body.type];
  const { earthWeightKg, setEarthWeightKg, toggleFavorite, isFavorite } =
    useSpaceStore();
  const [tick, setTick] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const live = useMemo(() => makeLiveSnapshot(body.id), [body.id, tick]);
  const inputWeight = Number(earthWeightKg.replace(",", "."));
  const hasValidWeight =
    earthWeightKg.trim() !== "" &&
    Number.isFinite(inputWeight) &&
    inputWeight >= 0;
  const localScaleReading = hasValidWeight
    ? (inputWeight * profile.gravityMps2) / 9.80665
    : 0;
  const weightForce = hasValidWeight ? inputWeight * profile.gravityMps2 : 0;

  return (
    <LinearGradient
      colors={["#F7F9FC", "#EEF3F8", "#E9EFF6"]}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={20} color="#344054" />
          <Text style={styles.backText}>Orqaga</Text>
        </TouchableOpacity>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`${body.name} 3D xona va signalini ochish`}
          onPress={() => navigation.navigate("PlanetRoom", { bodyId: body.id })}
          style={styles.roomButton}
        >
          <Ionicons name="cube-outline" size={17} color="#1D4ED8" />
          <Text style={styles.roomButtonText}>3D xona va signal</Text>
          <Ionicons name="chevron-forward" size={16} color="#1D4ED8" />
        </TouchableOpacity>

        <LinearGradient colors={body.gradient} style={styles.heroCard}>
          <View style={styles.headerRow}>
            <Text style={styles.emoji}>{body.emoji}</Text>
            <TouchableOpacity
              onPress={() => toggleFavorite(body.id)}
              hitSlop={12}
            >
              <Ionicons
                name={isFavorite(body.id) ? "heart" : "heart-outline"}
                size={22}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.badge}>{body.badge}</Text>
          <Text style={styles.name}>{body.name}</Text>
          <Text style={styles.subtitle}>{body.subtitle}</Text>

          <View style={styles.liveRow}>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>Mahalliy vaqt</Text>
              <Text style={styles.liveValue}>{live.time}</Text>
            </View>
            <View style={styles.liveChip}>
              <Text style={styles.liveKey}>Model harorati</Text>
              <Text style={styles.liveValue}>{live.temperature}</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={{ marginTop: 18 }}>
          <SonificationPlayer
            bodyId={body.type}
            bodyName={body.name}
            darkTheme={false}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>To‘liq sirt xaritasi</Text>
          <PlanetSurfaceMap bodyId={body.type} />
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Tavsif</Text>
          <Text style={styles.description}>{body.description}</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Sayyora ko‘rsatkichlari</Text>
          <View style={styles.statsGrid}>
            {body.stats.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <Text style={styles.statIcon}>{stat.icon}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Atmosfera, muz va vaqt</Text>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Atmosfera</Text>
            <Text style={styles.profileValue}>{profile.atmosphere}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Muz</Text>
            <Text style={styles.profileValue}>{profile.ice}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Sirt / bulut qatlami</Text>
            <Text style={styles.profileValue}>{profile.surface}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Bosim</Text>
            <Text style={styles.profileValue}>{profile.pressure}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.profileLabel}>Kun / yil</Text>
            <Text style={styles.profileValue}>
              {profile.dayLength} / {profile.yearLength}
            </Text>
          </View>
          <Text style={styles.modelNote}>
            Harorat — shu sayyora o‘rtacha qiymati atrofidagi offline model;
            telemetriya emas.
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Vazn kalkulyatori</Text>
          <Text style={styles.description}>
            Yerdagi vazningizni kiriting. Massa o‘zgarmaydi; boshqa sayyoradagi
            tarozi ko‘rsatkichi gravitatsiyaga qarab hisoblanadi.
          </Text>
          <View style={styles.weightInputRow}>
            <TextInput
              accessibilityLabel="Yerdagi vazningiz kilogrammda"
              keyboardType="decimal-pad"
              maxLength={7}
              onChangeText={setEarthWeightKg}
              placeholder="Masalan, 70"
              placeholderTextColor="#7F8A9A"
              style={styles.weightInput}
              value={earthWeightKg}
            />
            <Text style={styles.weightUnit}>kg Yerda</Text>
          </View>
          {hasValidWeight ? (
            <View style={styles.weightResult}>
              <View>
                <Text style={styles.profileLabel}>Bu sayyoradagi tarozi</Text>
                <Text style={styles.weightValue}>
                  {localScaleReading.toFixed(1)} kg
                </Text>
              </View>
              <View>
                <Text style={styles.profileLabel}>Tortishish kuchi</Text>
                <Text style={styles.weightValue}>
                  {weightForce.toFixed(1)} N
                </Text>
              </View>
            </View>
          ) : (
            <Text style={styles.modelNote}>
              Noldan katta yoki teng son kiriting.
            </Text>
          )}
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Muhim jihatlar</Text>
          {body.highlights.map((item) => (
            <View key={item} style={styles.highlightItem}>
              <Ionicons name="sparkles" size={14} color="#8ec5ff" />
              <Text style={styles.highlightText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.block}>
          <Text style={styles.sectionTitle}>Fakt</Text>
          <Text style={styles.factText}>{body.fact}</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 54, paddingBottom: 36 },
  backButton: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  backText: { color: "#344054", fontSize: 16, marginLeft: 8 },
  roomButton: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 14,
    borderRadius: 11,
    backgroundColor: "#EFF5FF",
  },
  roomButtonText: {
    flex: 1,
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 8,
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    minHeight: 230,
    shadowColor: "#6fc3ff",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emoji: { fontSize: 44 },
  badge: {
    color: "#edf5ff",
    opacity: 0.9,
    marginTop: 16,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  name: { color: "#fff", fontSize: 34, fontWeight: "800", marginTop: 8 },
  subtitle: { color: "#eaf3ff", fontSize: 15, marginTop: 6 },
  liveRow: { flexDirection: "row", marginTop: 18 },
  liveChip: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 14,
    padding: 10,
    marginRight: 8,
  },
  liveKey: { color: "#dfe9ff", fontSize: 11, textTransform: "uppercase" },
  liveValue: { color: "#fff", fontSize: 15, fontWeight: "700", marginTop: 4 },
  block: {
    marginTop: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#E1E7EF",
  },
  sectionTitle: {
    color: "#172437",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: { color: "#475467", fontSize: 15, lineHeight: 23 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap" },
  statCard: {
    width: "48%",
    backgroundColor: "#F4F7FB",
    borderRadius: 16,
    padding: 14,
    marginRight: "2%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E4E9F0",
  },
  statIcon: { color: "#2563EB", fontSize: 18 },
  statLabel: { color: "#667085", fontSize: 12, marginTop: 8 },
  statValue: {
    color: "#172437",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 4,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  highlightText: { color: "#475467", fontSize: 15, marginLeft: 10 },
  factText: { color: "#475467", fontSize: 15, lineHeight: 24 },
  profileRow: {
    borderTopWidth: 1,
    borderTopColor: "#E8EDF3",
    paddingVertical: 10,
  },
  profileLabel: { color: "#778396", fontSize: 11, textTransform: "uppercase" },
  profileValue: {
    color: "#344054",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  modelNote: { color: "#778396", fontSize: 11, lineHeight: 16, marginTop: 10 },
  weightInputRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  weightInput: {
    flex: 1,
    color: "#172437",
    backgroundColor: "#F8FAFC",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B7C8DF",
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 18,
  },
  weightUnit: { color: "#667085", fontSize: 13, marginLeft: 12 },
  weightResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    padding: 14,
    backgroundColor: "#EEF5FF",
    borderRadius: 12,
  },
  weightValue: {
    color: "#172437",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
  },
});
