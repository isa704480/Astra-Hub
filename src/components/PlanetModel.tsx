import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { CelestialType } from "../data/mockData";
import { Group } from "three";

interface PlanetModelProps {
  bodyId: CelestialType;
  rotation: number;
}

const colors: Record<CelestialType, string> = {
  mercury: "#aaa39a",
  venus: "#d88c50",
  earth: "#2577be",
  moon: "#bdc4ce",
  mars: "#b94e3f",
  jupiter: "#c28a62",
  saturn: "#d2b678",
  uranus: "#65b9c1",
  neptune: "#2862bd",
};

const starPositions = [
  [-2.2, 1.5, -1.4],
  [-1.8, -1.1, -1],
  [-1.4, 2, -2],
  [-0.6, -1.8, -1.5],
  [0.2, 1.7, -1.8],
  [0.8, -1.4, -2],
  [1.5, 1.2, -1.1],
  [2, -0.7, -1.8],
  [-2.1, 0.3, -2],
  [1.3, 2, -2],
  [-0.9, 0.9, -2],
  [2.1, 0.4, -1.4],
  [-1.6, -1.8, -2],
  [0.5, 0.3, -2.3],
  [1.9, -1.7, -1.2],
  [-0.2, 2.1, -1.2],
];

const craterFields: Partial<
  Record<CelestialType, Array<[number, number, number]>>
> = {
  mercury: [
    [-0.42, 0.38, 0.11],
    [0.24, 0.48, 0.075],
    [0.45, 0.12, 0.13],
    [-0.18, -0.2, 0.16],
    [0.27, -0.48, 0.08],
    [-0.54, -0.42, 0.07],
  ],
  moon: [
    [-0.42, 0.38, 0.12],
    [0.24, 0.48, 0.075],
    [0.45, 0.12, 0.13],
    [-0.18, -0.2, 0.16],
    [0.27, -0.48, 0.08],
    [-0.54, -0.42, 0.07],
  ],
  mars: [
    [-0.42, 0.38, 0.09],
    [0.24, 0.48, 0.055],
    [0.45, 0.12, 0.1],
    [-0.18, -0.2, 0.13],
    [0.27, -0.48, 0.065],
  ],
};

const earthContinents: Array<[number, number, number, number]> = [
  [-0.34, 0.28, 0.28, 0.15],
  [0.12, 0.04, 0.16, 0.32],
  [0.38, 0.38, 0.2, 0.13],
  [0.42, -0.32, 0.13, 0.1],
];

export function PlanetModel({ bodyId, rotation }: PlanetModelProps) {
  const group = useRef<Group>(null);
  const bands = useMemo(() => [-0.55, -0.28, 0, 0.27, 0.52], []);
  const gasGiant = ["jupiter", "saturn", "uranus", "neptune"].includes(bodyId);
  const ringed = bodyId === "saturn";
  const clouded = gasGiant || bodyId === "venus";

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.2;
    group.current.rotation.z += (rotation - group.current.rotation.z) * 0.08;
  });

  return (
    <>
      <ambientLight intensity={1.05} />
      <meshStandardMaterial
        color={colors[bodyId]}
        roughness={0.82}
        metalness={0.02}
      />
      <pointLight position={[-3, -1, 2]} intensity={0.65} color="#4e90ff" />
      {craterFields[bodyId]?.map(([x, y, radius], index) => {
        const z = Math.sqrt(Math.max(0.06, 0.94 * 0.94 - x * x - y * y));
        return (
          <group key={`crater-${index}`} position={[x, y, z + 0.006]}>
            <mesh scale={[radius * 1.34, radius * 1.34, 1]}>
              <circleGeometry args={[1, 28]} />
              <meshBasicMaterial
                color="#322d2a"
                transparent
                opacity={0.56}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[radius, 0.012, 6, 28]} />
              <meshBasicMaterial color="#eee0ca" transparent opacity={0.44} />
            </mesh>
          </group>
        );
      })}
      {bodyId === "earth" &&
        earthContinents.map(([x, y, width, height], index) => {
          const z = Math.sqrt(Math.max(0.08, 0.94 * 0.94 - x * x - y * y));
          return (
            <mesh
              key={`continent-${index}`}
              position={[x, y, z + 0.012]}
              scale={[width, height, 0.035]}
            >
              <sphereGeometry args={[1, 24, 18]} />
              <meshStandardMaterial
                color={index % 2 ? "#79bf76" : "#57a979"}
                roughness={0.9}
              />
            </mesh>
          );
        })}
      {clouded &&
        bands.map((height, index) => (
          <mesh key={index} position={[0, height, 0]}>
            <sphereGeometry args={[index % 4 === 0 ? 0.023 : 0.014, 8, 8]} />
            <meshBasicMaterial
              color={
                index % 2 === 0
                  ? "#ffe0b3"
                  : bodyId === "venus"
                    ? "#a75a36"
                    : "#563f47"
              }
              transparent
              opacity={bodyId === "venus" ? 0.2 : index % 2 === 0 ? 0.3 : 0.22}
            />
          </mesh>
        ))}
      <group ref={group}>
        {ringed && (
          <mesh rotation={[Math.PI / 2.2, 0.08, -0.25]}>
            <torusGeometry args={[1.24, 0.1, 12, 96]} />
            <meshStandardMaterial
              color="#e4d1a1"
              roughness={0.8}
              metalness={0.12}
            />
          </mesh>
        )}
        <mesh>
          <sphereGeometry args={[0.94, 64, 48]} />
          <meshStandardMaterial
            color={colors[bodyId]}
            roughness={0.72}
            metalness={0.04}
          />
        </mesh>
        {gasGiant &&
          bands.map((height, index) => (
            <mesh
              key={height}
              position={[0, height, 0]}
              scale={[
                0.94 * Math.sqrt(1 - height * height),
                0.025,
                0.94 * Math.sqrt(1 - height * height),
              ]}
            >
              <sphereGeometry args={[1.006, 48, 12]} />
              <meshBasicMaterial
                color={index % 2 === 0 ? "#ffe0b3" : "#563f47"}
                transparent
                opacity={index % 2 === 0 ? 0.3 : 0.22}
                depthWrite={false}
              />
            </mesh>
          ))}
        {bodyId === "jupiter" && (
          <mesh position={[0.36, -0.23, 0.88]} scale={[0.21, 0.11, 0.035]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#a94d3d" roughness={0.8} />
          </mesh>
        )}
        {ringed && (
          <mesh rotation={[Math.PI / 2.2, 0.08, -0.25]}>
            <torusGeometry args={[1.24, 0.035, 8, 96]} />
            <meshBasicMaterial color="#f4e7c7" transparent opacity={0.82} />
          </mesh>
        )}
      </group>
    </>
  );
}
