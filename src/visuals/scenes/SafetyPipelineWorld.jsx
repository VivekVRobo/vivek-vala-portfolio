import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  MeasurementGrid,
  TelemetryLabel,
  DataPulse,
} from '../core';

/**
 * SafetyPipelineWorld — V7 Scientific Visualization (Phase 10 Full Portfolio)
 * 
 * Visualizes the strict deterministic safety supervision architecture separating
 * AI cognition from physical robotic actuation:
 * 
 * 1. Sequential pipeline: Intent → Meaning → Safety Supervisor → Gateway → Digital Twin
 * 2. Visual safety barrier partitions separating cognitive domain from physical actuation
 * 3. Motion validation checks (velocity limits, collision envelopes, emergency interlock)
 * 4. Animated validated motion command pulses
 * 5. Scientific telemetry HUD (Deterministic safety supervisor, ISO boundaries)
 */

export default function SafetyPipelineWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const pipelineRef = useRef();

  // Pipeline stages coordinates
  const stages = useMemo(() => [
    { id: 'intent', label: '01 / HUMAN INPUT', sub: 'Speech & Gesture Stream', pos: [-1.8, 0.2, 0.2], color: '#f4f0e8' },
    { id: 'cognition', label: '02 / COGNITIVE AGENT', sub: 'Meaning & Behavior Plan', pos: [-0.6, 0.2, 0.1], color: '#c7a29a' },
    { id: 'safety', label: '03 / SAFETY SUPERVISOR', sub: 'Kinematic & Torque Limits', pos: [0.6, 0.2, 0.0], color: '#b98569' },
    { id: 'gateway', label: '04 / ACTUATOR GATEWAY', sub: 'E-Stop Interlock & CAN Bus', pos: [1.8, 0.2, -0.1], color: '#50a050' },
  ], []);

  // Motion command trajectory path through the pipeline
  const commandPath = useMemo(() => [
    [-1.8, 0.2, 0.2],
    [-0.6, 0.2, 0.1],
    [0.6, 0.2, 0.0],
    [1.8, 0.2, -0.1],
  ], []);

  // Subtle floating oscillation
  useFrame((state) => {
    if (reduced || !pipelineRef.current) return;
    pipelineRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
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

      <group ref={pipelineRef}>
        {/* 2. Pipeline Connecting Highway */}
        <Line
          points={commandPath}
          color="#3a3d3a"
          lineWidth={2.2}
          transparent
          opacity={0.7}
        />

        {/* 3. Safety Barrier 1 (Cognition ↔ Safety Supervisor) */}
        <group position={[0.0, 0.2, 0.05]}>
          <mesh>
            <boxGeometry args={[0.06, 2.2, 1.8]} />
            <meshPhysicalMaterial
              color="#b98569"
              transparent
              opacity={0.14}
              roughness={0.1}
              metalness={0.1}
              clearcoat={0.4}
            />
          </mesh>
          <Line
            points={[
              [0, 1.1, -0.9],
              [0, 1.1, 0.9],
              [0, -1.1, 0.9],
              [0, -1.1, -0.9],
              [0, 1.1, -0.9],
            ]}
            color="#b98569"
            lineWidth={1.4}
            dashed
            dashScale={0.05}
          />
          <TelemetryLabel
            position={[0.05, 1.18, -0.85]}
            label="SAFETY BARRIER 01"
            value="INTENT SANITIZATION"
            fontSize={0.055}
            color="#b98569"
            opacity={0.85}
          />
        </group>

        {/* 4. Safety Barrier 2 (Supervisor ↔ Physical Actuator) */}
        <group position={[1.2, 0.2, -0.05]}>
          <mesh>
            <boxGeometry args={[0.06, 2.2, 1.8]} />
            <meshPhysicalMaterial
              color="#c75050"
              transparent
              opacity={0.15}
              roughness={0.1}
              metalness={0.1}
              clearcoat={0.4}
            />
          </mesh>
          <Line
            points={[
              [0, 1.1, -0.9],
              [0, 1.1, 0.9],
              [0, -1.1, 0.9],
              [0, -1.1, -0.9],
              [0, 1.1, -0.9],
            ]}
            color="#c75050"
            lineWidth={1.4}
            dashed
            dashScale={0.05}
          />
          <TelemetryLabel
            position={[0.05, 1.18, -0.85]}
            label="SAFETY BARRIER 02"
            value="HARDWARE AUTHORIZATION & E-STOP"
            fontSize={0.055}
            color="#c75050"
            opacity={0.85}
          />
        </group>

        {/* 5. Pipeline Stage Nodes */}
        {stages.map((stage) => (
          <group key={stage.id} position={stage.pos}>
            <RoundedBox args={[0.92, 0.52, 0.12]} radius={0.05} castShadow>
              <meshPhysicalMaterial
                color="#fffdf8"
                roughness={0.35}
                metalness={0.1}
              />
            </RoundedBox>

            {/* Status indicator pill */}
            <mesh position={[-0.34, 0.15, 0.065]}>
              <boxGeometry args={[0.08, 0.04, 0.02]} />
              <meshBasicMaterial color={stage.color} />
            </mesh>

            <TelemetryLabel
              position={[-0.24, 0.14, 0.07]}
              label={stage.label}
              value={stage.sub}
              fontSize={0.048}
              color="#2D302D"
              valueColor="#6a6b65"
              opacity={0.9}
            />
          </group>
        ))}

        {/* 6. Animated Motion Command Pulse */}
        <DataPulse
          path={commandPath}
          speed={0.5}
          color="#50a050"
          size={0.045}
          opacity={0.9}
          glowColor="#50a050"
          reduced={reduced}
        />
      </group>

      {/* 7. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / MOTION SAFETY"
          value="Robotic Character Interface (RCI)"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="SUPERVISOR ARCHITECTURE"
          value="Deterministic Interlock · Joint Envelopes"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="ACTUATION AUTHORIZATION"
          value="STATE: MONITORED · VELOCITY BOUNDED"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="SIMULATION VALIDATED · HARDWARE PENDING"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
