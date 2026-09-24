import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useScrollProgress } from '../../hooks/useScrollProgress';

export const P = {
  ivory: '#f4f0e8',
  white: '#fffdf8',
  sand: '#d7c7ae',
  sage: '#9aa596',
  sky: '#a9bbc4',
  clay: '#b98569',
  rose: '#c7a29a',
  graphite: '#343536',
  deep: '#252725',
};

export function Mat({ color, roughness = 0.55, metalness = 0.06, transparent = false, opacity = 1, clearcoat = 0.06 }) {
  return <meshPhysicalMaterial color={color} roughness={roughness} metalness={metalness} transparent={transparent} opacity={opacity} clearcoat={clearcoat} clearcoatRoughness={0.6} />;
}

export function Ground({ color = P.ivory, size = 8, y = -2.5 }) {
  return <mesh position={[0, y, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <circleGeometry args={[size, 80]} />
    <Mat color={color} roughness={0.94} />
  </mesh>;
}

export function Pedestal({ position = [0, -2, 0], size = [4.2, 0.3, 4.2], color = P.ivory, radius = 0.12 }) {
  return <RoundedBox args={size} radius={radius} position={position} receiveShadow castShadow>
    <Mat color={color} roughness={0.86} metalness={0.02} />
  </RoundedBox>;
}

export function Portal({ position = [0, 0, 0], color = P.sand, scale = 1, rotation = [0, 0, 0] }) {
  return <group position={position} scale={scale} rotation={rotation}>
    <mesh castShadow>
      <torusGeometry args={[2.5, 0.08, 24, 180]} />
      <Mat color={color} roughness={0.28} metalness={0.16} clearcoat={0.18} />
    </mesh>
    <mesh scale={0.92}>
      <torusGeometry args={[2.5, 0.016, 12, 160]} />
      <meshBasicMaterial color={P.deep} transparent opacity={0.12} />
    </mesh>
    <mesh position={[0, -2.55, 0]}>
      <cylinderGeometry args={[2.85, 3.15, 0.24, 64]} />
      <Mat color={P.ivory} roughness={0.92} />
    </mesh>
  </group>;
}

export function SceneDust({ count = 22, spread = 8, tint = P.sky }) {
  const points = useMemo(() => Array.from({ length: count }, (_, i) => {
    const a = i * 2.399963;
    const r = 1.2 + (i % 6) * 0.65;
    return [Math.cos(a) * r, -0.7 + (i % 7) * 0.38, -1.2 - Math.sin(a) * spread * 0.22];
  }), [count, spread]);

  return <group>
    {points.map((position, i) => <Float key={i} speed={0.35 + (i % 4) * 0.08} floatIntensity={0.16} rotationIntensity={0.08}>
      <mesh position={position}>
        <sphereGeometry args={[0.03 + (i % 3) * 0.012, 10, 10]} />
        <meshBasicMaterial color={i % 3 === 0 ? tint : P.sand} transparent opacity={0.14 + (i % 3) * 0.05} />
      </mesh>
    </Float>)}
  </group>;
}

export function SlamRobot({ position = [0, -0.6, 0], scale = 1 }) {
  return <group position={position} scale={scale} rotation={[0, 0.26, 0]}>
    <RoundedBox args={[2.65, 0.34, 1.72]} radius={0.16} position={[0, 0.12, 0]} castShadow receiveShadow><Mat color={P.white} roughness={0.28} /></RoundedBox>
    <RoundedBox args={[2.05, 0.24, 1.2]} radius={0.14} position={[0, 0.34, 0]} castShadow><Mat color={P.ivory} roughness={0.32} /></RoundedBox>
    <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.18, 0.18, 0.78, 28]} /><Mat color={P.graphite} roughness={0.42} metalness={0.18} /></mesh>
    <mesh position={[0, 1.27, 0]} castShadow><cylinderGeometry args={[0.43, 0.43, 0.18, 40]} /><Mat color={P.deep} roughness={0.36} metalness={0.18} /></mesh>
    <mesh position={[0, 1.29, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.33, 0.028, 10, 80]} /><meshBasicMaterial color={P.sky} transparent opacity={0.48} /></mesh>
    <mesh position={[0, 0.42, 0.83]} castShadow><boxGeometry args={[0.75, 0.18, 0.12]} /><Mat color={P.graphite} roughness={0.35} /></mesh>
    {[-1, 1].flatMap((x) => [-1, 1].map((z) => [x * 1.03, -0.12, z * 0.82])).map((p, i) => <mesh key={i} position={p} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.32, 0.32, 0.2, 22]} /><Mat color={P.deep} roughness={0.74} metalness={0.02} /></mesh>)}
  </group>;
}

