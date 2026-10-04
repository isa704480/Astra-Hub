import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  label: {
    color: "#c4d6ff",
    fontSize: 12,
    marginBottom: 6,
  },
  value: {
    color: "#f5f7ff",
    fontSize: 18,
    fontWeight: "700",
  },
});
