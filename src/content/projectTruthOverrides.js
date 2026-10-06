const truthOverrides = {
  'gesture-controlled-robotic-arm': {
    summary: 'A physical multi-joint robotic arm controlled from a wearable MPU6050 gesture input over nRF24L01, with committed continuous actuation video and hardware bench evidence.',
    status: 'Physical actuation video + bench evidence published; quantitative latency and repeatability remain unmeasured',
    approach: 'Built a wearable MPU6050 gesture controller that sends bounded motion commands over nRF24L01 to an Arduino/PCA9685 servo-control stack driving a real multi-joint arm.',
    architecture: [
      ['Gesture Sensing', 'MPU6050 orientation input on the wearable controller'],
      ['Signal Conditioning', 'Firmware filtering and bounded gesture-to-command mapping'],
      ['Wireless Link', 'nRF24L01 command transport between wearable controller and arm'],
      ['Servo Control', 'Arduino receiver with PCA9685 PWM output and bounded servo targets'],
      ['Physical Evidence', 'Continuous actuation video plus hardware bench photography committed in the repository'],
    ],
    testing: 'Physical bench evidence demonstrates responsive arm/gripper actuation in a continuous committed video. End-to-end latency, RF packet-loss rate, positional repeatability, payload and endurance have not yet been measured as quantitative evidence.',
  },
  'custom-pcb-motor-driver': {
    summary: 'A DRV8848 dual brushed-DC motor-driver engineering reference with KiCad sources, tolerance-aware electrical and thermal analysis, BOM traceability, preliminary manufacturing outputs, and a staged bring-up protocol.',
    status: 'Engineering reference · CAD/fabrication/hardware claims remain evidence-gated',
    implemented: [
      'KiCad schematic and PCB source files for the DRV8848 reference design',
      'Preliminary Rev-A manufacturing outputs retained for review rather than treated as hardware proof',
      'BOM and datasheet traceability checks',
      'Deterministic electrical/current-limit/thermal analysis tooling',
      'Automated engineering checks and corner-sweep artifacts',
      'Staged first-article hardware bring-up and measurement protocol',
    ],
    simulated: [
      'Tolerance-aware electrical/current-limit corner sweeps',
      'Analytical thermal and conductor-loss screening',
      'Power-path and transient calculations used as pre-hardware engineering evidence',
    ],
    testing: 'Automated engineering checks validate repository contracts, calculations and source consistency. Native CAD review, fabrication and bench measurements remain separate gates and are not replaced by analytical or generated artifacts.',
    lessons: 'Thermal, current-limit and manufacturing constraints need to be treated as explicit design inputs, while analytical results must remain separate from physical board evidence.',
  },
  'slam-robot-ros2': {
    summary: 'A ROS 2 SLAM benchmark stack with Gazebo ground truth, 2D LiDAR, ATE/RPE trajectory evaluation, loop-closure metrics, rosbag regression, and reproducible evidence tooling.',
    status: 'Software contracts + ROS build verified; end-to-end Gazebo benchmark evidence pending',
    testing: 'CI verifies software/package contracts and the ROS build. A successful end-to-end Gazebo benchmark, published ATE/RPE result and physical LiDAR/encoder validation remain explicit evidence gates.',
  },
  '3dof-robotic-arm': {
    github: 'https://github.com/VivekVRobo/3dof-robotic-arm',
    summary: 'A 3-DOF robotic-arm kinematics stack with analytic FK/IK, Cartesian waypoint planning, servo calibration, numerical validation, serial control, and a physical endpoint measurement harness.',
    status: 'Software/kinematics reference; physical endpoint accuracy and repeatability pending measurement',
    testing: 'Deterministic numerical validation checks FK → IK → FK consistency across a model grid. Physical accuracy, repeatability, backlash, payload and calibrated mechanical geometry remain measurement gates.',
  },
  'http-server-from-scratch': {
    summary: 'A C++20 HTTP/1.1 server built from raw sockets with incremental parsing, secure static files, bounded concurrency, Linux epoll I/O, CI, and controlled benchmark tooling.',
    status: 'Protocol/security behavior and cross-platform CI verified; controlled-host performance claims remain evidence-gated',
    planned: ['Complete controlled-host benchmark evidence before publishing performance comparisons', 'Continue protocol-hardening and compatibility work without inflating production-readiness claims'],
  },
};