export function SlamWorld({ position = [0, 0, -2], scale = 1 }) {
  const rays = useMemo(() => Array.from({ length: 42 }, (_, i) => {
    const angle = (i / 42) * Math.PI * 2;
    const radius = 2.4 + (i % 6) * 0.18;
    return [[0, 0.58, 0], [Math.cos(angle) * radius, 0.58 + (i % 3) * 0.04, Math.sin(angle) * radius]];
  }), []);

  return <group position={position} scale={scale}>
    <Ground color={P.ivory} size={7.2} y={-2.25} />
    <Pedestal position={[0, -2.06, 0]} size={[7.6, 0.28, 5.2]} color={P.white} />
    {[[0, 0.45, -3.2, 7.2, 2.85], [-3.55, 0.45, -0.2, 0.18, 2.85], [3.55, 0.45, -0.2, 0.18, 2.85]].map(([x, y, z, w, h], i) => <RoundedBox key={i} args={[w, h, 0.18]} radius={0.05} position={[x, y - 0.4, z]} rotation={[0, i === 0 ? 0 : (i === 1 ? 0.22 : -0.22), 0]}><Mat color={i === 0 ? P.sand : P.white} roughness={0.9} /></RoundedBox>)}
    <SlamRobot position={[-0.2, -1.35, 0.35]} />
    {rays.map((points, i) => <Line key={i} points={points} position={[-0.2, -0.75, 0.35]} color={i % 2 === 0 ? P.sky : P.sage} lineWidth={0.5} transparent opacity={0.15} />)}
    <Line points={[[-2.7, -1.92, 1.4], [-1.35, -1.92, 0.75], [0.05, -1.92, 0.42], [1.22, -1.92, -0.22], [2.45, -1.92, -1.1]]} color={P.clay} lineWidth={2.2} />
    <SceneDust spread={10} />
  </group>;
}

export function ArmAssembly({ position = [0, -1.2, 0], scale = 1 }) {
  return <group position={position} scale={scale} rotation={[0, 0.42, 0]}>
    <mesh position={[0, 0.2, 0]} castShadow><cylinderGeometry args={[1.35, 1.5, 0.26, 48]} /><Mat color={P.sand} roughness={0.82} /></mesh>
    <mesh position={[0, 0.85, 0]} castShadow><cylinderGeometry args={[0.42, 0.52, 0.92, 32]} /><Mat color={P.ivory} roughness={0.35} /></mesh>
    <mesh position={[0, 1.38, 0]} castShadow><sphereGeometry args={[0.42, 28, 28]} /><Mat color={P.graphite} metalness={0.2} roughness={0.34} /></mesh>
    <group position={[0, 1.38, 0]} rotation={[0, 0, -0.64]}>
      <RoundedBox args={[0.52, 2.6, 0.52]} radius={0.08} position={[0, 1.32, 0]} castShadow><Mat color={P.white} roughness={0.38} /></RoundedBox>
      <mesh position={[0, 2.62, 0]} castShadow><sphereGeometry args={[0.36, 26, 26]} /><Mat color={P.graphite} metalness={0.18} roughness={0.34} /></mesh>
      <group position={[0, 2.62, 0]} rotation={[0, 0, 1.02]}>
        <RoundedBox args={[0.42, 1.96, 0.42]} radius={0.08} position={[0, 0.95, 0]} castShadow><Mat color={P.sky} roughness={0.42} /></RoundedBox>
        <mesh position={[0, 1.84, 0]} castShadow><sphereGeometry args={[0.22, 22, 22]} /><Mat color={P.graphite} metalness={0.22} /></mesh>
        <mesh position={[-0.24, 2.18, 0]} rotation={[0, 0, -0.34]} castShadow><boxGeometry args={[0.12, 0.92, 0.22]} /><Mat color={P.deep} /></mesh>
        <mesh position={[0.24, 2.18, 0]} rotation={[0, 0, 0.34]} castShadow><boxGeometry args={[0.12, 0.92, 0.22]} /><Mat color={P.deep} /></mesh>
      </group>
    </group>
  </group>;
}

