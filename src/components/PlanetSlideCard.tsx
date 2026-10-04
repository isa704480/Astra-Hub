import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SpaceBody } from "../data/mockData";

interface PlanetSlideCardProps {
  body: SpaceBody;
  onPress: () => void;
}

export function PlanetSlideCard({ body, onPress }: PlanetSlideCardProps) {
  const temperature = body.stats.find((stat) =>
    /harorat|bulut/i.test(stat.label),
  )?.value;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`${body.name} haqida batafsil`}
      activeOpacity={0.84}
      onPress={onPress}
      style={[styles.card, { borderTopColor: body.accent }]}
    >
      <View style={[styles.planetOrb, { backgroundColor: `${body.accent}22` }]}>
        <Text style={styles.emoji}>{body.emoji}</Text>
      </View>
      <Text style={styles.badge}>{body.badge}</Text>
      <Text style={styles.name}>{body.name}</Text>
      <Text numberOfLines={2} style={styles.subtitle}>
        {body.subtitle}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.temperature}>
          {temperature ?? body.stats[0].value}
        </Text>
        <Text style={styles.link}>Batafsil ›</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    width: "100%",
    minHeight: 184,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E1E7EF",
    borderTopWidth: 3,
    padding: 14,
  },
  planetOrb: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: { fontSize: 27 },
  badge: {
    color: "#748095",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginTop: 11,
    textTransform: "uppercase",
  },
  name: { color: "#172437", fontSize: 20, fontWeight: "800", marginTop: 4 },
  subtitle: { color: "#667085", fontSize: 11, lineHeight: 15, marginTop: 4 },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 11,
  },
  temperature: { color: "#2563EB", fontSize: 12, fontWeight: "800" },
  link: { color: "#667085", fontSize: 10, fontWeight: "700" },
});
