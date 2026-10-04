import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CelestialType } from "../data/mockData";

interface SonificationCardProps {
  bodyId: CelestialType;
  bodyName: string;
  darkTheme?: boolean;
}

const sonificationNotes: Record<CelestialType, string> = {
  mercury: "Quyoshga eng yaqin elektromagnit to‘lqinlar chastotasi",
  venus: "Qalin atmosfera va quyosh shamollari o‘zaro ta’siri sado modeli",
  earth: "Magnitosfera va ionosfera radiotoplari chastotasi",
  moon: "Seysmik tebranishlar va krater zarbalari modelizatsiyasi",
  mars: "Perseverance roveri shamol va bosim sensorlari sado modeli",
  jupiter: "Ulkan radiatsiya va Buyuk Qizil Dog‘ bo‘ron to‘lqinlari",
  saturn: "Muz va tosh halqalardan tarqalayotgan plazma to‘lqinlari",
  uranus: "Noodatiy magnit maydon va metan qatlami tebranishlari",
  neptune: "Kuchli kosmik shamollar va uzoq radio-chastotalar",
};

export function SonificationPlayer({
  bodyId,
  bodyName,
  darkTheme = false,
}: SonificationCardProps) {
  const note = sonificationNotes[bodyId] ?? "Kosmik chastotalar modeli";

  return (
    <View style={[styles.container, darkTheme ? styles.containerDark : styles.containerLight]}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <View style={styles.badgeRow}>
            <Ionicons
              name="radio-outline"
              size={15}
              color={darkTheme ? "#60A5FA" : "#2563EB"}
            />
            <Text style={[styles.eyebrow, darkTheme ? styles.eyebrowDark : styles.eyebrowLight]}>
              KOSMIK SONIFIKATSIYA
            </Text>
          </View>
          <Text style={[styles.title, darkTheme ? styles.titleDark : styles.titleLight]}>
            {bodyName} chastota modeli
          </Text>
        </View>
      </View>

      <View style={styles.visualizerRow}>
        <View style={styles.waveBarContainer}>
          {[0.4, 0.8, 0.5, 0.9, 0.6, 0.3, 0.7, 0.5].map((scale, i) => (
            <View
              key={i}
              style={[
                styles.waveBar,
                darkTheme ? styles.waveBarDark : styles.waveBarLight,
                { height: 22 * scale },
              ]}
            />
          ))}
        </View>

        <Text style={[styles.statusText, darkTheme ? styles.statusDark : styles.statusLight]}>
          {note}
        </Text>
      </View>

      <Text style={[styles.footerNote, darkTheme ? styles.footerNoteDark : styles.footerNoteLight]}>
        NASA quyosh tizimi ma’lumotlari va to‘lqinlar chastota modeli
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    marginVertical: 4,
  },
  containerLight: {
    backgroundColor: "#F0F6FF",
    borderColor: "#D0E1FD",
  },
  containerDark: {
    backgroundColor: "#0D1C2D",
    borderColor: "rgba(255,255,255,0.12)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrap: { flex: 1 },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 4 },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginLeft: 6,
  },
  eyebrowLight: { color: "#2563EB" },
  eyebrowDark: { color: "#60A5FA" },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  titleLight: { color: "#1E293B" },
  titleDark: { color: "#F8FAFC" },
  visualizerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 6,
  },
  waveBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 24,
    width: 68,
    justifyContent: "space-between",
    marginRight: 12,
  },
  waveBar: {
    width: 4,
    borderRadius: 2,
  },
  waveBarLight: { backgroundColor: "#2563EB" },
  waveBarDark: { backgroundColor: "#60A5FA" },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    flex: 1,
    lineHeight: 16,
  },
  statusLight: { color: "#475467" },
  statusDark: { color: "#94A3B8" },
  footerNote: {
    fontSize: 10,
    marginTop: 6,
    lineHeight: 14,
  },
  footerNoteLight: { color: "#64748B" },
  footerNoteDark: { color: "#64748B" },
});
