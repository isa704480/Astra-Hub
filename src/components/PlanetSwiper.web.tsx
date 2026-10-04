import React from "react";
import { StyleSheet, View } from "react-native";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { PlanetSlideCard } from "./PlanetSlideCard";
import { PlanetSwiperProps } from "./PlanetWidgets";

export function PlanetSwiper({
  planets,
  onSelect,
  onActiveChange,
}: PlanetSwiperProps) {
  return (
    <View style={styles.container}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        speed={550}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => onActiveChange?.(planets[swiper.activeIndex]?.id)}
        onSlideChange={(swiper) =>
          onActiveChange?.(planets[swiper.activeIndex]?.id)
        }
        style={styles.swiper}
      >
        {planets.map((body) => (
          <SwiperSlide key={body.id}>
            <PlanetSlideCard body={body} onPress={() => onSelect(body.id)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: 220, overflow: "hidden" },
  swiper: { width: "100%", height: 208, paddingBottom: 18 },
});
