import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';

/**
 * TelemetryLabel — V7 Telemetry Primitive
 * 
 * A billboard text label for technical annotations in 3D space.
 * Uses drei's Text (troika-three-text) for crisp SDF rendering.
 * Always faces the camera (billboard mode).
 * 
 * Renders a mono-spaced label + optional value underneath.
 */

export default function TelemetryLabel({
  position = [0, 0, 0],
  label = 'LABEL',
  value = '',
  color = '#2D302D',
  valueColor = '#6a6b65',
  fontSize = 0.08,
  opacity = 0.65,
  anchorX = 'left',
  anchorY = 'bottom',
  font,
  letterSpacing = 0.06,
}) {
  return (
    <group position={position}>
      <Text
        fontSize={fontSize}
        color={color}
        anchorX={anchorX}
        anchorY={anchorY}
        font={font}
        letterSpacing={letterSpacing}
        fillOpacity={opacity}
        renderOrder={10}
      >
        {label.toUpperCase()}
      </Text>
      {value && (
        <Text
          position={[0, -fontSize * 1.4, 0]}
          fontSize={fontSize * 0.85}
          color={valueColor}
          anchorX={anchorX}
          anchorY={anchorY}
          font={font}
          letterSpacing={letterSpacing * 0.7}
          fillOpacity={opacity * 0.75}
          renderOrder={10}
        >
          {value}
        </Text>
      )}
    </group>
  );
}
