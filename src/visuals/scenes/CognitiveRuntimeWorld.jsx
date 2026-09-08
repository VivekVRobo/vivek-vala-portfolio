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
 * CognitiveRuntimeWorld — V7 Scientific Visualization (Phase 9 Full Portfolio)
 * 
 * Distinct identity from JARVIS DAG: Layered cognitive stack with
 * tiered translucent planes representing the embodiment runtime:
 * 
 * 1. Persona & Narrative Grounding Layer (Rose accent)
 * 2. Planner & Episodic Memory Layer (Fog Blue accent)
 * 3. Capability & Tool Registry Plane (Sage accent)
 * 4. Embodiment Boundary & Perception Interface
 * 5. Vertical cognition signals and feedback loops
 * 6. Scientific telemetry HUD (Multi-layer runtime, grounding, episodic state)
 */

export default function CognitiveRuntimeWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const stackRef = useRef();

  // Tiered cognitive layers (Y offsets in 3D space)
  const layers = useMemo(() => [
    {
      id: 'persona',
      label: 'TIER 01 / PERSONA & ALIGNMENT',
      desc: 'Narrative Identity · Ethical Constraints · Prompt Grounding',
      y: 0.95,
      color: '#c7a29a',
      borderColor: '#b08a68',
      nodes: [
        { label: 'IDENTITY CORE', pos: [-0.6, 0.95, -0.4] },
        { label: 'CONSTRAINT ENGINE', pos: [0.6, 0.95, -0.4] },
      ],
    },
    {
      id: 'planner',
      label: 'TIER 02 / PLANNER & WORKING MEMORY',
      desc: 'Hierarchical Task Decomposition · Episodic Vector Store',
      y: 0.15,
      color: '#a9bbc4',
      borderColor: '#7a8e99',
      nodes: [
        { label: 'DYNAMIC PLANNER', pos: [-0.8, 0.15, 0.0] },
        { label: 'VECTOR MEMORY', pos: [0.0, 0.15, -0.3] },
        { label: 'CONTEXT WINDOW', pos: [0.8, 0.15, 0.0] },
      ],
    },
    {
      id: 'registry',
      label: 'TIER 03 / CAPABILITY REGISTRY',
      desc: 'Tool Dispatch · API Handlers · Sub-agent Executor',
      y: -0.65,
      color: '#9aa596',
      borderColor: '#6e7a6a',
      nodes: [
        { label: 'TOOL EXECUTION', pos: [-0.7, -0.65, 0.3] },
        { label: 'HARDWARE BUS', pos: [0.7, -0.65, 0.3] },
      ],
    },
  ], []);

  // Vertical cognitive signal paths
  const verticalPaths = useMemo(() => [
    [[-0.6, 0.95, -0.4], [-0.8, 0.15, 0.0], [-0.7, -0.65, 0.3]],
    [[0.6, 0.95, -0.4], [0.8, 0.15, 0.0], [0.7, -0.65, 0.3]],
    [[0.0, 0.15, -0.3], [0.0, -1.2, 0.0]],
  ], []);

  // Subtle floating oscillation
  useFrame((state) => {
    if (reduced || !stackRef.current) return;
    stackRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.03;
    stackRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
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

      <group ref={stackRef} position={[0.6, 0, 0]}>
        {/* 2. Tiered Translucent Planes */}
        {layers.map((layer) => (
          <group key={layer.id} position={[0, layer.y, 0]}>
            {/* Plane plate */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[3.6, 2.2]} />
              <meshPhysicalMaterial
                color={layer.color}
                transparent
                opacity={0.12}
                roughness={0.2}
                metalness={0.1}
                clearcoat={0.3}
                depthWrite={false}
              />
            </mesh>

            {/* Perimeter bounding wire */}
            <Line
              points={[
                [-1.8, 0, -1.1],
                [1.8, 0, -1.1],
                [1.8, 0, 1.1],
                [-1.8, 0, 1.1],
                [-1.8, 0, -1.1],
              ]}
              color={layer.borderColor}
              lineWidth={1.2}
              transparent
              opacity={0.5}
            />

            {/* Layer Header Label */}
            <TelemetryLabel
              position={[-1.75, 0.08, -1.05]}
              label={layer.label}
              value={layer.desc}
              fontSize={0.052}
              color="#2D302D"
              valueColor="#6a6b65"
              opacity={0.85}
            />

            {/* Layer Core Functional Nodes */}
            {layer.nodes.map((n, idx) => (
              <group key={idx} position={[n.pos[0], 0.04, n.pos[2]]}>
                <mesh>
                  <cylinderGeometry args={[0.12, 0.14, 0.06, 20]} />
                  <meshPhysicalMaterial
                    color="#fffdf8"
                    roughness={0.4}
                    metalness={0.1}
                  />
                </mesh>
                <TelemetryLabel
                  position={[0, 0.12, 0]}
                  label={n.label}
                  fontSize={0.048}
                  color="#2D302D"
                  opacity={0.85}
                />
              </group>
            ))}
          </group>
        ))}

        {/* 3. Vertical Signal Connecting Lines */}
        {verticalPaths.map((path, idx) => (
          <Line
            key={idx}
            points={path}
            color="#b98569"
            lineWidth={1.4}
            dashed
            dashScale={0.05}
            transparent
            opacity={0.45}
          />
        ))}

        {/* 4. Cognitive Signal Pulses traveling through layers */}
        <DataPulse
          path={verticalPaths[0]}
          speed={0.5}
          color="#c7a29a"
          size={0.042}
          opacity={0.9}
          glowColor="#c7a29a"
          reduced={reduced}
        />
        <DataPulse
          path={verticalPaths[1]}
          speed={0.6}
          color="#a9bbc4"
          size={0.042}
          opacity={0.9}
          glowColor="#a9bbc4"
          reduced={reduced}
        />
      </group>

      {/* 5. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / COGNITIVE RUNTIME"
          value="Aurelia Autonomous Embodiment"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="ALIGNMENT & MEMORY"
          value="Persistent Persona · Episodic Knowledge Graph"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="DISPATCH RUNTIME"
          value="MULTI-AGENT STATE MACHINE · TOOL ROUTING"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="ACTIVE MULTI-MODAL PROTOTYPE"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
