"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fragmentShader, vertexShader } from "./shaders";
import { TextureLoader, Texture, CanvasTexture } from "three";

interface PlaneMapProps {
  tilesCount: number;
  z: number;
}

export const PlaneMap = ({ tilesCount, z }: PlaneMapProps) => {
  const TILES_BASE_URL = "https://joric.github.io/stalker2_tileset/tiles";
  const currentTilesCount = useMemo(() => Math.pow(2, z), [z]);
  const textureRef = useRef<Texture | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const uniformsRef = useRef({
    uMap: { value: null as Texture | null },
    uZ: { value: z },
  });
  const scaleHeight = 7;

  useEffect(() => {
    setIsLoading(true);
    const loader = new TextureLoader();
    const tileSize = 256; // Розмір одного тайла в пікселях
    const totalTiles = currentTilesCount * currentTilesCount;
    let loadedTiles = 0;
    // Зберігати тайли в правильному порядку [x][y]
    const loadedTextures: (HTMLImageElement | null)[][] = Array(currentTilesCount)
      .fill(null)
      .map(() => Array(currentTilesCount).fill(null));

    // Очистити попередню текстуру
    if (textureRef.current) {
      textureRef.current.dispose();
      textureRef.current = null;
    }

    // Завантажити всі тайли
    for (let x = 0; x < currentTilesCount; x++) {
      for (let y = 0; y < currentTilesCount; y++) {
        const textureUrl = `${TILES_BASE_URL}/${z}/${x}/${y}.jpg`;
        
        loader.load(
          textureUrl,
          (texture) => {
            // Отримати HTMLImageElement з текстури
            const img = texture.image as HTMLImageElement;
            loadedTextures[x][y] = img;
            loadedTiles++;

            // Коли всі тайли завантажені, об'єднати їх
            if (loadedTiles === totalTiles) {
              combineTiles(loadedTextures, currentTilesCount, tileSize);
            }
          },
          undefined,
          (error) => {
            console.error(`Error loading texture ${x}/${y}:`, error);
            loadedTextures[x][y] = null;
            loadedTiles++;
            // Продовжити навіть якщо один тайл не завантажився
            if (loadedTiles === totalTiles) {
              combineTiles(loadedTextures, currentTilesCount, tileSize);
            }
          }
        );
      }
    }

    function combineTiles(
      images: (HTMLImageElement | null)[][],
      tilesCount: number,
      tileSize: number
    ) {
      const canvas = document.createElement("canvas");
      const size = tilesCount * tileSize;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Failed to get canvas context");
        setIsLoading(false);
        return;
      }

      // Намалювати всі тайли на canvas в правильному порядку
      for (let x = 0; x < tilesCount; x++) {
        for (let y = 0; y < tilesCount; y++) {
          const img = images[x][y];
          if (img) {
            ctx.drawImage(
              img,
              x * tileSize,
              y * tileSize,
              tileSize,
              tileSize
            );
          }
        }
      }

      // Створити Three.js текстуру з canvas
      const combinedTexture = new CanvasTexture(canvas);
      combinedTexture.needsUpdate = true;
      
      textureRef.current = combinedTexture;
      uniformsRef.current.uMap.value = combinedTexture;
      setIsLoading(false);
    }

    return () => {
      if (textureRef.current) {
        textureRef.current.dispose();
        textureRef.current = null;
      }
    };
  }, [z, currentTilesCount]);

  useEffect(() => {
    uniformsRef.current.uZ.value = z;
  }, [z]);

  if (isLoading || !textureRef.current) {
    return null;
  }

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={scaleHeight}
    >
      <planeGeometry args={[tilesCount, tilesCount]} />
      <shaderMaterial
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniformsRef.current}
      />
    </mesh>
  );
};
