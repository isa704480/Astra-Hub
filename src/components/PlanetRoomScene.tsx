import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { CelestialType, planetYouTubeVideos } from "../data/mockData";

interface PlanetRoomSceneProps {
  bodyId: CelestialType;
  rotation?: number;
}

export function PlanetRoomScene({ bodyId }: PlanetRoomSceneProps) {
  const videoId = planetYouTubeVideos[bodyId] ?? "HCDVN7DCzYE";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1`;

  if (Platform.OS === "web") {
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

  return (
    <View style={styles.container}>
      <WebView
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        javaScriptEnabled
        mediaPlaybackRequiresUserAction={false}
        source={{ uri: embedUrl }}
        style={{ flex: 1, backgroundColor: "#071421" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", backgroundColor: "#071421" },
});
