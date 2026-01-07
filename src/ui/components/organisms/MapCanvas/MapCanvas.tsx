"use client";

import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import { MapControls } from "@react-three/drei";
import * as THREE from "three";

import { PlaneMap } from "./PlaneMap";

const AnimatedCamera = ({ zoomLevel }: { zoomLevel: number }) => {
  const MIN_CAMERA_Y = 50;
  const MAX_CAMERA_Y = 500;
  const ANIMATION_SPEED = 0.12;
  const { camera } = useThree();
  const targetY = useRef(camera.position.y);
  const initialCamera = useRef(false);

  const calculateTargetY = (level: number) => {
    const normalizedLevel = level / 7;
    const target =
      MAX_CAMERA_Y + (MIN_CAMERA_Y - MAX_CAMERA_Y) * normalizedLevel;
    return target;
  };
  console.log(zoomLevel);
  useFrame(() => {
    targetY.current = calculateTargetY(zoomLevel);

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY.current,
      initialCamera.current ? ANIMATION_SPEED : 0
    );
    camera.updateProjectionMatrix();

    if (!initialCamera.current) {
      initialCamera.current = true;
    }
  });

  return null;
};

export const MapCanvas = () => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const MIN_ZOOM = 0;
  const MAX_ZOOM = 7;
  const tilesCount = 128;

  return (
    <Canvas
      onWheel={(event) => {
        const newZoomLevel = zoomLevel - event.deltaY / 100;
        setZoomLevel(Math.max(MIN_ZOOM, Math.min(newZoomLevel, MAX_ZOOM)));
      }}
      camera={{
        position: [0, 100, 0],
        fov: 75,
      }}
    >
      <AnimatedCamera zoomLevel={zoomLevel} />
      <MapControls enableRotate={false} enablePan={true} enableZoom={false} />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <PlaneMap tilesCount={tilesCount} z={zoomLevel} />
    </Canvas>
  );
};
