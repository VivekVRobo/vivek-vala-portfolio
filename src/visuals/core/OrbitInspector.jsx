import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * OrbitInspector — Provides tactile 360-degree rotational inspection with spring-damped return.
 * 
 * Can receive rotation input either directly from R3F pointer events or via the
 * global 'portfolio-orbit-inspect' event dispatched by UI viewports (e.g. .case-hero__space).
 */
export default function OrbitInspector({
  children,
  enabled = true,
  springBack = true,
  sensitivity = 2.4,
  springSpeed = 3.8,
  maxPolarAngle = Math.PI / 2.3,
  minPolarAngle = -Math.PI / 2.3,
  onInspectChange,
  ...props
}) {
  const groupRef = useRef();
  const isDraggingRef = useRef(false);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;

    const handleOrbitInspect = (e) => {
      const { dx, dy, active } = e.detail || {};
      isDraggingRef.current = Boolean(active);
      if (onInspectChange) onInspectChange(isDraggingRef.current);

      if (active && (dx !== undefined || dy !== undefined)) {
        // Apply deltas to target spherical rotation
        targetRotation.current.y += (dx || 0) * sensitivity * Math.PI;
        targetRotation.current.x = Math.max(
          minPolarAngle,
          Math.min(maxPolarAngle, targetRotation.current.x + (dy || 0) * sensitivity * Math.PI)
        );
      }
    };

    window.addEventListener('portfolio-orbit-inspect', handleOrbitInspect);
    return () => {
      window.removeEventListener('portfolio-orbit-inspect', handleOrbitInspect);
    };
  }, [enabled, sensitivity, minPolarAngle, maxPolarAngle, onInspectChange]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (!isDraggingRef.current && springBack) {
      // Spring smoothly back to rest position (0, 0)
      targetRotation.current.x = THREE.MathUtils.damp(targetRotation.current.x, 0, springSpeed, delta);
      targetRotation.current.y = THREE.MathUtils.damp(targetRotation.current.y, 0, springSpeed, delta);
    }

    // Lerp current rotation towards target with high responsiveness
    currentRotation.current.x = THREE.MathUtils.damp(
      currentRotation.current.x,
      targetRotation.current.x,
      14,
      delta
    );
    currentRotation.current.y = THREE.MathUtils.damp(
      currentRotation.current.y,
      targetRotation.current.y,
      14,
      delta
    );

    groupRef.current.rotation.x = currentRotation.current.x;
    groupRef.current.rotation.y = currentRotation.current.y;
  });

  return (
    <group ref={groupRef} {...props}>
      {children}
    </group>
  );
}
