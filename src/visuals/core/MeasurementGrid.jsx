import React, { useMemo } from 'react';
import * as THREE from 'three';

/**
 * MeasurementGrid — V7 Telemetry Primitive
 * 
 * A flat reference grid that communicates scale and coordinate context.
 * Uses buffer geometry lines for GPU efficiency.
 * Fades at edges. Rendered at y=0 (ground plane).
 */

export default function MeasurementGrid({
  position = [0, 0, 0],
  size = 8,
  divisions = 16,
  color = '#222421',
  opacity = 0.06,
  fadeEdges = true,
}) {
  const geometry = useMemo(() => {
    const halfSize = size / 2;
    const step = size / divisions;
    const vertices = [];
    const colors = [];
    const c = new THREE.Color(color);

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step;
      const edgeFactor = fadeEdges
        ? 1 - Math.pow(Math.abs(pos) / halfSize, 3)
        : 1;

      // Line along X
      vertices.push(-halfSize, 0, pos, halfSize, 0, pos);
      colors.push(c.r, c.g, c.b, opacity * edgeFactor * 0.3);
      colors.push(c.r, c.g, c.b, opacity * edgeFactor * 0.3);

      // Line along Z
      vertices.push(pos, 0, -halfSize, pos, 0, halfSize);
      colors.push(c.r, c.g, c.b, opacity * edgeFactor * 0.3);
      colors.push(c.r, c.g, c.b, opacity * edgeFactor * 0.3);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 4));
    return geo;
  }, [size, divisions, color, opacity, fadeEdges]);

  return (
    <group position={position}>
      <lineSegments geometry={geometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={opacity}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
