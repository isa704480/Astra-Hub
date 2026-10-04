import React from "react";
import { StyleSheet, View } from "react-native";
import { CelestialType } from "../data/mockData";
import { planetYouTubeVideos } from "./PlanetRoomScene";

interface PlanetRoomSceneProps {
  bodyId: CelestialType;
  rotation?: number;
}

export function PlanetRoomScene({ bodyId }: PlanetRoomSceneProps) {
  const videoId = planetYouTubeVideos[bodyId] ?? "HCDVN7DCzYE";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1`;

  return (
    <View style={styles.container}>
      <iframe
        src={embedUrl}
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: "#071421" },
});
