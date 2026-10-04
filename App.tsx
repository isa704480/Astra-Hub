import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { AppNavigator } from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.viewport}>
        <View
          style={[styles.phoneFrame, Platform.OS === "web" && styles.webFrame]}
        >
          <AppNavigator />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E9EEF5",
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#F4F7FB",
    overflow: "hidden",
  },
  webFrame: {
    marginVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#D8E0EA",
    shadowColor: "#344054",
    shadowOpacity: 0.16,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 12 },
  },
});