const universalBrain = {
  slug: 'universal-brain',
  id: 'universal-brain',
  index: '11',
  eyebrow: 'AI Systems & Reliability',
  title: 'Universal Brain',
  shortTitle: 'Universal Brain',
  summary: 'A local-first AI agent runtime that keeps authority, durable mission state, model routing, recovery, engineering workflows, and verification outside any single LLM.',
  tags: ['AI Agents', 'Local AI', 'LLM Orchestration', 'Reliability', 'Python', 'Systems Engineering'],
  github: 'https://github.com/VivekVRobo/universal-brain',
  live: '',
  docs: 'https://github.com/VivekVRobo/universal-brain/blob/main/README.md',
  accent: 'graphite',
  scene: 'intelligence',
  status: 'Software/architecture checkpoints verified; target-machine Windows/WSL2/Ollama/endurance evidence still gated',
  role: 'System architecture, authority boundaries, durable missions, model routing, engineering workflows, verification and recovery.',
  problem: 'Long-running AI agents need durable state, explicit permissions, recovery and evidence without allowing a model to become the source of canonical truth or authority.',
  approach: 'Separate reasoning models from a deterministic executive/control plane that owns mission state, permissions, tool authority, recovery and evidence-backed completion.',
  architecture: [
    ['Executive Kernel', 'Owns canonical mission state, requirements and control-plane decisions'],
    ['Intelligence Fabric', 'Routes among replaceable model/transport providers without transferring canonical authority'],
    ['Engineering Agency', 'Coordinates requirement-scoped work, code intelligence, verification and recovery'],
    ['Tool Gateway', 'Deny-by-default boundary for consequential external actions'],
    ['Evidence Layer', 'Tests, measurements and receipts used to verify completion and support rollback/recovery'],
  ],
  decisions: [
    'Keep canonical state and permissions outside the LLM.',
    'Treat model access routes as replaceable reasoning services rather than permanent authorities.',
    'Gate consequential tool use and target-machine claims behind explicit authorization and evidence.',
  ],
  implemented: [
    'Deterministic executive/control-plane checkpoints',
    'Authority-gated Tool Gateway contracts',
    'Durable mission/checkpoint and recovery mechanisms',
    'Multi-model routing/council abstractions',
    'Engineering-agency planning, verification and worker/service durability infrastructure',
    'Target-machine validation tooling and evidence-sealing workflow',
  ],
  simulated: ['Software and cross-platform validation harnesses for environment-dependent capabilities'],
  planned: ['Produce target-machine Windows/WSL2/Ollama evidence', 'Run longer real-repository endurance campaigns before production-scale claims'],
  testing: 'Repository verification records distinguish software/harness checks from target-machine proof. Windows, WSL2, Ollama pressure and long-duration endurance claims remain blocked until corresponding artifacts exist.',
  lessons: 'Useful agent autonomy depends as much on authority, durable state, recovery and evidence as on model capability.',
  future: 'Advance real-environment evidence, multi-repository engineering reliability and operator-visible verification while preserving fail-closed authority boundaries.',
  media: [
    { type: 'placeholder', label: 'Control Plane', caption: 'Human request → alignment → deterministic executive → authorized tools → verification → canonical state' },
    { type: 'placeholder', label: 'Mission Recovery', caption: 'Durable checkpoints, workspace identity and recovery across interrupted engineering missions' },
    { type: 'placeholder', label: 'Evidence Boundary', caption: 'Software verification separated from Windows, WSL2, Ollama and endurance proof' },
  ],
  featured: false,
  published: true,
  order: 10,
};

export function applyProjectTruthOverrides(projects = []) {
  const normalized = projects.map((project) => ({
    ...project,
    ...(truthOverrides[project.slug] || {}),
  }));

  if (!normalized.some((project) => project.slug === universalBrain.slug)) {
    normalized.push(universalBrain);
  }

  return normalized;
}
