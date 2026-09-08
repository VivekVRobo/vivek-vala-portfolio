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
 * ProtocolRuntimeWorld — V7 Scientific Visualization (Phase 11 Full Portfolio)
 * 
 * Replaces generic floating tower blocks with an authoritative network protocol
 * architecture visualization comparing Epoll event loops and Thread Pools:
 * 
 * 1. Dual concurrency architecture: Non-blocking Epoll Reactor vs Thread Pool
 * 2. Protocol state machine: TCP Socket → Zero-Copy Parser → Routing → Response
 * 3. Animated packet pulses flowing through both I/O models
 * 4. High-performance event ring and worker queues
 * 5. Scientific telemetry HUD (C++20, Edge-triggered Epoll, zero-copy buffer)
 */

export default function ProtocolRuntimeWorld({
  position = [0, 0, -2],
  scale = 1,
  reduced = false,
}) {
  const protocolRef = useRef();

  // Paths for animated packets
  // Lane 1: Non-blocking Epoll Event Loop (Upper channel)
  const epollPath = useMemo(() => [
    [-2.2, 0.45, 0.2],
    [-1.2, 0.45, 0.2],
    [-0.2, 0.75, 0.15],
    [0.9, 0.75, 0.1],
    [1.9, 0.45, 0.05],
  ], []);

  // Lane 2: Worker Thread Pool (Lower channel)
  const threadPath = useMemo(() => [
    [-2.2, -0.45, 0.1],
    [-1.2, -0.45, 0.1],
    [-0.2, -0.75, 0.05],
    [0.9, -0.75, 0.0],
    [1.9, -0.45, -0.05],
  ], []);

  useFrame((state) => {
    if (reduced || !protocolRef.current) return;
    protocolRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
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

      <group ref={protocolRef}>
        {/* 2. Pipeline Guide Rails */}
        <Line points={epollPath} color="#5070c0" lineWidth={1.8} transparent opacity={0.65} />
        <Line points={threadPath} color="#b98569" lineWidth={1.8} transparent opacity={0.65} />

        {/* 3. Ingress Socket Stage */}
        <group position={[-1.8, 0, 0.15]}>
          <RoundedBox args={[0.9, 1.45, 0.1]} radius={0.05} castShadow>
            <meshPhysicalMaterial color="#fffdf8" roughness={0.4} metalness={0.1} />
          </RoundedBox>
          <TelemetryLabel
            position={[-0.38, 0.48, 0.06]}
            label="INGRESS / TCP SOCKET"
            value="PORT 8080 · NON-BLOCKING"
            fontSize={0.048}
            color="#2D302D"
            valueColor="#5070c0"
            opacity={0.9}
          />
        </group>

        {/* 4. Upper Channel: Epoll Event Reactor */}
        <group position={[0.35, 0.75, 0.12]}>
          <RoundedBox args={[1.5, 0.55, 0.1]} radius={0.05} castShadow>
            <meshPhysicalMaterial color="#fffdf8" roughness={0.4} metalness={0.1} />
          </RoundedBox>
          <mesh position={[-0.65, 0.14, 0.055]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color="#5070c0" />
          </mesh>
          <TelemetryLabel
            position={[-0.56, 0.12, 0.06]}
            label="MODEL A: EPOLL REACTOR"
            value="Edge-Triggered (EPOLLET) · O(1) Multiplex"
            fontSize={0.048}
            color="#2D302D"
            valueColor="#5070c0"
            opacity={0.9}
          />
        </group>

        {/* 5. Lower Channel: Worker Thread Pool */}
        <group position={[0.35, -0.75, 0.02]}>
          <RoundedBox args={[1.5, 0.55, 0.1]} radius={0.05} castShadow>
            <meshPhysicalMaterial color="#fffdf8" roughness={0.4} metalness={0.1} />
          </RoundedBox>
          <mesh position={[-0.65, 0.14, 0.055]}>
            <circleGeometry args={[0.025, 16]} />
            <meshBasicMaterial color="#b98569" />
          </mesh>
          <TelemetryLabel
            position={[-0.56, 0.12, 0.06]}
            label="MODEL B: THREAD POOL"
            value="N = 8 Pthread Workers · Mutex Job Queue"
            fontSize={0.048}
            color="#2D302D"
            valueColor="#b98569"
            opacity={0.9}
          />
        </group>

        {/* 6. Zero-Copy Parser & Serializer Egress */}
        <group position={[2.0, 0, 0.0]}>
          <RoundedBox args={[0.9, 1.45, 0.1]} radius={0.05} castShadow>
            <meshPhysicalMaterial color="#fffdf8" roughness={0.4} metalness={0.1} />
          </RoundedBox>
          <TelemetryLabel
            position={[-0.38, 0.48, 0.06]}
            label="EGRESS / HTTP SINK"
            value="200 OK · ZERO-COPY writev()"
            fontSize={0.048}
            color="#2D302D"
            valueColor="#50a050"
            opacity={0.9}
          />
        </group>

        {/* 7. Animated Network Packet Pulses */}
        <DataPulse
          path={epollPath}
          speed={0.7}
          color="#5070c0"
          size={0.042}
          opacity={0.9}
          glowColor="#5070c0"
          reduced={reduced}
        />
        <DataPulse
          path={threadPath}
          speed={0.55}
          color="#b98569"
          size={0.042}
          opacity={0.9}
          glowColor="#b98569"
          reduced={reduced}
        />
      </group>

      {/* 8. Subsystem Telemetry HUD */}
      <group position={[2.6, 0.6, -1.8]}>
        <TelemetryLabel
          position={[0, 0.35, 0]}
          label="SUBSYSTEM / PROTOCOL RUNTIME"
          value="C++20 Zero-Dependency HTTP Server"
          fontSize={0.08}
          color="#2D302D"
          valueColor="#4a4d4a"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, 0.12, 0]}
          label="CONCURRENCY ARCHITECTURE"
          value="Linux Epoll Multiplexing vs Thread Worker Pool"
          fontSize={0.065}
          opacity={0.65}
        />
        <TelemetryLabel
          position={[0, -0.08, 0]}
          label="MEMORY MANAGEMENT"
          value="ZERO-COPY PARSER · RING BUFFER BUILTINS"
          fontSize={0.065}
          color="#50a050"
          valueColor="#50a050"
          opacity={0.8}
        />
        <TelemetryLabel
          position={[0, -0.28, 0]}
          label="EVIDENCE BOUNDARY"
          value="WRITTEN FROM SCRATCH WITH POSIX SOCKETS"
          fontSize={0.06}
          color="#b98569"
          valueColor="#8f634b"
          opacity={0.7}
        />
      </group>
    </group>
  );
}