export function ArmWorld({ gesture = false, position = [0, 0, -2] }) {
  return <group position={position}>
    <Ground color={P.sand} size={6.8} y={-2.5} />
    <Pedestal position={[0, -2.1, 0]} size={[7.2, 0.28, 4.8]} color={P.ivory} />
    <RoundedBox args={[5.9, 0.06, 3.2]} radius={0.06} position={[0, -1.75, 0]}><Mat color={P.white} roughness={0.7} /></RoundedBox>
    {[-2.8, 2.8].map((x, i) => <mesh key={x} position={[x, 0.25, -0.8]} rotation={[0, i ? -0.18 : 0.18, 0]}><boxGeometry args={[0.1, 4.3, 1.8]} /><Mat color={P.white} roughness={0.9} /></mesh>)}
    <ArmAssembly position={[-0.55, -1.4, 0.1]} scale={0.94} />
    <mesh position={[2.35, -1.65, 0.8]} castShadow><boxGeometry args={[0.7, 0.7, 0.7]} /><Mat color={P.clay} roughness={0.58} /></mesh>
    <Line points={[[2.35, -1.3, 0.8], [1.4, -0.42, 0.5], [0.5, 0.82, 0.18]]} color={P.clay} lineWidth={1.25} transparent opacity={0.5} />
    {gesture && <>
      <group position={[2.65, 1.2, 0.4]}>
        <mesh position={[-0.22, -0.4, 0]} rotation={[0, 0, -0.16]}><boxGeometry args={[0.8, 0.96, 0.26]} /><Mat color={P.ivory} roughness={0.58} /></mesh>
        {[0, 1, 2, 3].map((i) => <mesh key={i} position={[i * 0.18 - 0.28, i * 0.24, 0]}><sphereGeometry args={[0.12, 14, 14]} /><Mat color={P.rose} roughness={0.36} /></mesh>)}
      </group>
      {[2.05, 2.55, 3.05].map((r, i) => <mesh key={r} position={[1.08, 0.82, 0.3]} rotation={[Math.PI / 2, 0, 0.34]}><torusGeometry args={[r * 0.46, 0.016, 10, 90, Math.PI * 1.02]} /><meshBasicMaterial color={[P.clay, P.sky, P.sage][i]} transparent opacity={0.28} /></mesh>)}
    </>}
    <SceneDust tint={P.clay} />
  </group>;
}

export function PcbWorld({ position = [0, 0, -2] }) {
  const traces = [
    [[-2.55, 0, -1.55], [-1.4, 0, -1.55], [-1.4, 0, -0.1], [0.1, 0, -0.1], [0.95, 0, 0.75]],
    [[2.35, 0, 1.45], [1.15, 0, 1.45], [1.15, 0, 0.45], [-0.45, 0, 0.45]],
    [[-2.2, 0, 1.2], [-0.95, 0, 1.2], [-0.95, 0, 2.05]],
    [[1.8, 0, -1.35], [0.55, 0, -1.35], [0.55, 0, -2.05]],
  ];

  return <group position={position}>
    <Ground color={P.ivory} size={7.2} y={-2.5} />
    <Pedestal position={[0, -2.06, 0]} size={[8, 0.28, 5.5]} color={P.white} />
    <group rotation={[-0.11, -0.22, 0.04]} position={[0, -1.28, 0]}>
      <RoundedBox args={[6.55, 0.22, 4.6]} radius={0.14} castShadow receiveShadow><Mat color={P.sage} roughness={0.48} /></RoundedBox>
      <RoundedBox args={[1.75, 0.26, 1.12]} radius={0.08} position={[-1.05, 0.22, -0.35]}><Mat color={P.deep} roughness={0.3} metalness={0.12} /></RoundedBox>
      <RoundedBox args={[1.08, 0.22, 0.86]} radius={0.06} position={[1.72, 0.22, 0.86]}><Mat color={P.ivory} roughness={0.48} /></RoundedBox>
      <RoundedBox args={[0.7, 0.24, 1.3]} radius={0.06} position={[0.52, 0.22, -1.15]}><Mat color={P.graphite} roughness={0.36} /></RoundedBox>
      {traces.map((points, i) => <Line key={i} points={points.map(([x, y, z]) => [x, y + 0.14, z])} color={i % 2 === 0 ? P.sand : P.clay} lineWidth={2.8} />)}
      {[-2.45, -1.85, -1.25, 1.05, 1.65, 2.25].map((x, i) => <mesh key={i} position={[x, 0.22, 1.85]}><cylinderGeometry args={[0.14, 0.14, 0.42, 16]} /><Mat color={i % 2 ? P.white : P.graphite} roughness={0.4} /></mesh>)}
      {[-2.55, -1.95, -1.35, -0.75, -0.15, 0.45, 1.05, 1.65, 2.25].map((x, i) => <mesh key={i} position={[x, 0.22, -1.95]}><boxGeometry args={[0.18, 0.18, 0.42]} /><Mat color={i % 2 ? P.ivory : P.graphite} roughness={0.48} /></mesh>)}
    </group>
    {[-4.15, 4.15].map((x) => <mesh key={x} position={[x, -0.92, 0]}><cylinderGeometry args={[0.72, 0.72, 2.35, 32]} /><Mat color={P.sand} metalness={0.12} roughness={0.76} /></mesh>)}
    <SceneDust tint={P.sage} />
  </group>;
}

