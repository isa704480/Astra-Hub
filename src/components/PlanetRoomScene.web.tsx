import React from "react";
import { Canvas } from "@react-three/fiber";
import { CelestialType } from "../data/mockData";
import { PlanetModel } from "./PlanetModel";

interface PlanetRoomSceneProps {
  bodyId: CelestialType;
  rotation: number;
}

export function PlanetRoomScene({ bodyId, rotation }: PlanetRoomSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.3], fov: 42 }}
      dpr={[1, 1.5]}
      style={{ width: "100%", height: "100%" }}
    >
      <color attach="background" args={["#071421"]} />
      <PlanetModel bodyId={bodyId} rotation={rotation} />
    </Canvas>
  );
}
