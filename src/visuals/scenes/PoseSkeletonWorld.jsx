import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import {
  CoordinateFrame,
  MeasurementGrid,
  TelemetryLabel,
  TechnicalArc,
} from '../core';

/**
 * PoseSkeletonWorld — V7 Scientific Visualization (Phase 6 Core Portfolio)
 * 
 * Replaces decorative toy spheres with an authoritative 21-landmark
 * MediaPipe hand pose skeleton connected to the 3-DOF kinematic arm:
 * 
 * 1. 21 anatomical landmarks (wrist, CMC, MCP, PIP, DIP, tips)
 * 2. Anatomical bone graph connections (palm + 5 digits)
 * 3. 3-DOF kinematic arm responding to gesture commands
 * 4. Signal mapping beam: Hand tracking → Gesture classifier → Arm target
 * 5. Scientific telemetry HUD (MediaPipe, HSV/neural tracking, command protocol)
 */

export default function PoseSkeletonWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const handGroupRef = useRef();

  // 1. MediaPipe 21 Hand Landmarks Definition
  // Centered around [2.2, -0.2, 0.6]
  const handCenter = useMemo(() => [2.1, -0.15, 0.4], []);

  // Compute 21 landmarks relative to wrist [0, 0, 0]
  const rawLandmarks = useMemo(() => [
    /* 0: Wrist */ [0, 0, 0],
    /* Thumb */
    /* 1: CMC */ [-0.22, 0.18, -0.04],
    /* 2: MCP */ [-0.34, 0.35, -0.06],
    /* 3: IP  */ [-0.42, 0.52, -0.05],
    /* 4: TIP */ [-0.46, 0.66, -0.02],
    /* Index */
    /* 5: MCP */ [-0.14, 0.48, 0.02],
    /* 6: PIP */ [-0.15, 0.72, 0.04],
    /* 7: DIP */ [-0.14, 0.90, 0.03],
    /* 8: TIP */ [-0.12, 1.05, 0.01],
    /* Middle */
    /* 9: MCP  */ [0.03, 0.49, 0.02],
    /* 10: PIP */ [0.04, 0.76, 0.05],
    /* 11: DIP */ [0.05, 0.96, 0.04],
    /* 12: TIP */ [0.06, 1.12, 0.02],
    /* Ring */
    /* 13: MCP */ [0.20, 0.46, 0.0],
    /* 14: PIP */ [0.22, 0.70, 0.03],
    /* 15: DIP */ [0.23, 0.88, 0.02],
    /* 16: TIP */ [0.24, 1.02, 0.01],
    /* Pinky */
    /* 17: MCP */ [0.34, 0.38, -0.03],
    /* 18: PIP */ [0.38, 0.56, -0.02],
    /* 19: DIP */ [0.40, 0.70, -0.02],
    /* 20: TIP */ [0.42, 0.82, -0.03],
  ], []);

  // Scale and translate landmarks to world space
  const handScale = 0.9;
  const landmarks = useMemo(() => rawLandmarks.map(([x, y, z]) => [
    handCenter[0] + x * handScale,
    handCenter[1] + y * handScale,
    handCenter[2] + z * handScale,
  ]), [rawLandmarks, handCenter, handScale]);

  // Bone connectivity pairs (MediaPipe topological graph)
  const bonePairs = useMemo(() => [
    // Palm connections
    [0, 1], [0, 5], [5, 9], [9, 13], [13, 17], [0, 17],
    // Thumb
    [1, 2], [2, 3], [3, 4],
    // Index
    [5, 6], [6, 7], [7, 8],
    // Middle
    [9, 10], [10, 11], [11, 12],
    // Ring
    [13, 14], [14, 15], [15, 16],
    // Pinky
    [17, 18], [18, 19], [19, 20],
  ], []);

  // 2. Kinematic Arm parameters (scaled & placed on left side)
  const armOrigin = useMemo(() => [-0.8, -1.65, 0], []);
  const H = 0.6;
  const L1 = 1.18;
  const L2 = 1.02;

  const q1 = 0.65; // ~37°
  const q2 = -0.92; // ~-52°

  const joint1 = useMemo(() => [armOrigin[0], armOrigin[1] + H, armOrigin[2]], [armOrigin, H]);
  const joint2 = useMemo(() => [
    joint1[0] + L1 * Math.sin(q1),
    joint1[1] + L1 * Math.cos(q1),
    joint1[2],
  ], [joint1, L1, q1]);
  const joint3 = useMemo(() => {
    const total = q1 + q2;
    return [
      joint2[0] + L2 * Math.sin(total),
      joint2[1] + L2 * Math.cos(total),
      joint2[2],
    ];
  }, [joint2, L2, q1, q2]);

  // Subtle hand sway animation
  useFrame((state) => {
    if (reduced || !handGroupRef.current) return;
    const t = state.clock.elapsedTime * 0.7;
    handGroupRef.current.position.y = Math.sin(t) * 0.025;
    handGroupRef.current.rotation.z = Math.sin(t * 0.8) * 0.02;
  });

  return (
    <group position={position} scale={scale}>
      {/* Ground reference grid */}
      <MeasurementGrid
        position={[0, -1.72, 0]}
        size={8.8}
        divisions={22}
        color="#2D302D"
        opacity={0.07}
      />

      {/* 1. Arm Assembly on Left */}
      <group>
        {/* Base turret */}
        <mesh position={[armOrigin[0], armOrigin[1] + H / 2, armOrigin[2]]}>
          <cylinderGeometry args={[0.065, 0.08, H, 20]} />
          <meshPhysicalMaterial color="#f4f0e8" roughness={0.3} metalness={0.15} />
        </mesh>
        <mesh position={[armOrigin[0], armOrigin[1] + 0.04, armOrigin[2]]}>
          <cylinderGeometry args={[0.28, 0.32, 0.08, 30]} />
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.4} metalness={0.25} />
        </mesh>

        {/* Links */}
        <Line points={[joint1, joint2]} color="#f4f0e8" lineWidth={4.8} />
        <Line points={[joint1, joint2]} color="#2D302D" lineWidth={1.2} />
        <Line points={[joint2, joint3]} color="#f4f0e8" lineWidth={3.8} />
        <Line points={[joint2, joint3]} color="#2D302D" lineWidth={1.2} />

        {/* Joint bearings */}
        <mesh position={joint1} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.18, 24]} />
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.35} metalness={0.2} />
        </mesh>
        <mesh position={joint2} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.16, 24]} />
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.35} metalness={0.2} />
        </mesh>

        {/* Arm Tool Center Point Frame */}
        <CoordinateFrame position={joint3} scale={0.65} opacity={0.9} thickness={0.012} />
        <TelemetryLabel
          position={[joint3[0] + 0.14, joint3[1] + 0.16, joint3[2]]}
          label="FRAME / TCP"
          value="IK TARGET REACHED"
          fontSize={0.065}
          color="#2D302D"
          valueColor="#50a050"
          opacity={0.85}
        />
      </group>

      {/* 2. MediaPipe 21-Landmark Hand Skeleton on Right */}
      <group ref={handGroupRef}>
        {/* Hand wrist coordinate frame */}
        <CoordinateFrame
          position={landmarks[0]}
          scale={0.55}
          opacity={0.75}
          thickness={0.01}
        />
        <TelemetryLabel
          position={[landmarks[0][0] - 0.22, landmarks[0][1] - 0.15, landmarks[0][2]]}
          label="POSE / WRIST (0)"
          value="CONFIDENCE: 98.4%"
          fontSize={0.058}
          color="#2D302D"
          valueColor="#50a050"
          opacity={0.75}
        />

        {/* 21 Landmark Spheres */}
        {landmarks.map((pt, i) => (
          <mesh key={i} position={pt}>
            <sphereGeometry args={[i === 0 || i === 4 || i === 8 || i === 12 || i === 16 || i === 20 ? 0.026 : 0.018, 12, 12]} />
            <meshBasicMaterial
              color={i === 4 || i === 8 ? '#b98569' : i === 0 ? '#5070c0' : '#2D302D'}
              transparent
              opacity={0.9}
            />
          </mesh>
        ))}

        {/* Bones connecting landmarks */}
        {bonePairs.map(([from, to], i) => (
          <Line
            key={i}
            points={[landmarks[from], landmarks[to]]}
            color="#6a6b65"
            lineWidth={1.6}
            transparent
            opacity={0.65}
          />
        ))}

        {/* Gesture Pinch vector between Thumb Tip (4) and Index Tip (8) */}
        <Line
          points={[landmarks[4], landmarks[8]]}
          color="#b98569"
          lineWidth={2.2}
          dashed
          dashScale={0.03}
          transparent
          opacity={0.85}
        />
        <TelemetryLabel
          position={[(landmarks[4][0] + landmarks[8][0]) / 2 + 0.12, (landmarks[4][1] + landmarks[8][1]) / 2 + 0.05, landmarks[4][2]]}
          label="GESTURE: PINCH"
          value="GRIP DIST: 42mm"
          fontSize={0.058}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.85}
        />
      </group>

      {/* 3. Real-time Transmission / Signal Ray from Hand to Arm End-Effector */}
      <Line
        points={[landmarks[8], [joint3[0] + 0.1, joint3[1] + 0.05, joint3[2]]]}
        color="#b98569"
        lineWidth={1.2}
        dashed
        dashScale={0.06}
        transparent
        opacity={0.4}
      />
      <TelemetryLabel
        position={[(landmarks[8][0] + joint3[0]) / 2 - 0.1, (landmarks[8][1] + joint3[1]) / 2 + 0.18, (landmarks[8][2] + joint3[2]) / 2]}
        label="TELEMETRY / SERIAL COMMAND"
        value="BAUD 115200 · LATENCY < 18ms"
        fontSize={0.06}
        color="#6a6b65"
        opacity={0.65}
      />

      {/* 4. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / VISION & GESTURE"
          value="MediaPipe Hands + OpenCV Pipeline"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="TRACKING MODEL"
          value="21 3D Anatomical Landmarks"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="CLASSIFIER OUTPUT"
          value="STATE: PINCH / POSITION TRACKING"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="PROTOTYPED WITH WEBCAM + ARDUINO"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