export function IntelligenceCore({ position = [0, 0, 0], scale = 1, rose = false }) {
  const nodes = useMemo(() => Array.from({ length: 18 }, (_, i) => {
    const a = i * 2.399;
    const r = 1.5 + (i % 4) * 0.42;
    return [Math.cos(a) * r, ((i % 6) - 2.5) * 0.42, Math.sin(a) * r];
  }), []);

  return <group position={position} scale={scale}>
    <Float speed={0.9} floatIntensity={0.22} rotationIntensity={0.08}>
      <mesh castShadow><sphereGeometry args={[1.42, 48, 48]} /><Mat color={rose ? P.rose : P.ivory} roughness={0.18} metalness={0.1} clearcoat={0.18} /></mesh>
      <mesh scale={1.15}><icosahedronGeometry args={[1.45, 2]} /><meshBasicMaterial color={P.deep} wireframe transparent opacity={0.12} /></mesh>
    </Float>
    {nodes.map((p, i) => <React.Fragment key={i}>
      <mesh position={p}><sphereGeometry args={[0.07 + (i % 3) * 0.018, 10, 10]} /><Mat color={rose ? [P.rose, P.sand, P.ivory][i % 3] : [P.sage, P.sky, P.clay][i % 3]} /></mesh>
      {i > 0 && <Line points={[nodes[Math.floor(i / 2)], p]} color={P.deep} lineWidth={0.55} transparent opacity={0.16} />}
    </React.Fragment>)}
  </group>;
}

export function IntelligenceWorld({ position = [0, 0, -2], rose = false, safety = false }) {
  return <group position={position}>
    <Ground color={rose ? P.ivory : P.sand} size={6.8} y={-2.55} />
    <Pedestal position={[0, -2.12, 0]} size={[7.2, 0.28, 5.1]} color={rose ? P.white : P.ivory} />
    <IntelligenceCore position={[0, -0.1, 0]} scale={1.02} rose={rose} />
    {[-3.4, 3.4].map((x, i) => <RoundedBox key={x} args={[1.15, 4.9, 0.18]} radius={0.08} position={[x, -0.15, -1.4]} rotation={[0, i ? -0.24 : 0.24, 0]}><Mat color={i ? P.white : P.ivory} roughness={0.92} /></RoundedBox>)}
    {safety && [2.55, 3.1, 3.65].map((r, i) => <mesh key={i} position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, i * 0.22]}><torusGeometry args={[r, 0.02, 12, 120]} /><meshBasicMaterial color={[P.clay, P.sage, P.sky][i]} transparent opacity={0.22} /></mesh>)}
    <SceneDust tint={rose ? P.rose : P.sky} />
  </group>;
}

export function JarvisWorld({ position = [0, 0, -2] }) {
  const modules = [[-3.25, 1.3, -1.1], [-3.2, -0.4, -0.25], [3.3, 1.0, -1.0], [3.3, -0.85, -0.25], [0, 2.5, -1.7]];
  return <group position={position}>
    <Ground color={P.sand} size={7.2} y={-2.6} />
    <Pedestal position={[0, -2.14, 0]} size={[7.7, 0.28, 5.5]} color={P.ivory} />
    <IntelligenceCore position={[0, -0.2, 0]} scale={0.88} />
    {modules.map((m, i) => <Float key={i} speed={0.45 + i * 0.06} floatIntensity={0.12}>
      <RoundedBox args={[1.68, 0.92, 0.16]} radius={0.09} position={m} rotation={[0, i % 2 ? -0.18 : 0.18, 0]}>
        <Mat color={i % 2 ? P.white : P.ivory} roughness={0.42} />
      </RoundedBox>
    </Float>)}
    {modules.map((m, i) => <Line key={i} points={[m, [0, -0.2, 0]]} color={i % 2 ? P.sky : P.sage} lineWidth={0.7} transparent opacity={0.16} />)}
    <SceneDust tint={P.sage} />
  </group>;
}

export function AureliaWorld({ position = [0, 0, -2] }) {
  return <group position={position}>
    <IntelligenceWorld position={[0, 0, 0]} rose />
    {[[-2.35, 0.2, 1.5], [2.2, 0.6, 1.1]].map((item, i) => <Float key={i} speed={0.32 + i * 0.1} floatIntensity={0.16}><RoundedBox args={[1.25, 1.72, 0.08]} radius={0.06} position={item} rotation={[0, i ? -0.18 : 0.16, 0]}><Mat color={i ? P.white : P.ivory} roughness={0.48} /></RoundedBox></Float>)}
  </group>;
}

export function RciWorld({ position = [0, 0, -2] }) {
  return <group position={position}>
    <IntelligenceWorld position={[0, 0, 0]} safety />
    <mesh position={[0, -1.45, 1.95]} castShadow><cylinderGeometry args={[0.95, 0.95, 0.9, 40]} /><Mat color={P.graphite} roughness={0.34} metalness={0.2} /></mesh>
    <mesh position={[0, -0.85, 1.95]} castShadow><sphereGeometry args={[0.58, 28, 28]} /><Mat color={P.ivory} roughness={0.3} /></mesh>
    {[[-0.75, -0.2, 1.75], [0.75, -0.2, 1.75]].map((p, i) => <Line key={i} points={[[0, 0.2, 0], p]} color={P.clay} lineWidth={1} transparent opacity={0.18} />)}
  </group>;
}

