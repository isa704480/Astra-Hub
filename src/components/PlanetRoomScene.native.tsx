import React from "react";
import { StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { CelestialType, planetYouTubeVideos } from "../data/mockData";
import { Planet3DView } from "./Planet3DView";

interface PlanetRoomSceneProps {
  bodyId: CelestialType;
  rotation?: number;
}

export function PlanetRoomScene({ bodyId }: PlanetRoomSceneProps) {
  const videoId = planetYouTubeVideos[bodyId];

  if (!videoId) {
    return <Planet3DView bodyId={bodyId} />;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0&playsinline=1&modestbranding=1`;

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
