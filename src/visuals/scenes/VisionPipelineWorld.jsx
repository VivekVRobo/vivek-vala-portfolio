import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  CoordinateFrame,
  MeasurementGrid,
  TelemetryLabel,
  TechnicalArc,
} from '../core';

/**
 * VisionPipelineWorld — V7 Scientific Visualization (Phase 13 Full Portfolio)
 * 
 * Replaces cartoon conveyor boxes with an authoritative robotics vision
 * inspection workstation:
 * 
 * 1. Overhead industrial camera with optical FOV frustum projection
 * 2. Multi-channel vision inspection panels (RGB, HSV Mask, Contours)
 * 3. Bounding box reticles and centroid coordinates (cx, cy) on parts
 * 4. Optical trigger threshold line
 * 5. Servo-actuated diverter gate with angular sweep arc
 * 6. Scientific vision telemetry HUD (OpenCV pipeline, color classification)
 */

export default function VisionPipelineWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const gateRef = useRef();

  // Camera pose
  const camPos = useMemo(() => [0.2, 1.4, 0.0], []);
  // Target inspection plane at y = -1.1
  const targetY = -1.1;

  // Frustum corners at target plane
  const frustumBase = useMemo(() => [
    [-1.6, targetY, -1.2],
    [2.0, targetY, -1.2],
    [2.0, targetY, 1.2],
    [-1.6, targetY, 1.2],
  ], [targetY]);

  // Animated sorting gate sweep
  useFrame((state) => {
    if (reduced || !gateRef.current) return;
    const t = state.clock.elapsedTime * 1.2;
    gateRef.current.rotation.y = Math.sin(t) * 0.45;
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

      {/* 2. Linear Conveyor Rail / Workpiece Stage */}
      <group position={[0.2, -1.35, 0]}>
        {/* Conveyor bed */}
        <RoundedBox args={[4.4, 0.12, 1.2]} radius={0.04} castShadow>
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.4} metalness={0.2} />
        </RoundedBox>

        {/* Conveyor guide rails */}
        {[-0.55, 0.55].map((z, idx) => (
          <mesh key={idx} position={[0, 0.1, z]}>
            <boxGeometry args={[4.4, 0.08, 0.04]} />
            <meshPhysicalMaterial color="#b08a68" roughness={0.3} metalness={0.3} />
          </mesh>
        ))}

        {/* Optical Trigger Line across the belt */}
        <Line
          points={[[0.4, 0.07, -0.55], [0.4, 0.07, 0.55]]}
          color="#c75050"
          lineWidth={2.4}
        />
        <TelemetryLabel
          position={[0.42, 0.22, 0.58]}
          label="TRIGGER / BEAM INTERRUPT"
          value="x = 400mm"
          fontSize={0.048}
          color="#c75050"
          opacity={0.85}
        />
      </group>

      {/* 3. Workpiece Parts on Belt with Bounding Boxes & Centroids */}
      {/* Part 1: Red cylinder (detected) */}
      <group position={[-0.8, -1.2, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.16, 0.18, 20]} />
          <meshPhysicalMaterial color="#c75050" roughness={0.35} />
        </mesh>
        {/* Bounding box wireframe */}
        <Line
          points={[
            [-0.2, 0.12, -0.2],
            [0.2, 0.12, -0.2],
            [0.2, 0.12, 0.2],
            [-0.2, 0.12, 0.2],
            [-0.2, 0.12, -0.2],
          ]}
          color="#50a050"
          lineWidth={1.8}
        />
        <TelemetryLabel
          position={[-0.18, 0.26, -0.22]}
          label="OBJ #01 / RED"
          value="cx: 142  cy: 280  CONF: 99%"
          fontSize={0.048}
          color="#2D302D"
          valueColor="#c75050"
          opacity={0.85}
        />
      </group>

      {/* Part 2: Green block (detected) */}
      <group position={[0.2, -1.2, -0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.18, 0.28]} />
          <meshPhysicalMaterial color="#50a050" roughness={0.35} />
        </mesh>
        <Line
          points={[
            [-0.18, 0.12, -0.18],
            [0.18, 0.12, -0.18],
            [0.18, 0.12, 0.18],
            [-0.18, 0.12, 0.18],
            [-0.18, 0.12, -0.18],
          ]}
          color="#50a050"
          lineWidth={1.8}
        />
        <TelemetryLabel
          position={[-0.18, 0.26, -0.2]}
          label="OBJ #02 / GREEN"
          value="cx: 320  cy: 240  TRIGGER"
          fontSize={0.048}
          color="#2D302D"
          valueColor="#50a050"
          opacity={0.85}
        />
      </group>

      {/* 4. Overhead Industrial Vision Camera & Optical Frustum */}
      <group position={camPos}>
        {/* Camera body */}
        <RoundedBox args={[0.32, 0.22, 0.28]} radius={0.03} castShadow>
          <meshPhysicalMaterial color="#2a2e2b" roughness={0.3} metalness={0.3} />
        </RoundedBox>
        {/* Optical lens barrel */}
        <mesh position={[0, -0.14, 0]}>
          <cylinderGeometry args={[0.085, 0.095, 0.12, 24]} />
          <meshPhysicalMaterial color="#1a1c1a" roughness={0.2} metalness={0.5} />
        </mesh>

        <CoordinateFrame scale={0.55} opacity={0.75} thickness={0.01} />
        <TelemetryLabel
          position={[0.22, 0.12, 0]}
          label="CAMERA / SONY IMX219"
          value="1080p @ 30fps · FOV 62°"
          fontSize={0.055}
          color="#2D302D"
          valueColor="#5070c0"
          opacity={0.85}
        />

        {/* Optical FOV Frustum Wireframe rays */}
        {frustumBase.map((basePt, idx) => (
          <Line
            key={idx}
            points={[[0, -0.18, 0], [basePt[0] - camPos[0], basePt[1] - camPos[1], basePt[2] - camPos[2]]]}
            color="#a9bbc4"
            lineWidth={1.0}
            dashed
            dashScale={0.06}
            transparent
            opacity={0.35}
          />
        ))}
      </group>

      {/* 5. Servo Diverter Gate */}
      <group position={[1.4, -1.22, 0.45]}>
        {/* Servo mount pillar */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.26, 20]} />
          <meshPhysicalMaterial color="#2a2e2b" roughness={0.4} />
        </mesh>
        {/* Diverter arm sweep */}
        <group ref={gateRef}>
          <mesh position={[-0.32, 0.22, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[0.65, 0.12, 0.04]} />
            <meshPhysicalMaterial color="#b98569" roughness={0.3} metalness={0.3} />
          </mesh>
        </group>
        {/* Servo sweep angle arc */}
        <TechnicalArc
          position={[0, 0.26, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          radius={0.45}
          startAngle={-0.45}
          endAngle={0.45}
          color="#b98569"
          opacity={0.55}
          dashed
          dashScale={0.04}
        />
        <TelemetryLabel
          position={[0.18, 0.35, 0]}
          label="SERVO GATE / SG90"
          value="PWM SORT DISPATCH"
          fontSize={0.052}
          color="#b98569"
          opacity={0.85}
        />
      </group>

      {/* 6. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / COMPUTER VISION"
          value="Automated Object Sorting System"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="VISION PIPELINE"
          value="HSV Color Thresholding + Bounding Contours"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="SORT ACCURACY"
          value="CONFIDENCE: > 96% · SERIAL BAUD 9600"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="PHYSICAL BENCHTOP RIG CONSTRUCTED"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
