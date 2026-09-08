import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  MeasurementGrid,
  TelemetryLabel,
  TechnicalArc,
  DataPulse,
} from '../core';

/**
 * ControlLoopWorld — V7 Scientific Visualization (Phase 12 Full Portfolio)
 * 
 * Replaces toy vehicle blocks with an authoritative control theory
 * and closed-loop robotics visualization:
 * 
 * 1. Reference high-contrast track curve with tolerance bounds
 * 2. 5-channel IR reflectance sensor array with intensity bars
 * 3. Cross-track error vector e(t) and PID steering correction
 * 4. Closed-loop control block diagram in 3D
 * 5. Scientific telemetry HUD (Discrete PID, 100Hz loop, line estimator)
 */

export default function ControlLoopWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const sensorGroupRef = useRef();

  // 1. S-Curve Reference Track Points
  const trackPoints = useMemo(() => {
    const keypoints = [
      [-2.6, -1.7, 1.4],
      [-1.4, -1.7, 0.7],
      [-0.2, -1.7, 0.2],
      [1.0, -1.7, -0.4],
      [2.2, -1.7, -1.2],
    ];
    const curve = new THREE.CatmullRomCurve3(
      keypoints.map(([x, y, z]) => new THREE.Vector3(x, y, z))
    );
    return curve.getPoints(60).map(p => [p.x, p.y, p.z]);
  }, []);

  // Tolerance boundary offset lines (+/- 0.35m)
  const leftTolerance = useMemo(() => trackPoints.map(([x, y, z]) => [x - 0.25, y, z - 0.15]), [trackPoints]);
  const rightTolerance = useMemo(() => trackPoints.map(([x, y, z]) => [x + 0.25, y, z + 0.15]), [trackPoints]);

  // 2. 5-Channel IR Sensor Reflectance Readings
  // Robot chassis placed at [-0.1, -1.5, 0.25]
  const robotPos = useMemo(() => [0.1, -1.58, 0.1], []);

  const irSensors = useMemo(() => [
    { id: 'IR_0', offset: -0.32, val: 0.12, isLine: false },
    { id: 'IR_1', offset: -0.16, val: 0.35, isLine: false },
    { id: 'IR_2', offset: 0.0, val: 0.94, isLine: true },  // Centered on line
    { id: 'IR_3', offset: 0.16, val: 0.42, isLine: false },
    { id: 'IR_4', offset: 0.32, val: 0.15, isLine: false },
  ], []);

  // Subtle steering oscillation
  useFrame((state) => {
    if (reduced || !sensorGroupRef.current) return;
    const t = state.clock.elapsedTime * 1.5;
    sensorGroupRef.current.position.x = Math.sin(t) * 0.04;
    sensorGroupRef.current.rotation.y = Math.sin(t) * 0.06;
  });

  return (
    <group position={position} scale={scale}>
      {/* 1. Precision Measurement Reference Grid */}
      <MeasurementGrid
        position={[0, -1.72, 0]}
        size={8.8}
        divisions={22}
        color="#2D302D"
        opacity={0.07}
      />

      {/* 2. Reference Track Centerline & Tolerance Margins */}
      {/* Centerline (Black electrical tape track) */}
      <Line
        points={trackPoints}
        color="#2D302D"
        lineWidth={6.0}
      />
      {/* Left Tolerance limit */}
      <Line
        points={leftTolerance}
        color="#a9bbc4"
        lineWidth={1.0}
        dashed
        dashScale={0.05}
        transparent
        opacity={0.4}
      />
      {/* Right Tolerance limit */}
      <Line
        points={rightTolerance}
        color="#a9bbc4"
        lineWidth={1.0}
        dashed
        dashScale={0.05}
        transparent
        opacity={0.4}
      />

      {/* 3. Sensor Array & Robot Position */}
      <group ref={sensorGroupRef} position={robotPos}>
        {/* Chassis mount plate */}
        <RoundedBox args={[0.9, 0.04, 0.45]} radius={0.02} castShadow>
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.4} metalness={0.2} />
        </RoundedBox>

        {/* 5 IR Reflectance Sensor Channels */}
        {irSensors.map((sensor, idx) => (
          <group key={sensor.id} position={[sensor.offset, 0.03, 0.18]}>
            {/* Sensor LED package */}
            <mesh>
              <boxGeometry args={[0.06, 0.05, 0.08]} />
              <meshBasicMaterial color={sensor.isLine ? '#50a050' : '#2D302D'} />
            </mesh>

            {/* Vertical Intensity Bar (proportional to reflectance reading) */}
            <mesh position={[0, 0.08 + (sensor.val * 0.28) / 2, 0]}>
              <cylinderGeometry args={[0.015, 0.015, sensor.val * 0.28, 12]} />
              <meshBasicMaterial
                color={sensor.isLine ? '#50a050' : '#b98569'}
                transparent
                opacity={0.85}
              />
            </mesh>

            <TelemetryLabel
              position={[0, 0.42, 0]}
              label={sensor.id}
              value={`${Math.round(sensor.val * 100)}%`}
              fontSize={0.042}
              color={sensor.isLine ? '#50a050' : '#6a6b65'}
              opacity={0.85}
            />
          </group>
        ))}

        {/* Error Vector e(t) */}
        <Line
          points={[[0, 0.06, 0.18], [0.08, 0.06, 0.18]]}
          color="#c75050"
          lineWidth={2.5}
        />
        <TelemetryLabel
          position={[0.15, 0.22, 0.18]}
          label="ERROR e(t)"
          value="+4.2mm CROSS-TRACK"
          fontSize={0.05}
          color="#c75050"
          opacity={0.9}
        />

        {/* Steering Correction Angle Arc u(t) */}
        <TechnicalArc
          position={[0, 0.08, -0.1]}
          radius={0.32}
          startAngle={Math.PI / 2 - 0.22}
          endAngle={Math.PI / 2 + 0.22}
          color="#b98569"
          opacity={0.65}
          dashed
          dashScale={0.04}
        />
      </group>

      {/* 4. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / CLOSED-LOOP CONTROL"
          value="Autonomous Line Tracking Robot"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="ALGORITHM & FREQUENCY"
          value="Discrete PID · 100 Hz (10ms Loop Time)"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="TUNED GAINS"
          value="Kp: 1.85 · Ki: 0.04 · Kd: 0.62"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="PHYSICAL HARDWARE TESTED ON COURSE"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