export function ServerWorld({ position = [0, 0, -2] }) {
  const lanes = [-2.2, -0.9, 0.35, 1.6];
  return <group position={position}>
    <Ground color={P.ivory} size={7} y={-2.55} />
    <Pedestal position={[0, -2.12, 0]} size={[7.2, 0.28, 5.15]} color={P.white} />
    {lanes.map((x, i) => <RoundedBox key={i} args={[0.85, 4.2, 0.42]} radius={0.08} position={[x, -0.2 + (i % 2) * 0.25, -0.8 - i * 0.32]} rotation={[0, 0.24 - i * 0.08, 0]}><Mat color={i % 2 ? P.graphite : P.ivory} roughness={0.42} metalness={i % 2 ? 0.16 : 0.03} /></RoundedBox>)}
    <Line points={[[-3, 1.55, -1.75], [3, 1.55, -1.75]]} color={P.sky} lineWidth={0.9} />
    <Line points={[[-3, 0.7, -1.1], [3, 0.7, -1.1]]} color={P.sage} lineWidth={0.9} transparent opacity={0.7} />
    <Line points={[[-3, -0.1, -0.45], [3, -0.1, -0.45]]} color={P.clay} lineWidth={0.9} transparent opacity={0.6} />
    {[-2.65, -0.75, 1.1, 2.75].map((x, i) => <Float key={i} speed={0.28 + i * 0.06} floatIntensity={0.14}><mesh position={[x, 1.1 - (i % 2) * 0.85, 0.85]}><boxGeometry args={[0.55, 0.22, 0.22]} /><Mat color={i % 2 ? P.sky : P.clay} roughness={0.22} /></mesh></Float>)}
    <SceneDust tint={P.sky} />
  </group>;
}

export function LineFollowerWorld({ position = [0, 0, -2] }) {
  return <group position={position}>
    <Ground color={P.sand} size={6.9} y={-2.55} />
    <Pedestal position={[0, -2.12, 0]} size={[7.2, 0.28, 5.2]} color={P.ivory} />
    <RoundedBox args={[5.6, 0.06, 3.6]} radius={0.05} position={[0, -1.75, 0]}><Mat color={P.white} roughness={0.8} /></RoundedBox>
    <Line points={[[-2.15, -1.71, 1.25], [-1.25, -1.71, 0.55], [-0.18, -1.71, 0.35], [0.95, -1.71, -0.45], [1.85, -1.71, -1.3]]} color={P.deep} lineWidth={4.8} />
    <group position={[0.25, -1.45, 0.3]} rotation={[0, 0.38, 0]}>
      <RoundedBox args={[1.55, 0.24, 1.25]} radius={0.12} castShadow><Mat color={P.white} roughness={0.4} /></RoundedBox>
      <mesh position={[0, 0.18, 0]} castShadow><boxGeometry args={[0.82, 0.2, 0.56]} /><Mat color={P.sky} roughness={0.42} /></mesh>
      {[-0.66, 0.66].flatMap((x) => [-0.62, 0.62].map((z) => [x, -0.18, z])).map((p, i) => <mesh key={i} position={p} rotation={[0, 0, Math.PI / 2]} castShadow><cylinderGeometry args={[0.28, 0.28, 0.16, 22]} /><Mat color={P.deep} roughness={0.74} /></mesh>)}
      {[-0.46, -0.23, 0, 0.23, 0.46].map((x, i) => <mesh key={i} position={[x, -0.16, 0.72]}><cylinderGeometry args={[0.05, 0.05, 0.12, 14]} /><Mat color={i === 2 ? P.clay : P.graphite} /></mesh>)}
    </group>
    <SceneDust tint={P.sage} />
  </group>;
}

export function SorterWorld({ position = [0, 0, -2] }) {
  return <group position={position}>
    <Ground color={P.ivory} size={7.1} y={-2.55} />
    <Pedestal position={[0, -2.12, 0]} size={[7.4, 0.28, 5.2]} color={P.white} />
    <RoundedBox args={[5.2, 0.18, 1.35]} radius={0.1} position={[0, -1.48, 0]} castShadow><Mat color={P.graphite} roughness={0.5} metalness={0.1} /></RoundedBox>
    <RoundedBox args={[1.25, 0.9, 0.85]} radius={0.08} position={[-2.2, -0.78, 0.05]} castShadow><Mat color={P.ivory} roughness={0.42} /></RoundedBox>
    <mesh position={[-2.2, -0.62, 0.48]}><boxGeometry args={[0.72, 0.3, 0.08]} /><Mat color={P.sky} roughness={0.24} /></mesh>
    <group position={[1.55, -1.12, 0.32]} rotation={[0, 0.42, 0]}>
      <mesh castShadow><boxGeometry args={[0.12, 1.45, 0.12]} /><Mat color={P.clay} roughness={0.35} /></mesh>
      <mesh position={[0, 0.65, 0]} rotation={[0, 0, -0.45]} castShadow><boxGeometry args={[0.12, 1.05, 0.12]} /><Mat color={P.clay} roughness={0.35} /></mesh>
    </group>
    {[-0.9, 0, 0.95].map((x, i) => <mesh key={i} position={[x, -1.2, 0]} castShadow><boxGeometry args={[0.38, 0.38, 0.38]} /><Mat color={[P.clay, P.sage, P.sky][i]} roughness={0.4} /></mesh>)}
    <Line points={[[-2.2, -0.55, 0.05], [-1.2, -0.5, 0.05], [-0.25, -1.05, 0.02], [1.25, -1.05, 0.02]]} color={P.graphite} lineWidth={1.2} transparent opacity={0.3} />
    <SceneDust tint={P.sky} />
  </group>;
}

