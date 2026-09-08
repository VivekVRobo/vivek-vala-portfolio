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
 * SystemDagWorld — V7 Scientific Visualization (Phase 8 Core Portfolio)
 * 
 * Replaces generic glowing AI spheres with an authoritative local-first
 * agent DAG architecture visualization:
 * 
 * 1. 3D Directed Acyclic Graph with 10 functional nodes
 * 2. Ingress → Routing → Planning → Governance → Tools → Egress flow
 * 3. Animated packet pulses through active tool execution paths
 * 4. Human-in-the-loop permission gateway barrier
 * 5. Scientific telemetry HUD (Local-first, governed execution, prototype)
 */

export default function SystemDagWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const dagRef = useRef();

  // 1. DAG Node Definitions (3D coordinates in space)
  const nodes = useMemo(() => [
    // Ingress
    { id: 'audio_in', label: 'AUDIO IN', sub: 'Microphone Stream', pos: [-1.4, 0.55, 0.3], type: 'ingress' },
    { id: 'stt', label: 'STT / WHISPER', sub: 'Local Int8 Engine', pos: [-1.4, -0.15, 0.2], type: 'process' },
    // Core Cognition
    { id: 'router', label: 'INTENT ROUTER', sub: 'Semantic Classification', pos: [-0.1, 0.75, 0.25], type: 'core' },
    { id: 'planner', label: 'PLANNER DAG', sub: 'State & Memory Store', pos: [-0.1, 0.05, 0.15], type: 'core' },
    // Governance Gate
    { id: 'governance', label: 'SECURITY GATE', sub: 'Tool Permission Barrier', pos: [1.2, 0.85, 0.2], type: 'gate' },
    // Tools
    { id: 'browser', label: 'TOOL / BROWSER', sub: 'Playwright CDP Headless', pos: [1.3, 0.25, 0.1], type: 'tool' },
    { id: 'os_exec', label: 'TOOL / OS SHELL', sub: 'Subprocess Controller', pos: [1.3, -0.35, 0.0], type: 'tool' },
    { id: 'mcu_bridge', label: 'TOOL / MCU SERIAL', sub: 'USB-UART 115200 Baud', pos: [1.3, -0.95, -0.1], type: 'tool' },
    // Egress
    { id: 'tts', label: 'TTS / PIPER', sub: 'Low-Latency Neural Speech', pos: [2.5, 0.35, 0.05], type: 'egress' },
    { id: 'audio_out', label: 'AUDIO / UI OUT', sub: 'System Output Stream', pos: [2.5, -0.35, -0.05], type: 'egress' },
  ], []);

  // 2. Directed Connections between nodes
  const connections = useMemo(() => [
    ['audio_in', 'stt'],
    ['stt', 'router'],
    ['router', 'planner'],
    ['planner', 'governance'],
    ['governance', 'browser'],
    ['governance', 'os_exec'],
    ['governance', 'mcu_bridge'],
    ['browser', 'planner'],
    ['os_exec', 'planner'],
    ['mcu_bridge', 'planner'],
    ['planner', 'tts'],
    ['tts', 'audio_out'],
  ], []);

  // Map nodes by id for quick lookup
  const nodeMap = useMemo(() => {
    const map = {};
    nodes.forEach(n => { map[n.id] = n; });
    return map;
  }, [nodes]);

  // 3. Primary execution path for animated DataPulse
  const primaryFlowPath = useMemo(() => [
    nodeMap.audio_in.pos,
    nodeMap.stt.pos,
    nodeMap.router.pos,
    nodeMap.planner.pos,
    nodeMap.governance.pos,
    nodeMap.os_exec.pos,
    nodeMap.planner.pos,
    nodeMap.tts.pos,
    nodeMap.audio_out.pos,
  ], [nodeMap]);

  // Subtle floating animation
  useFrame((state) => {
    if (reduced || !dagRef.current) return;
    dagRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.025;
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

      <group ref={dagRef}>
        {/* 2. DAG Connection Edges */}
        {connections.map(([fromId, toId], idx) => {
          const fromNode = nodeMap[fromId];
          const toNode = nodeMap[toId];
          if (!fromNode || !toNode) return null;

          const isToolReturn = toId === 'planner' && (fromId === 'browser' || fromId === 'os_exec' || fromId === 'mcu_bridge');

          return (
            <Line
              key={idx}
              points={[fromNode.pos, toNode.pos]}
              color={isToolReturn ? '#a9bbc4' : '#6a6b65'}
              lineWidth={isToolReturn ? 1.0 : 1.6}
              dashed={isToolReturn}
              dashScale={0.04}
              transparent
              opacity={isToolReturn ? 0.4 : 0.65}
            />
          );
        })}

        {/* 3. Animated Data Flow Packet Pulse */}
        <DataPulse
          path={primaryFlowPath}
          speed={0.45}
          color="#b98569"
          size={0.045}
          opacity={0.9}
          glowColor="#b98569"
          reduced={reduced}
        />

        {/* 4. DAG Nodes (Technical chips with status LEDs) */}
        {nodes.map((node) => {
          const isCore = node.type === 'core';
          const isGate = node.type === 'gate';
          const isTool = node.type === 'tool';

          const chipColor = isCore ? '#2D302D' : isGate ? '#b98569' : isTool ? '#363d37' : '#f4f0e8';
          const textColor = isCore || isGate || isTool ? '#fffdf8' : '#2D302D';
          const subColor = isCore || isGate || isTool ? '#dcdad4' : '#6a6b65';

          return (
            <group key={node.id} position={node.pos}>
              {/* Chip body */}
              <RoundedBox args={[0.92, 0.36, 0.08]} radius={0.04} castShadow>
                <meshPhysicalMaterial
                  color={chipColor}
                  roughness={0.4}
                  metalness={0.15}
                />
              </RoundedBox>

              {/* Status LED */}
              <mesh position={[-0.36, 0.08, 0.045]}>
                <circleGeometry args={[0.024, 16]} />
                <meshBasicMaterial
                  color={isGate ? '#b98569' : '#50a050'}
                  transparent
                  opacity={0.9}
                />
              </mesh>

              {/* Node Title & Subtitle */}
              <TelemetryLabel
                position={[-0.28, 0.04, 0.05]}
                label={node.label}
                value={node.sub}
                fontSize={0.05}
                color={textColor}
                valueColor={subColor}
                opacity={0.95}
              />
            </group>
          );
        })}

        {/* 5. Security Governance Boundary Box */}
        <group position={[1.25, 0.0, 0.05]}>
          <Line
            points={[
              [-0.2, 1.15, 0],
              [0.85, 1.15, 0],
              [0.85, -1.25, 0],
              [-0.2, -1.25, 0],
              [-0.2, 1.15, 0],
            ]}
            color="#b98569"
            lineWidth={1.2}
            dashed
            dashScale={0.05}
            transparent
            opacity={0.5}
          />
          <TelemetryLabel
            position={[-0.15, 1.25, 0]}
            label="GOVERNED EXECUTION BOUNDARY"
            value="HUMAN CONFIRMATION REQUIRED FOR WRITE OPS"
            fontSize={0.052}
            color="#b98569"
            opacity={0.85}
          />
        </group>
      </group>

      {/* 6. System Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / LOCAL AGENT RUNTIME"
          value="JARVIS Autonomous Assistant"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="EXECUTION TOPOLOGY"
          value="Governed Directed Acyclic Graph (DAG)"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="PRIVACY & INFERENCE"
          value="LOCAL INFERENCE · NO EXTERNAL CLOUD TELEMETRY"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="WORKING PYTHON/RUST DESKTOP PROTOTYPE"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
