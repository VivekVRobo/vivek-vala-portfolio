import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * TechnicalArc — V7 Telemetry Primitive
 * 
 * Renders a precise angular arc for joint angles, covariance bounds,
 * sweep ranges, or workspace limits. Uses buffer geometry for efficiency.
 * 
 * The arc is drawn in the XY plane from startAngle to endAngle.
 */

export default function TechnicalArc({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  radius = 0.5,
  startAngle = 0,
  endAngle = Math.PI / 2,
  segments = 48,
  color = '#B98569',
  opacity = 0.4,
  lineWidth = 1,
  dashed = false,
  dashScale = 0.1,
}) {
  const geometry = useMemo(() => {
    const points = [];
    const range = endAngle - startAngle;
    for (let i = 0; i <= segments; i++) {
      const theta = startAngle + (i / segments) * range;
      points.push(new THREE.Vector3(
        Math.cos(theta) * radius,
        Math.sin(theta) * radius,
        0
      ));
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    if (dashed) {
      const distances = new Float32Array(points.length);
      let acc = 0;
      distances[0] = 0;
      for (let i = 1; i < points.length; i++) {
        acc += points[i].distanceTo(points[i - 1]);
        distances[i] = acc;
      }
      geo.setAttribute('lineDistance', new THREE.BufferAttribute(distances, 1));
    }
    return geo;
  }, [radius, startAngle, endAngle, segments, dashed]);

  return (
    <group position={position} rotation={rotation}>
      <line geometry={geometry}>
        {dashed ? (
          <lineDashedMaterial
            color={color}
            transparent
            opacity={opacity}
            dashSize={dashScale}
            gapSize={dashScale * 0.6}
            depthWrite={false}
          />
        ) : (
          <lineBasicMaterial
            color={color}
            transparent
            opacity={opacity}
            depthWrite={false}
          />
        )}
      </line>
    </group>
  );
}
