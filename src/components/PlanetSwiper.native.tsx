import React from "react";
import {
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { PlanetSlideCard } from "./PlanetSlideCard";
import { PlanetSwiperProps } from "./PlanetWidgets";

export function PlanetSwiper({
  planets,
  onSelect,
  onActiveChange,
}: PlanetSwiperProps) {
  const { width } = useWindowDimensions();
  const cardWidth = Math.min(360, Math.max(236, width - 36));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        decelerationRate="fast"
        snapToAlignment="start"
        snapToInterval={cardWidth + 12}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.content}
        onMomentumScrollEnd={({ nativeEvent }) => {
          const index = Math.round(
            nativeEvent.contentOffset.x / (cardWidth + 12),
          );
          const activePlanet = planets[index];
          if (activePlanet) onActiveChange?.(activePlanet.id);
        }}
      >
        {planets.map((body) => (
          <View key={body.id} style={{ width: cardWidth, marginRight: 12 }}>
            <PlanetSlideCard body={body} onPress={() => onSelect(body.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: 220 },
  content: { paddingRight: 8 },
});
