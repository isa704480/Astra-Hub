import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import { planetProfiles, spaceBodies } from "../data/mockData";
import { PlanetChart } from "../components/PlanetChart";
import { PlanetChartMetric } from "../components/PlanetWidgets";
import { PlanetGlyph } from "../components/PlanetGlyph";
import { useSpaceStore } from "../store/useSpaceStore";

export function ComparisonScreen({ navigation }: any) {
  const [metric, setMetric] = React.useState<PlanetChartMetric>("gravity");
  const earthWeightKg = useSpaceStore((state) => state.earthWeightKg);
  const parsedWeight = Number(earthWeightKg.replace(",", "."));
  const hasWeight =
    earthWeightKg.trim() !== "" &&
    Number.isFinite(parsedWeight) &&
    parsedWeight >= 0;

  return (
    <LinearGradient
      colors={["#F7F9FC", "#EEF3F8", "#E9EFF6"]}
      style={styles.screen}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Taqqoslash</Text>
        <Text style={styles.subtitle}>
          {hasWeight
            ? `${parsedWeight.toFixed(1)} kg Yer vazni uchun tarozi ko‘rsatkichi.`
            : "Vazn bo‘limida qiymat kiriting."}
        </Text>

        <View style={styles.chartCard}>
          <View style={styles.chartHeading}>
            <Text style={styles.chartTitle}>Sayyoralar grafigi</Text>
            <View style={styles.metricPicker}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: metric === "gravity" }}
                onPress={() => setMetric("gravity")}
                style={[
                  styles.metricButton,
                  metric === "gravity" && styles.metricButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.metricText,
                    metric === "gravity" && styles.metricTextActive,
                  ]}
                >
                  Gravitatsiya
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ selected: metric === "temperature" }}
                onPress={() => setMetric("temperature")}
                style={[
                  styles.metricButton,
                  metric === "temperature" && styles.metricButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.metricText,
                    metric === "temperature" && styles.metricTextActive,
                  ]}
                >
                  Harorat
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <PlanetChart metric={metric} />
          <Text style={styles.chartNote}>
            O‘rtacha ma’lumotlar · offline reference model
          </Text>
        </View>

        {spaceBodies.map((body) => (
          <View key={body.id} style={styles.card}>
            <LinearGradient colors={body.gradient} style={styles.cardGradient}>
              <View style={styles.cardHeading}>
                <PlanetGlyph bodyId={body.type} size={52} />
                <View style={styles.cardHeadingCopy}>
                  <Text style={styles.name}>{body.name}</Text>
                  <Text style={styles.subtitleInline}>{body.subtitle}</Text>
                </View>
              </View>
            </LinearGradient>

            {body.stats.map((stat) => (
              <View key={stat.label} style={styles.statRow}>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={styles.statValue}>{stat.value}</Text>
              </View>
            ))}
            <View style={styles.weightRow}>
              <Text style={styles.statLabel}>Tarozi ko‘rsatkichi</Text>
              <Text style={styles.weightValue}>
                {hasWeight
                  ? `${((parsedWeight * planetProfiles[body.type].gravityMps2) / 9.80665).toFixed(1)} kg`
                  : "—"}
              </Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`${body.name} 3D xona va signalini ochish`}
              onPress={() =>
                navigation.navigate("PlanetRoom", { bodyId: body.id })
              }
              style={styles.roomLink}
            >
              <Ionicons name="cube-outline" size={16} color="#1D4ED8" />
              <Text style={styles.roomLinkText}>3D xona va signal</Text>
              <Ionicons name="chevron-forward" size={15} color="#1D4ED8" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { paddingHorizontal: 18, paddingTop: 58, paddingBottom: 30 },
  title: { color: "#172437", fontSize: 28, fontWeight: "800" },
  subtitle: { color: "#667085", marginTop: 8, marginBottom: 18 },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E7EF",
    padding: 14,
    marginBottom: 18,
  },
  chartHeading: { marginBottom: 8 },
  chartTitle: {
    color: "#172437",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },
  metricPicker: {
    flexDirection: "row",
    backgroundColor: "#F1F4F8",
    borderRadius: 10,
    padding: 3,
    alignSelf: "flex-start",
  },
  metricButton: { borderRadius: 8, paddingHorizontal: 11, paddingVertical: 7 },
  metricButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#344054",
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
  metricText: { color: "#667085", fontSize: 11, fontWeight: "700" },
  metricTextActive: { color: "#1D4ED8" },
  chartNote: { color: "#7A8494", fontSize: 10, marginTop: 5 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E1E7EF",
  },
  cardGradient: { padding: 18 },
  cardHeading: { flexDirection: "row", alignItems: "center" },
  cardHeadingCopy: { flex: 1, marginLeft: 12 },
  name: { color: "#fff", fontSize: 21, fontWeight: "700" },
  subtitleInline: { color: "#eef7ff", marginTop: 4, fontSize: 12 },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF3",
  },
  statLabel: { color: "#667085", fontSize: 13 },
  statValue: { color: "#344054", fontSize: 13, fontWeight: "700" },
  weightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 11,
    paddingHorizontal: 18,
    backgroundColor: "#F0F6FF",
  },
  weightValue: { color: "#1D4ED8", fontSize: 13, fontWeight: "800" },
  roomLink: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    backgroundColor: "#F0F6FF",
  },
  roomLinkText: {
    flex: 1,
    color: "#1D4ED8",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 8,
  },
});
