import React, { useMemo } from 'react';
import { Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import {
  CoordinateFrame,
  MeasurementGrid,
  TelemetryLabel,
  DataPulse,
} from '../core';

/**
 * CircuitTraceWorld — V7 Scientific Visualization (Phase 7 Core Portfolio)
 * 
 * Replaces generic floating green boxes with an authoritative PCB topology
 * visualization recognizable to electronics and hardware engineers:
 * 
 * 1. FR4 substrate plate with copper routing and ground pour
 * 2. DRV8848 Dual H-Bridge motor driver (TSSOP-16) footprint & package
 * 3. Orthogonal 45° copper traces with vias, pads, and SMD components
 * 4. Animated current flow pulses (VM → DRV8848 → Motor Output)
 * 5. Current sense resistor network (ISENSE A/B) and decoupling filters
 * 6. Engineering net labels (VM, OUT1/2, nFAULT, nSLEEP, PWM)
 * 7. Hardware engineering HUD & status callout
 */

export default function CircuitTraceWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const boardCenter = useMemo(() => [1.2, -1.2, 0], []);
  const boardY = boardCenter[1];

  // 1. Orthogonal trace paths for current pulse animations
  const vmTracePath = useMemo(() => [
    [-1.8 + boardCenter[0], boardY + 0.05, -1.4 + boardCenter[2]],
    [-1.1 + boardCenter[0], boardY + 0.05, -1.4 + boardCenter[2]],
    [-0.6 + boardCenter[0], boardY + 0.05, -0.9 + boardCenter[2]],
    [-0.6 + boardCenter[0], boardY + 0.05, -0.2 + boardCenter[2]],
    [0.0 + boardCenter[0], boardY + 0.05, -0.2 + boardCenter[2]],
  ], [boardCenter, boardY]);

  const motorAOutPath = useMemo(() => [
    [0.4 + boardCenter[0], boardY + 0.05, -0.1 + boardCenter[2]],
    [1.0 + boardCenter[0], boardY + 0.05, -0.1 + boardCenter[2]],
    [1.4 + boardCenter[0], boardY + 0.05, 0.3 + boardCenter[2]],
    [1.8 + boardCenter[0], boardY + 0.05, 0.3 + boardCenter[2]],
  ], [boardCenter, boardY]);

  const motorBOutPath = useMemo(() => [
    [0.4 + boardCenter[0], boardY + 0.05, 0.2 + boardCenter[2]],
    [0.9 + boardCenter[0], boardY + 0.05, 0.2 + boardCenter[2]],
    [1.3 + boardCenter[0], boardY + 0.05, 0.8 + boardCenter[2]],
    [1.8 + boardCenter[0], boardY + 0.05, 0.8 + boardCenter[2]],
  ], [boardCenter, boardY]);

  const pwmInPath = useMemo(() => [
    [-1.6 + boardCenter[0], boardY + 0.05, 1.2 + boardCenter[2]],
    [-0.8 + boardCenter[0], boardY + 0.05, 1.2 + boardCenter[2]],
    [-0.4 + boardCenter[0], boardY + 0.05, 0.8 + boardCenter[2]],
    [-0.4 + boardCenter[0], boardY + 0.05, 0.2 + boardCenter[2]],
    [0.0 + boardCenter[0], boardY + 0.05, 0.2 + boardCenter[2]],
  ], [boardCenter, boardY]);

  // Static PCB traces (orthogonal 45° routing)
  const copperTraces = useMemo(() => [
    // VM Bus (wide power trace)
    vmTracePath,
    // Motor A Outputs
    motorAOutPath,
    motorBOutPath,
    // Logic inputs
    pwmInPath,
    // Current sense to ground
    [
      [0.1 + boardCenter[0], boardY + 0.05, -0.5 + boardCenter[2]],
      [0.1 + boardCenter[0], boardY + 0.05, -0.9 + boardCenter[2]],
      [-0.2 + boardCenter[0], boardY + 0.05, -1.2 + boardCenter[2]],
    ],
    // Decoupling cap bypass
    [
      [-0.3 + boardCenter[0], boardY + 0.05, -0.5 + boardCenter[2]],
      [-0.3 + boardCenter[0], boardY + 0.05, -0.8 + boardCenter[2]],
    ],
    // nFAULT pull-up net
    [
      [-0.2 + boardCenter[0], boardY + 0.05, 0.5 + boardCenter[2]],
      [-0.7 + boardCenter[0], boardY + 0.05, 0.5 + boardCenter[2]],
      [-0.9 + boardCenter[0], boardY + 0.05, 0.7 + boardCenter[2]],
    ],
  ], [boardCenter, boardY, vmTracePath, motorAOutPath, motorBOutPath, pwmInPath]);

  // Vias coordinates
  const vias = useMemo(() => [
    [-1.1 + boardCenter[0], boardY + 0.05, -1.4 + boardCenter[2]],
    [-0.6 + boardCenter[0], boardY + 0.05, -0.9 + boardCenter[2]],
    [1.0 + boardCenter[0], boardY + 0.05, -0.1 + boardCenter[2]],
    [0.9 + boardCenter[0], boardY + 0.05, 0.2 + boardCenter[2]],
    [-0.8 + boardCenter[0], boardY + 0.05, 1.2 + boardCenter[2]],
    [-0.4 + boardCenter[0], boardY + 0.05, 0.8 + boardCenter[2]],
    [-0.2 + boardCenter[0], boardY + 0.05, -1.2 + boardCenter[2]],
    [-0.9 + boardCenter[0], boardY + 0.05, 0.7 + boardCenter[2]],
  ], [boardCenter, boardY]);

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

      {/* 2. FR4 Substrate Board Base (Matte dark technical finish) */}
      <group position={boardCenter}>
        <RoundedBox
          args={[4.6, 0.12, 3.4]}
          radius={0.08}
          position={[0, 0, 0]}
          receiveShadow
          castShadow
        >
          <meshPhysicalMaterial
            color="#2a2e2b"
            roughness={0.7}
            metalness={0.05}
            clearcoat={0.1}
          />
        </RoundedBox>

        {/* Faint ground pour copper border */}
        <mesh position={[0, 0.062, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4.4, 3.2]} />
          <meshBasicMaterial color="#363d37" transparent opacity={0.6} />
        </mesh>

        {/* Mounting holes with solder pad rings */}
        {[
          [-2.1, -1.5], [2.1, -1.5], [-2.1, 1.5], [2.1, 1.5],
        ].map(([hx, hz], idx) => (
          <group key={idx} position={[hx, 0.064, hz]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.07, 0.14, 24]} />
              <meshBasicMaterial color="#b08a68" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.068, 20]} />
              <meshBasicMaterial color="#1a1c1a" />
            </mesh>
          </group>
        ))}
      </group>

      {/* 3. SMD Components on PCB */}
      {/* IC U1: DRV8848 Dual H-Bridge Motor Driver (TSSOP-16 package) */}
      <group position={[0.2 + boardCenter[0], boardY + 0.12, 0.05 + boardCenter[2]]}>
        {/* IC Body */}
        <RoundedBox args={[0.62, 0.08, 0.88]} radius={0.02} castShadow>
          <meshPhysicalMaterial color="#1f211f" roughness={0.4} metalness={0.2} />
        </RoundedBox>
        {/* Pin 1 index dot */}
        <mesh position={[-0.22, 0.045, -0.34]}>
          <circleGeometry args={[0.035, 16]} rotation={[-Math.PI / 2, 0, 0]} />
          <meshBasicMaterial color="#dcdad4" />
        </mesh>
        {/* TSSOP Leads (solder legs) */}
        {[-0.32, -0.22, -0.12, -0.02, 0.08, 0.18, 0.28].map((z, idx) => (
          <React.Fragment key={idx}>
            <mesh position={[-0.36, -0.02, z]}>
              <boxGeometry args={[0.1, 0.02, 0.045]} />
              <meshBasicMaterial color="#b08a68" />
            </mesh>
            <mesh position={[0.36, -0.02, z]}>
              <boxGeometry args={[0.1, 0.02, 0.045]} />
              <meshBasicMaterial color="#b08a68" />
            </mesh>
          </React.Fragment>
        ))}
      </group>
      <TelemetryLabel
        position={[0.2 + boardCenter[0], boardY + 0.28, 0.05 + boardCenter[2]]}
        label="U1 / DRV8848"
        value="DUAL H-BRIDGE MOTOR DRIVER"
        fontSize={0.068}
        color="#2D302D"
        valueColor="#b98569"
        opacity={0.85}
      />

      {/* C_BULK: High-capacitance Bulk Filter (Electrolytic can) */}
      <group position={[-1.2 + boardCenter[0], boardY + 0.22, -1.1 + boardCenter[2]]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.38, 24]} />
          <meshPhysicalMaterial color="#3a3d3a" roughness={0.3} metalness={0.4} />
        </mesh>
        {/* Polarity stripe */}
        <mesh position={[0.18, 0, 0]}>
          <boxGeometry args={[0.06, 0.38, 0.08]} />
          <meshBasicMaterial color="#c75050" />
        </mesh>
      </group>
      <TelemetryLabel
        position={[-1.2 + boardCenter[0], boardY + 0.48, -1.1 + boardCenter[2]]}
        label="C_BULK / 100μF 25V"
        value="LOW-ESR MOTOR DECOUPLING"
        fontSize={0.058}
        opacity={0.65}
      />

      {/* R_SENSE A & B (Current Sense Resistors - 1206 footprints) */}
      <group position={[0.1 + boardCenter[0], boardY + 0.09, -0.7 + boardCenter[2]]}>
        <mesh position={[-0.15, 0, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.24]} />
          <meshPhysicalMaterial color="#343536" roughness={0.4} />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <boxGeometry args={[0.12, 0.04, 0.24]} />
          <meshPhysicalMaterial color="#343536" roughness={0.4} />
        </mesh>
      </group>
      <TelemetryLabel
        position={[0.1 + boardCenter[0], boardY + 0.22, -0.7 + boardCenter[2]]}
        label="R_SENSE / 0.20Ω"
        value="ISENSE FEEDBACK TO MCU ADC"
        fontSize={0.058}
        opacity={0.7}
      />

      {/* J1: Motor Output Screw Terminal Block */}
      <group position={[1.9 + boardCenter[0], boardY + 0.22, 0.55 + boardCenter[2]]}>
        <RoundedBox args={[0.38, 0.32, 1.1]} radius={0.04} castShadow>
          <meshPhysicalMaterial color="#507050" roughness={0.5} />
        </RoundedBox>
        {/* Terminal wire holes */}
        {[-0.35, -0.12, 0.12, 0.35].map((z, idx) => (
          <mesh key={idx} position={[-0.08, 0.06, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.06, 0.06, 0.22, 16]} />
            <meshBasicMaterial color="#1a1c1a" />
          </mesh>
        ))}
      </group>
      <TelemetryLabel
        position={[1.9 + boardCenter[0], boardY + 0.46, 0.55 + boardCenter[2]]}
        label="J1 / MOTOR A & B"
        value="TERMINAL BLOCK OUT1..OUT4"
        fontSize={0.062}
        color="#2D302D"
        valueColor="#50a050"
        opacity={0.8}
      />

      {/* J_MCU: Logic Input Header */}
      <group position={[-1.7 + boardCenter[0], boardY + 0.15, 1.0 + boardCenter[2]]}>
        {/* Header strip base */}
        <mesh position={[0, -0.04, 0]}>
          <boxGeometry args={[0.18, 0.08, 0.95]} />
          <meshBasicMaterial color="#1a1c1a" />
        </mesh>
        {/* Header gold pins */}
        {[-0.36, -0.24, -0.12, 0, 0.12, 0.24, 0.36].map((z, idx) => (
          <mesh key={idx} position={[0, 0.08, z]}>
            <boxGeometry args={[0.025, 0.16, 0.025]} />
            <meshBasicMaterial color="#b08a68" />
          </mesh>
        ))}
      </group>
      <TelemetryLabel
        position={[-1.7 + boardCenter[0], boardY + 0.36, 1.0 + boardCenter[2]]}
        label="J_MCU / 3.3V LOGIC"
        value="PWM1..PWM4 · nSLEEP · nFAULT"
        fontSize={0.058}
        opacity={0.7}
      />

      {/* 4. Copper Traces (High-visibility routed lines) */}
      {copperTraces.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={i === 0 ? '#b98569' : i <= 2 ? '#b08a68' : '#889e8b'}
          lineWidth={i === 0 ? 3.8 : 2.4}
          transparent
          opacity={0.85}
        />
      ))}

      {/* 5. Plated Vias */}
      {vias.map((pt, i) => (
        <group key={i} position={pt}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.025, 0.055, 16]} />
            <meshBasicMaterial color="#b08a68" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.024, 12]} />
            <meshBasicMaterial color="#1a1c1a" />
          </mesh>
        </group>
      ))}

      {/* 6. Animated Current Flow DataPulses */}
      <DataPulse
        path={vmTracePath}
        speed={0.65}
        color="#c75050"
        size={0.045}
        opacity={0.85}
        glowColor="#c75050"
        reduced={reduced}
      />
      <DataPulse
        path={motorAOutPath}
        speed={0.75}
        color="#b98569"
        size={0.04}
        opacity={0.85}
        glowColor="#b98569"
        reduced={reduced}
      />
      <DataPulse
        path={pwmInPath}
        speed={0.55}
        color="#50a050"
        size={0.038}
        opacity={0.85}
        glowColor="#50a050"
        reduced={reduced}
      />

      {/* 7. Hardware Engineering Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / EMBEDDED HARDWARE"
          value="Custom Dual Motor Driver PCB"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="POWER STAGE"
          value="VM = 12V Nominal · 2.0A RMS Per Bridge"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="THERMAL & PROTECTION"
          value="OCP · TSD · UVLO · FAULT INTERRUPT"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="DESIGN MATURITY"
          value="REFERENCE DESIGN · CAD CAPTURE COMPLETE"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