export function QuietArchitecture({ route }) {
  const accent = route.includes('contact') ? P.clay : route.includes('resume') ? P.sky : route.includes('about') ? P.sage : route.includes('experience') ? P.sky : route.includes('blog') ? P.rose : route.includes('lab') ? P.sage : P.sand;

  if (route.includes('contact')) return <group position={[0, 0, -3]}>
    <Ground color={P.ivory} size={7.2} y={-2.75} />
    <Portal position={[0, 0.2, -1.3]} color={P.clay} scale={1.1} />
    {[-3.55, 3.55].map((x) => <RoundedBox key={x} args={[1.05, 5.2, 0.18]} radius={0.06} position={[x, -0.15, -1.8]}><Mat color={P.white} roughness={0.9} /></RoundedBox>)}
    <SceneDust tint={P.clay} />
  </group>;

  if (route.includes('experience')) return <group position={[0, 0, -3]}>
    <Ground color={P.ivory} size={7.2} y={-2.75} />
    {[-3.4, -1.7, 0, 1.7, 3.4].map((x, i) => <group key={x} position={[x, -1.65 + i * 0.3, -1.1 + (i % 2) * -0.75]}>
      <RoundedBox args={[0.82, 2 + i * 0.58, 0.82]} radius={0.12}><Mat color={i % 2 ? P.sky : P.white} roughness={0.56} /></RoundedBox>
      <mesh position={[0, 1.28 + i * 0.3, 0]}><sphereGeometry args={[0.13, 14, 14]} /><Mat color={P.clay} /></mesh>
    </group>)}
    <Line points={[[-3.4, -0.25, -1], [-1.7, 0.22, -1.7], [0, 0.72, -1.02], [1.7, 1.18, -1.8], [3.4, 1.65, -1.08]]} color={P.deep} lineWidth={1} transparent opacity={0.24} />
  </group>;

  if (route.includes('blog')) return <group position={[0, 0, -3]}>
    <Ground color={P.sand} size={7.1} y={-2.75} />
    {[-3.2, -1.6, 0, 1.6, 3.2].map((x, i) => <Float key={x} speed={0.42 + i * 0.08} floatIntensity={0.18}><RoundedBox args={[1.65, 2.4, 0.08]} radius={0.06} position={[x, (i % 2) * 0.5 - 0.1, -1 - (i % 3) * 0.42]} rotation={[0, -0.18 + i * 0.08, -0.03 + i * 0.012]}><Mat color={i % 2 ? P.white : P.ivory} roughness={0.48} /></RoundedBox></Float>)}
  </group>;

  if (route.includes('resume')) return <group position={[0, 0, -3]}>
    <Ground color={P.ivory} size={7.2} y={-2.8} />
    {[0, 1, 2].map((i) => <RoundedBox key={i} args={[4.8, 6.2, 0.1]} radius={0.08} position={[i * 0.42 - 0.42, 0.1 + i * 0.18, -1.4 - i * 0.42]} rotation={[0, -0.08 + i * 0.05, -0.05 + i * 0.025]}><Mat color={i === 2 ? P.white : P.sand} roughness={0.82} /></RoundedBox>)}
    <Line points={[[-1.55, 1.6, 0.05], [1.58, 1.6, 0.05]]} color={P.deep} lineWidth={1.2} />
    <Line points={[[-1.55, 0.94, 0.05], [0.7, 0.94, 0.05]]} color={P.sky} lineWidth={0.8} />
  </group>;

  if (route.includes('skills')) return <group position={[0, 0, -3]}>
    <Ground color={P.ivory} size={7.2} y={-2.75} />
    <Pedestal position={[0, -2.22, 0]} size={[7.8, 0.28, 5.4]} color={P.white} />
    {[-3, -1.5, 0, 1.5, 3].map((x, i) => <group key={x} position={[x, -1.2 + (i % 2) * 0.35, -1.1 - (i % 3) * 0.35]}>
      <RoundedBox args={[0.78, 2.6 + (i % 3) * 0.5, 0.78]} radius={0.1}><Mat color={[P.sand, P.white, P.sage, P.ivory, P.sky][i]} roughness={0.58} /></RoundedBox>
      <mesh position={[0, 1.65 + (i % 3) * 0.25, 0]}><torusGeometry args={[0.34, 0.035, 12, 64]} /><Mat color={P.graphite} roughness={0.25} metalness={0.28} /></mesh>
    </group>)}
    <Line points={[[-3, 0.65, -1.1], [-1.5, 1.05, -1.45], [0, 0.85, -1.8], [1.5, 1.2, -1.1], [3, 0.95, -1.45]]} color={P.graphite} lineWidth={0.8} transparent opacity={0.22} />
    <SceneDust count={10} tint={P.sage} />
  </group>;

  if (route.includes('lab')) return <group position={[0, 0, -3]}>
    <Ground color={P.sand} size={7.2} y={-2.75} />
    {[-3.1, -1, 1.1, 3.2].map((x, i) => <group key={x} position={[x, -1.45, -1 - (i % 2) * 0.8]}>
      <mesh><cylinderGeometry args={[0.86, 1, 1.6, 32]} /><Mat color={P.ivory} roughness={0.86} /></mesh>
      {i === 0 ? <mesh position={[0, 1.2, 0]}><icosahedronGeometry args={[0.68, 1]} /><Mat color={P.sky} /></mesh> : i === 1 ? <mesh position={[0, 1.12, 0]}><torusKnotGeometry args={[0.48, 0.11, 80, 12]} /><Mat color={P.sage} /></mesh> : i === 2 ? <mesh position={[0, 1.15, 0]}><boxGeometry args={[0.82, 0.82, 0.82]} /><Mat color={P.clay} /></mesh> : <IntelligenceCore position={[0, 1.15, 0]} scale={0.3} />}
    </group>)}
  </group>;

  if (route.includes('about')) return <group position={[0, 0, -3]}>
    <Ground color={P.ivory} size={7.2} y={-2.8} />
    <Portal position={[0, 0.18, -1.5]} color={P.sage} scale={1.06} />
    {[-3.7, 3.7].map((x, i) => <RoundedBox key={x} args={[1.35, 5.6, 0.2]} radius={0.08} position={[x, -0.2, -2]} rotation={[0, i ? -0.28 : 0.28, 0]}><Mat color={i ? P.white : P.sand} /></RoundedBox>)}
    {[1.7, 2.2, 2.7].map((r, i) => <mesh key={r} position={[0, 0.2, -1.5]} rotation={[Math.PI / 2, i * 0.18, 0]}><torusGeometry args={[r, 0.012, 10, 100]} /><meshBasicMaterial color={[P.sage, P.sky, P.clay][i]} transparent opacity={0.22} /></mesh>)}
  </group>;

  return <group position={[0, 0, -3]}>
    <Ground color={P.sand} size={6.2} y={-2.75} />
    <mesh position={[-3, 0, -1]} rotation={[0, 0.3, 0]}><boxGeometry args={[2.4, 7, 0.28]} /><Mat color={P.ivory} roughness={0.92} /></mesh>
    <mesh position={[2.8, -0.7, -2]} rotation={[0, -0.35, 0]}><boxGeometry args={[2.8, 5.5, 0.24]} /><Mat color={P.white} roughness={0.9} /></mesh>
    <mesh position={[0, 0.3, -1]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[2.25, 0.045, 16, 120]} /><Mat color={accent} metalness={0.18} roughness={0.3} /></mesh>
    <SceneDust tint={accent} />
  </group>;
}

