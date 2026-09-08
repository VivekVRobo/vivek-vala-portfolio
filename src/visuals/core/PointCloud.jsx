import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * PointCloud — V7 Telemetry Primitive
 * 
 * GPU-efficient point cloud using instanced buffer geometry.
 * Each point is a single vertex with color and size attributes.
 * 
 * For SLAM scenes: 2,000–3,500 points representing LiDAR returns.
 * For other scenes: smaller clusters for decorative data visualization.
 * 
 * CRITICAL: Uses THREE.Points with BufferGeometry, NOT individual
 * React mesh components per point. This is essential for 60fps.
 */

export default function PointCloud({
  points = [],
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#2D302D',
  size = 0.03,
  opacity = 0.5,
  sizeAttenuation = true,
  animate = false,
  animateSpeed = 0.1,
  reduced = false,
}) {
  const pointsRef = useRef();
  const timeRef = useRef(0);

  const { geometry, basePositions } = useMemo(() => {
    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    const sizes = new Float32Array(points.length);
    const baseColor = new THREE.Color(color);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const i3 = i * 3;

      // Position: [x, y, z] or {x, y, z} or {x, y, z, color, size}
      if (Array.isArray(p)) {
        positions[i3] = p[0];
        positions[i3 + 1] = p[1];
        positions[i3 + 2] = p[2];
      } else {
        positions[i3] = p.x || 0;
        positions[i3 + 1] = p.y || 0;
        positions[i3 + 2] = p.z || 0;
      }

      // Color: per-point or uniform
      const pointColor = (p && p.color) ? new THREE.Color(p.color) : baseColor;
      colors[i3] = pointColor.r;
      colors[i3 + 1] = pointColor.g;
      colors[i3 + 2] = pointColor.b;

      // Size: per-point or uniform
      sizes[i] = (p && p.size) ? p.size : size;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    return { geometry: geo, basePositions: positions.slice() };
  }, [points, color, size]);

  // Optional subtle animation (breathing/floating)
  useFrame((_, delta) => {
    if (!animate || reduced || !pointsRef.current) return;
    timeRef.current += delta * animateSpeed;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < points.length; i++) {
      const i3 = i * 3;
      // Subtle vertical oscillation based on position hash
      const hash = basePositions[i3] * 7.3 + basePositions[i3 + 2] * 3.7;
      arr[i3 + 1] = basePositions[i3 + 1] + Math.sin(timeRef.current + hash) * 0.008;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} position={position} rotation={rotation} geometry={geometry}>
      <pointsMaterial
        vertexColors
        transparent
        opacity={opacity}
        size={size}
        sizeAttenuation={sizeAttenuation}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Generate a procedural point cloud for visualization.
 * Returns an array of [x, y, z] points.
 */
export function generateWallPoints(count = 2500, spread = 4, height = 0.02) {
  const pts = [];
  // Walls
  for (let i = 0; i < count * 0.6; i++) {
    const wall = Math.floor(Math.random() * 4);
    const along = (Math.random() - 0.5) * spread;
    const noise = (Math.random() - 0.5) * 0.06;
    const y = Math.random() * height;
    switch (wall) {
      case 0: pts.push([along, y, -spread / 2 + noise]); break;
      case 1: pts.push([along, y, spread / 2 + noise]); break;
      case 2: pts.push([-spread / 2 + noise, y, along]); break;
      case 3: pts.push([spread / 2 + noise, y, along]); break;
    }
  }
  // Obstacles
  const obstacles = [
    [1.2, 0, -0.8], [-1.5, 0, 1.2], [0.5, 0, 2.0], [-2.0, 0, -1.5],
  ];
  for (const [ox, oy, oz] of obstacles) {
    for (let i = 0; i < count * 0.08; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.15;
      pts.push([
        ox + Math.cos(angle) * r + (Math.random() - 0.5) * 0.04,
        oy + Math.random() * height,
        oz + Math.sin(angle) * r + (Math.random() - 0.5) * 0.04,
      ]);
    }
  }
  // Noise
  for (let i = 0; i < count * 0.08; i++) {
    pts.push([
      (Math.random() - 0.5) * spread,
      Math.random() * height,
      (Math.random() - 0.5) * spread,
    ]);
  }
  return pts;
}
