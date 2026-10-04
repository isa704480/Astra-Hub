import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  CelestialType,
  getBodyById,
  planetProfiles,
  spaceBodies,
} from "../data/mockData";
import { useSpaceStore } from "../store/useSpaceStore";

export function WeightScreen() {
  const [selectedId, setSelectedId] = useState<CelestialType>("mars");
  const { earthWeightKg, setEarthWeightKg } = useSpaceStore();
  const body = getBodyById(selectedId);
  const profile = planetProfiles[selectedId];
  const parsedMass = Number(earthWeightKg.replace(",", "."));
  const isValid =
    earthWeightKg.trim() !== "" &&
    Number.isFinite(parsedMass) &&
    parsedMass >= 0;
  const scaleReading = isValid
    ? (parsedMass * profile.gravityMps2) / 9.80665
    : 0;
  const force = isValid ? parsedMass * profile.gravityMps2 : 0;
  const comparisons = useMemo(
    () =>
      spaceBodies.map((item) => ({
        body: item,
        reading: (parsedMass * planetProfiles[item.type].gravityMps2) / 9.80665,
      })),
    [parsedMass],
  );

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.eyebrow}>GRAVITATSIYA TAQQOSLASHI</Text>
        <Text style={styles.title}>Vazningiz</Text>
        <Text style={styles.subtitle}>
          Bitta Yer vazni · barcha sayyoralarda hisob
        </Text>

        <View style={styles.inputCard}>
          <Text style={styles.label}>Yerdagi vazningiz</Text>
          <View style={styles.inputRow}>
            <TextInput
              accessibilityLabel="Yerdagi vazningiz kilogrammda"
              keyboardType="decimal-pad"
              maxLength={7}
              onChangeText={setEarthWeightKg}
              placeholder="70"
              placeholderTextColor="#98A2B3"
              style={styles.input}
              value={earthWeightKg}
            />
            <Text style={styles.unit}>kg</Text>
          </View>
          <Text style={styles.helper}>
            Massa o‘zgarmaydi; kg ko‘rsatkichi sayyora gravitatsiyasiga qarab
            o‘zgaradi.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Sayyorani tanlang</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.planetPicker}
        >
          {spaceBodies.map((item) => (
            <TouchableOpacity
              key={item.id}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedId === item.id }}
              onPress={() => setSelectedId(item.type)}
              style={[
                styles.planetChip,
                selectedId === item.id && styles.selectedChip,
              ]}
            >
              <Text style={styles.chipEmoji}>{item.emoji}</Text>
              <Text
                style={[
                  styles.chipName,
                  selectedId === item.id && styles.selectedChipName,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.resultCard}>
          <Text style={styles.resultEyebrow}>
            {body.name.toLocaleUpperCase("uz-UZ")} · {profile.gravityMps2} m/s²
          </Text>
          <View style={styles.results}>
            <View style={styles.resultBlock}>
              <Text style={styles.resultLabel}>Tarozi ko‘rsatkichi</Text>
              <Text style={styles.resultValue}>
                {isValid ? `${scaleReading.toFixed(1)} kg` : "—"}
              </Text>
            </View>
            <View style={styles.resultBlock}>
              <Text style={styles.resultLabel}>Tortishish kuchi</Text>
              <Text style={styles.resultValue}>
                {isValid ? `${force.toFixed(1)} N` : "—"}
              </Text>
            </View>
          </View>
          <Text style={styles.massNote}>
            Sizning massangiz: {isValid ? `${parsedMass.toFixed(1)} kg` : "—"}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Barcha jismlarda taqqoslash</Text>
        {comparisons.map(({ body: item, reading }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedId(item.type)}
            style={styles.compareRow}
          >
            <Text style={styles.rowEmoji}>{item.emoji}</Text>
            <Text style={styles.rowName}>{item.name}</Text>
            <Text style={styles.rowGravity}>
              {planetProfiles[item.type].gravityMps2} m/s²
            </Text>
            <Text style={styles.rowWeight}>
              {isValid ? `${reading.toFixed(1)} kg` : "—"}
            </Text>
          </TouchableOpacity>
        ))}
        <Text style={styles.note}>
          Hisob: Yer vazni × sayyora gravitatsiyasi ÷ 9.80665. Ma’lumotlar
          o‘quv/reference qiymatlaridir.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F4F7FB" },
  content: { paddingHorizontal: 18, paddingTop: 28, paddingBottom: 30 },
  eyebrow: {
    color: "#0891B2",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
  title: { color: "#172437", fontSize: 28, fontWeight: "800", marginTop: 5 },
  subtitle: { color: "#6B7788", fontSize: 13, marginTop: 5, marginBottom: 16 },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E7EF",
    padding: 16,
  },
  label: { color: "#667085", fontSize: 12, fontWeight: "700" },
  inputRow: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  input: {
    color: "#172437",
    fontSize: 34,
    fontWeight: "800",
    minWidth: 120,
    paddingVertical: 4,
  },
  unit: { color: "#667085", fontSize: 16, fontWeight: "700", marginLeft: 6 },
  helper: { color: "#667085", fontSize: 11, lineHeight: 16, marginTop: 7 },
  sectionTitle: {
    color: "#172437",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  planetPicker: { paddingRight: 10 },
  planetChip: {
    minWidth: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E1E7EF",
  },
  selectedChip: { backgroundColor: "#EAF3FF", borderColor: "#3B82F6" },
  chipEmoji: { fontSize: 22 },
  chipName: { color: "#667085", fontSize: 10, fontWeight: "700", marginTop: 3 },
  selectedChipName: { color: "#1D4ED8" },
  resultCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#C9D9F0",
    padding: 16,
    marginTop: 16,
  },
  resultEyebrow: {
    color: "#2563EB",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  results: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  resultBlock: { flex: 1 },
  resultLabel: { color: "#667085", fontSize: 11 },
  resultValue: {
    color: "#172437",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 4,
  },
  massNote: {
    color: "#667085",
    borderTopWidth: 1,
    borderTopColor: "#E8EDF3",
    marginTop: 14,
    paddingTop: 10,
    fontSize: 12,
  },
  compareRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF3",
    paddingHorizontal: 12,
  },
  rowEmoji: { fontSize: 18, width: 30 },
  rowName: { flex: 1, color: "#344054", fontSize: 12, fontWeight: "700" },
  rowGravity: { width: 64, textAlign: "right", color: "#667085", fontSize: 10 },
  rowWeight: {
    width: 64,
    textAlign: "right",
    color: "#172437",
    fontSize: 12,
    fontWeight: "800",
  },
  note: { color: "#7A8494", fontSize: 10, lineHeight: 15, marginTop: 12 },
});
