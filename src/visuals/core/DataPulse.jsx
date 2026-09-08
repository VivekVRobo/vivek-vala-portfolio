import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * DataPulse — V7 Telemetry Primitive
 * 
 * Animated pulse that travels along a path (array of [x,y,z] points).
 * Used for data flow visualization: signals through circuits, packets
 * through pipelines, commands through DAGs.
 * 
 * GPU-efficient: single sphere with useFrame position update.
 */

export default function DataPulse({
  path = [[0, 0, 0], [1, 0, 0]],
  speed = 0.4,
  color = '#B98569',
  size = 0.04,
  opacity = 0.7,
  glowColor,
  glowSize = 0.12,
  loop = true,
  reduced = false,
}) {
  const meshRef = useRef();
  const glowRef = useRef();
  const progressRef = useRef(0);

  const curve = useMemo(() => {
    const points = path.map(([x, y, z]) => new THREE.Vector3(x, y, z));
    return new THREE.CatmullRomCurve3(points, loop);
  }, [path, loop]);

  // Trail line
  const trailGeometry = useMemo(() => {
    const pts = curve.getPoints(path.length * 12);
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [curve, path.length]);

  useFrame((_, delta) => {
    if (reduced || !meshRef.current) return;
    progressRef.current = (progressRef.current + delta * speed) % 1;
    const point = curve.getPoint(progressRef.current);
    meshRef.current.position.copy(point);
    if (glowRef.current) glowRef.current.position.copy(point);
  });

  const initialPos = useMemo(() => curve.getPoint(0), [curve]);

  return (
    <group>
      {/* Trail path */}
      <line geometry={trailGeometry}>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={opacity * 0.2}
          depthWrite={false}
        />
      </line>

      {/* Pulse dot */}
      <mesh ref={meshRef} position={initialPos}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>

      {/* Optional glow */}
      {glowColor && (
        <mesh ref={glowRef} position={initialPos}>
          <sphereGeometry args={[glowSize, 8, 8]} />
          <meshBasicMaterial
            color={glowColor || color}
            transparent
            opacity={opacity * 0.15}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
