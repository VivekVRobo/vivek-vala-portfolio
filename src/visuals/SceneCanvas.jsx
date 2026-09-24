import React, { lazy, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useScenePreference } from '../hooks/useScenePreference';
import * as legacy from './legacy/legacyScenes';
import OrbitInspector from './core/OrbitInspector';
import LidarSlamWorld from './scenes/LidarSlamWorld';
import KinematicArmWorld from './scenes/KinematicArmWorld';
import PoseSkeletonWorld from './scenes/PoseSkeletonWorld';
import CircuitTraceWorld from './scenes/CircuitTraceWorld';
import SystemDagWorld from './scenes/SystemDagWorld';
import CognitiveRuntimeWorld from './scenes/CognitiveRuntimeWorld';
import SafetyPipelineWorld from './scenes/SafetyPipelineWorld';
import ProtocolRuntimeWorld from './scenes/ProtocolRuntimeWorld';
import ControlLoopWorld from './scenes/ControlLoopWorld';
import VisionPipelineWorld from './scenes/VisionPipelineWorld';

try {
  // Dynamically import new scenes if present
} catch (e) {}

const P = legacy.P;

function Scene({ route, reduced }) {
  const { progress } = useScrollProgress();

  if (route === '/') {
    return (
      <>
        <OrbitInspector enabled={true} springSpeed={3.2}>
          <legacy.PrecisionInstallation />
        </OrbitInspector>
        <legacy.HomeRig progress={progress} reduced={reduced} />
      </>
    );
  }

  let world = <legacy.QuietArchitecture route={route} />;
  let scene = '';

  if (route.includes('slam-robot-ros2')) {
    world = LidarSlamWorld ? <LidarSlamWorld /> : <legacy.SlamWorld />;
    scene = 'slam';
  } else if (route.includes('3dof-robotic-arm')) {
    world = KinematicArmWorld ? <KinematicArmWorld /> : <legacy.ArmWorld />;
    scene = 'arm';
  } else if (route.includes('custom-pcb-motor-driver')) {
    world = CircuitTraceWorld ? <CircuitTraceWorld /> : <legacy.PcbWorld />;
    scene = 'pcb';
  } else if (route.includes('/projects/jarvis')) {
    world = SystemDagWorld ? <SystemDagWorld /> : <legacy.JarvisWorld />;
    scene = 'jarvis';
  } else if (route.includes('aurelia-chan')) {
    world = CognitiveRuntimeWorld ? <CognitiveRuntimeWorld /> : <legacy.AureliaWorld />;
    scene = 'aurelia';
  } else if (route.includes('http-server-from-scratch')) {
    world = ProtocolRuntimeWorld ? <ProtocolRuntimeWorld /> : <legacy.ServerWorld />;
    scene = 'server';
  } else if (route.includes('line-following-robot')) {
    world = ControlLoopWorld ? <ControlLoopWorld /> : <legacy.LineFollowerWorld />;
    scene = 'line';
  } else if (route.includes('cv-object-sorter')) {
    world = VisionPipelineWorld ? <VisionPipelineWorld /> : <legacy.SorterWorld />;
    scene = 'sorter';
  } else if (route.includes('gesture-controlled-robotic-arm')) {
    world = PoseSkeletonWorld ? <PoseSkeletonWorld /> : <legacy.ArmWorld gesture />;
    scene = 'gesture';
  } else if (route.includes('robotic-character-interface')) {
    world = SafetyPipelineWorld ? <SafetyPipelineWorld /> : <legacy.RciWorld />;
    scene = 'rci';
  }

  return (
    <>
      <OrbitInspector enabled={route.startsWith('/projects/')} springSpeed={3.6}>
        {world}
      </OrbitInspector>
      {route.startsWith('/projects/') ? (
        <legacy.ProjectRig scene={scene} reduced={reduced} />
      ) : (
        <legacy.StaticRig />
      )}
    </>
  );
}

function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function shouldUseFallback() {
  if (typeof window === 'undefined') return false;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return Boolean(
    connection?.saveData ||
    (navigator.deviceMemory && navigator.deviceMemory <= 2)
  );
}

export default function SceneCanvas({ route }) {
  const reduced = useReducedMotion();
  const { enabled } = useScenePreference();
  const isMobile = isMobileDevice();

  if (!enabled || shouldUseFallback()) {
    return (
      <div
        className={`scene-canvas scene-fallback scene-fallback--${route.split('/')[1] || 'home'}`}
        aria-hidden="true"
      >
        <span />
        <span />
        <span />
      </div>
    );
  }

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.9, 9.6], fov: 40 }}
        dpr={isMobile ? [1, 1] : [1, 1.5]}
        shadows={!isMobile}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? 'default' : 'high-performance'
        }}
      >
        <color attach="background" args={[P.white]} />
        <fog attach="fog" args={[P.white, 12, 52]} />
        <ambientLight intensity={1.55} />
        <hemisphereLight intensity={0.55} color="#fff8ee" groundColor="#ddd6cc" />
        <directionalLight
          castShadow={!isMobile}
          position={[7, 10, 8]}
          intensity={2.35}
          color="#fff5e3"
          shadow-mapSize-width={isMobile ? 512 : 1024}
          shadow-mapSize-height={isMobile ? 512 : 1024}
          shadow-camera-far={28}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
        />
        <directionalLight position={[-6, 5, 0]} intensity={0.95} color="#d7e3e7" />
        <ContactShadows
          position={[0, -2.55, 0]}
          opacity={isMobile ? 0.12 : 0.18}
          scale={26}
          blur={isMobile ? 1.5 : 2.2}
          far={8}
          color="#8b7b67"
        />
        <Scene route={route} reduced={reduced} />
      </Canvas>
    </div>
  );
}

