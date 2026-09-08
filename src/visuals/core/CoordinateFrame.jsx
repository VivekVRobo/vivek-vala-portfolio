import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * CoordinateFrame — V7 Telemetry Primitive
 * 
 * Renders an axis-colored TF-style coordinate frame:
 *   X → red (#c75050)
 *   Y → green (#50a050)
 *   Z → blue (#5070c0)
 * 
 * Each axis is a thin cylinder with an optional label.
 * Consistent with ROS/robotics conventions (right-hand rule).
 */

const AXIS_COLORS = {
  x: '#c75050',
  y: '#50a050',
  z: '#5070c0',
};

export default function CoordinateFrame({
  position = [0, 0, 0],
  scale = 1,
  opacity = 0.7,
  thickness = 0.012,
  labels = true,
  labelScale = 0.015,
}) {
  const axisLength = 0.5 * scale;
  const geometry = useMemo(() => new THREE.CylinderGeometry(thickness, thickness, axisLength, 6), [thickness, axisLength]);

  return (
    <group position={position}>
      {/* X axis */}
      <mesh geometry={geometry} rotation={[0, 0, -Math.PI / 2]} position={[axisLength / 2, 0, 0]}>
        <meshBasicMaterial color={AXIS_COLORS.x} transparent opacity={opacity} />
      </mesh>

      {/* Y axis */}
      <mesh geometry={geometry} position={[0, axisLength / 2, 0]}>
        <meshBasicMaterial color={AXIS_COLORS.y} transparent opacity={opacity} />
      </mesh>

      {/* Z axis */}
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, axisLength / 2]}>
        <meshBasicMaterial color={AXIS_COLORS.z} transparent opacity={opacity} />
      </mesh>

      {/* Origin dot */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[thickness * 2.5, 8, 8]} />
        <meshBasicMaterial color="#222421" transparent opacity={opacity * 0.6} />
      </mesh>
    </group>
  );
}