export function PrecisionInstallation({ position = [0, 0, 0], scale = 1 }) {
  const rig = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);
  const ring3Ref = useRef(null);
  const coreRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const px = state.pointer.x;
    const py = state.pointer.y;

    if (rig.current) {
      // Smooth interactive tilt following pointer
      const targetRotY = Math.sin(t * 0.16) * 0.08 + px * 0.22;
      const targetRotX = Math.sin(t * 0.12) * 0.04 - py * 0.16;
      rig.current.rotation.y += (targetRotY - rig.current.rotation.y) * 0.05;
      rig.current.rotation.x += (targetRotX - rig.current.rotation.x) * 0.05;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.22;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.18;
    if (ring3Ref.current) ring3Ref.current.rotation.z = t * 0.14;

    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.08;
    }
  });

  return <group position={position} scale={scale}>
    <Ground color={P.ivory} size={8.4} y={-2.7} />
    <group ref={rig} position={[2.4, 0.15, 0]}>
      <Pedestal position={[0, -2.1, 0]} size={[3.8, 0.22, 3.8]} color={P.white} />
      <Float speed={0.55} floatIntensity={0.15} rotationIntensity={0.025}>
        <group ref={coreRef}>
          <mesh castShadow><sphereGeometry args={[1.15, 64, 64]} /><Mat color={P.ivory} roughness={0.16} metalness={0.16} clearcoat={0.22} /></mesh>
          <mesh scale={1.12}><icosahedronGeometry args={[1.15, 2]} /><meshBasicMaterial color={P.deep} wireframe transparent opacity={0.08} /></mesh>
          <mesh scale={0.88}><octahedronGeometry args={[0.9, 0]} /><meshBasicMaterial color={P.clay} wireframe transparent opacity={0.15} /></mesh>
        </group>
      </Float>
      {/* Precision measurement rings with counter-rotation */}
      <group ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.85, 0.026, 14, 180]} />
          <Mat color={P.sand} roughness={0.22} metalness={0.3} clearcoat={0.18} />
        </mesh>
      </group>
      <group ref={ring2Ref} rotation={[Math.PI / 2 + 0.34, 0.45, 0.18]}>
        <mesh>
          <torusGeometry args={[2.13, 0.024, 14, 180]} />
          <Mat color={P.sage} roughness={0.22} metalness={0.3} clearcoat={0.18} />
        </mesh>
      </group>
      <group ref={ring3Ref} rotation={[Math.PI / 2 + 0.68, 0.9, 0.36]}>
        <mesh>
          <torusGeometry args={[2.41, 0.022, 14, 180]} />
          <Mat color={P.clay} roughness={0.22} metalness={0.3} clearcoat={0.18} />
        </mesh>
      </group>
    </group>
    <SceneDust count={16} tint={P.sand} />
  </group>;
}

