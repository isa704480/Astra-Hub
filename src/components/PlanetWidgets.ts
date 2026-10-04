import { SpaceBody } from "../data/mockData";

export type PlanetChartMetric = "gravity" | "temperature";

export interface PlanetChartProps {
  metric: PlanetChartMetric;
}

export interface PlanetSwiperProps {
  planets: SpaceBody[];
  onSelect: (bodyId: string) => void;
  onActiveChange?: (bodyId: string) => void;
}