export function HomeRig({ progress, reduced }) {
  const target = useMemo(() => new THREE.Vector3(1.8, 0.1, 0), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  useFrame((state) => {
    const t = reduced ? 0 : progress.current;
    const px = reduced ? 0 : state.pointer.x * 0.35;
    const py = reduced ? 0 : state.pointer.y * 0.25;
    desired.set(0.4 + Math.sin(t * Math.PI) * 0.4 + px, 0.85 - t * 0.35 + py, 9.6 - t * 0.8);
    state.camera.position.lerp(desired, reduced ? 1 : 0.05);
    state.camera.lookAt(target);
  });
  return null;
}

export const projectCameras = {
  slam: { start: [7.2, 2.6, 6.4], end: [-4.8, 1.8, 4.2], target: [0, -1.15, -2], fov: 38 },
  arm: { start: [6.4, 2.3, 6.25], end: [-3.8, 3.25, 4.45], target: [-0.2, -0.72, -2], fov: 37 },
  gesture: { start: [6.8, 2.35, 6.4], end: [-4.25, 2.95, 4.5], target: [0.4, -0.55, -2], fov: 38 },
  pcb: { start: [5.4, 4.8, 5.6], end: [-4.6, 2.8, 4.85], target: [0, -1.18, -2], fov: 36 },
  jarvis: { start: [6.2, 1.85, 6.6], end: [-5.2, 2.1, 4.15], target: [0, -0.2, -2], fov: 39 },
  aurelia: { start: [5.7, 2.05, 6.95], end: [-4.65, 2.35, 4.4], target: [0, -0.12, -2], fov: 39 },
  server: { start: [7.1, 2.35, 5.95], end: [-5.85, 2.55, 4.6], target: [0, -0.8, -2], fov: 40 },
  line: { start: [5.4, 4.1, 5.95], end: [-4.5, 2.2, 3.95], target: [0.2, -1.5, -2], fov: 38 },
  sorter: { start: [6.55, 2.95, 6.45], end: [-5.25, 2.05, 4.3], target: [0, -1.15, -2], fov: 39 },
  rci: { start: [6.05, 1.85, 6.6], end: [-5.15, 2.3, 4.15], target: [0, -0.1, -2], fov: 39 },
};

export function ProjectRig({ scene = 'jarvis', reduced = false }) {
  const { progress } = useScrollProgress();
  const target = useMemo(() => new THREE.Vector3(), []);
  const desired = useMemo(() => new THREE.Vector3(), []);
  const end = useMemo(() => new THREE.Vector3(), []);
  const preset = projectCameras[scene] || projectCameras.jarvis;

  useFrame((state) => {
    const t = reduced ? Math.round(progress.current * 4) / 4 : progress.current;
    const px = reduced ? 0 : state.pointer.x * 0.45;
    const py = reduced ? 0 : state.pointer.y * 0.3;
    const eased = t * t * (3 - 2 * t);
    end.set(...preset.end);
    desired.set(...preset.start).lerp(end, eased);
    desired.y += Math.sin(t * Math.PI) * 0.48 + py;
    desired.x += Math.sin(t * Math.PI * 1.6) * 0.18 + px;
    target.set(...preset.target);
    target.y += Math.sin(t * Math.PI * 1.5) * 0.14 + py * 0.2;
    target.x += px * 0.2;
    state.camera.position.lerp(desired, reduced ? 1 : 0.055);
    state.camera.lookAt(target);
    const desiredFov = preset.fov + Math.sin(t * Math.PI) * 1.7;
    state.camera.fov += (desiredFov - state.camera.fov) * 0.05;
    state.camera.updateProjectionMatrix();
  });

  return null;
}

export function StaticRig() {
  useFrame((state) => {
    const px = state.pointer.x * 0.3;
    const py = state.pointer.y * 0.2;
    state.camera.position.lerp(new THREE.Vector3(px, 0.9 + py, 9.4), 0.06);
    state.camera.lookAt(px * 0.2, py * 0.2, -2);
  });
  return null;
}

