export const site = {
  name: 'Vivek Vala',
  monogram: 'VV',
  role: 'Robotics and Automation Engineer',
  headline: 'Building autonomous mobile robots, embedded hardware, and intelligent software systems.',
  strapline: 'Designing and programming robotics systems that work reliably in the physical world.',
  intro: 'I am a Robotics and Automation Engineering student based in Gujarat, India. My focus is on autonomous navigation with ROS 2, microcontroller firmware, motor control electronics, and computer vision.',
  location: 'Gujarat, India',
  timezone: 'IST (UTC+5:30)',
  email: 'vivekvala562@gmail.com',
  github: 'https://github.com/VivekVRobo',
  linkedinLabel: 'Vivek Vala',
  linkedin: '',
  resumeUrl: '',
  availability: 'Available for robotics engineering internships and project collaborations.',
  stats: [
    ['10', 'Projects Built'],
    ['ROS 2', 'Autonomous Navigation'],
    ['Hardware and Code', 'Complete System Builds'],
  ],
  heroCinema: {
    enabled: true,
    poster: '/hero-cinema-poster.webp',
    webm: '/hero-cinema.webm',
    mp4: '/hero-cinema.mp4',
  },
};

export const capabilities = [
  ['Robotics', 'ROS 2, SLAM, mobile robot navigation, kinematics, Gazebo simulation, sensor fusion'],
  ['Embedded Systems', 'Arduino, ESP32, microcontrollers, motor drivers, circuit design, serial protocols'],
  ['Computer Vision', 'OpenCV, camera tracking, gesture recognition, color and shape sorting'],
  ['Intelligent Systems', 'Local task automation, system tools, Python utilities, speech interfaces'],
  ['Software', 'Python, C++, Linux, Git, automated unit tests, hardware communication'],
];

const projectBase = [
  {
    slug: 'slam-robot-ros2', index: '01', eyebrow: 'Autonomous Robotics', title: 'SLAM Robot with ROS 2', shortTitle: 'SLAM Robot',
    summary: 'An autonomous mobile robot running ROS 2 and SLAM navigation in Gazebo, with ground truth trajectory tracking and mapping evaluation tools.',
    tags: ['ROS 2', 'SLAM', 'Gazebo', 'LiDAR', 'Navigation'], github: 'https://github.com/VivekVRobo/slam-robot-ros2', live: '', docs: '', accent: 'mist', scene: 'slam',
    status: 'Gazebo simulation and mapping evaluation tools implemented',
    role: 'ROS 2 package development, simulation setup, benchmark tools, and documentation.',
    problem: 'Many SLAM demonstrations show a map screenshot without testing if the run is repeatable or comparing the path against true simulator position.',
    approach: 'Built a structured evaluation setup in Gazebo where trajectory accuracy, mapping consistency, and sensor data can be tested repeatedly.',
    architecture: [
      ['Gazebo World', 'Differential drive robot model, indoor obstacle room, and simulated LiDAR sensor'],
      ['ROS 2 Graph', 'Laser scan, odometry, coordinate transforms, and SLAM mapping node'],
      ['Recorder', 'Saves estimated robot trajectory and true simulator position into structured files'],
      ['Evaluation', 'Calculates trajectory error, path drift, and resource usage across test runs'],
      ['Test Runs', 'Automated replay scripts and reproducible evaluation datasets'],
    ],
    decisions: [
      'Separate simulated wheel odometry from simulator ground truth position.',
      'Test mapping consistency across multiple runs instead of relying on a single demo.',
      'Record evaluation data into readable formats for easy inspection.',
    ],
    implemented: ['ROS 2 workspace and launch files', 'Gazebo robot model and indoor world', 'Path evaluation scripts', 'Automated recording tools'],
    simulated: ['Gazebo simulation environment and offline path evaluators'],
    planned: ['Record bag files from physical LiDAR and encoders', 'Run identical evaluation scripts on real differential drive hardware'],
    testing: 'Software and simulation tests verify node communication, transform trees, and trajectory scoring tools.',
    lessons: 'Autonomous mapping is much easier to evaluate when ground truth data is recorded side by side with estimated position.',
    future: 'Deploy the tested navigation stack onto a physical differential drive robot with real LiDAR and wheel encoders.',
    media: [
      { type: 'placeholder', label: 'Simulation World', caption: 'Gazebo environment with differential drive robot and LiDAR' },
      { type: 'placeholder', label: 'Trajectory Evaluation', caption: 'Comparison of estimated path against true simulator position' },
      { type: 'placeholder', label: 'Generated Map', caption: 'Occupancy grid map generated during autonomous navigation' },
    ],
  },
  {
    slug: '3dof-robotic-arm', index: '02', eyebrow: 'Mechatronics and Robotics', title: '3 DOF Robotic Arm', shortTitle: 'Robotic Arm',
    summary: 'A tabletop robotic arm programmed with forward and inverse kinematics algorithms, servo calibration tools, and Arduino firmware to reach 3D coordinates.',
    tags: ['Python', 'Arduino', 'Inverse Kinematics', 'Servo Motors', 'Mechatronics'], github: 'https://github.com/VivekVRobo/3dof-robotic-arm', live: '', docs: '', accent: 'clay', scene: 'arm',
    status: 'Kinematic calculations and Arduino firmware complete',
    role: 'Kinematic modeling, Cartesian motion planning, Arduino firmware, and servo calibration.',
    problem: 'A robotic arm requires coordinated joint motion to reach a 3D target point accurately while respecting joint limits and mechanical offsets.',
    approach: 'Developed analytic inverse kinematics in Python, mapped angles to calibrated PWM servo signals, and sent coordinates over serial to Arduino.',
    architecture: [
      ['Target Input', 'Cartesian coordinates and straight line waypoint generator'],
      ['Kinematics', 'Trigonometric base yaw, shoulder, and elbow angle solver'],
      ['Joint Limits', 'Software boundary checks to prevent mechanical collisions'],
      ['Servo Mapping', 'Individual calibration curves for each servo motor'],
      ['Arduino Firmware', 'Serial command parser and smooth servo controller'],
    ],
    decisions: ['Keep link lengths and angular limits configurable.', 'Validate kinematics math in software before commanding real servos.', 'Measure physical endpoint accuracy with real markers.'],
    implemented: ['Forward and inverse kinematics math', 'Straight line waypoint interpolation', 'Servo calibration tools', 'Arduino receiver sketch and serial interface'],
    simulated: ['Software dry run verifying reachable target space'],
    planned: ['Record physical tip position measurements', 'Tune servo PID response for smoother motion'],
    testing: 'Unit tests verify mathematical consistency between forward and inverse kinematics across hundreds of reachable points.',
    lessons: 'Accurate manipulator control depends on realistic joint limit checks and careful individual servo offset calibration.',
    future: 'Integrate a small camera for visual targeting and coordinate grasping of objects on a table.',
    media: [
      { type: 'placeholder', label: 'Arm Assembly', caption: '3D printed arm links with servo motors and base turntable' },
      { type: 'placeholder', label: 'Kinematics Diagram', caption: 'Coordinate frames and joint angle solutions' },
      { type: 'placeholder', label: 'Workspace Reach', caption: 'Calculated reachable workspace in Cartesian coordinates' },
    ],
  },
  {
    slug: 'custom-pcb-motor-driver', index: '03', eyebrow: 'Electronics and Hardware', title: 'Custom PCB Motor Driver', shortTitle: 'PCB Motor Driver',
    summary: 'A dual motor driver circuit board designed in KiCad for mobile robots, featuring current protection, clean power distribution, and testing points.',
    tags: ['KiCad', 'PCB Design', 'Motor Control', 'Power Electronics', 'Hardware'], github: 'https://github.com/VivekVRobo/custom-pcb-motor-driver', live: '', docs: '', accent: 'sage', scene: 'pcb',
    status: 'Schematic design and circuit board layout in progress',
    role: 'Circuit schematic design, component selection, PCB layout, and design rule checks.',
    problem: 'Standard hobby motor shields often lack adequate thermal dissipation, power filtering, and protection against reverse voltage spikes.',
    approach: 'Designed a dedicated dual H bridge board using the DRV8848 driver with ground plane copper pours, sense resistors, and flyback protection.',
    architecture: [
      ['Power Input', 'Reverse polarity diode, bulk electrolytic capacitors, and ceramic decoupling'],
      ['Driver IC', 'TI DRV8848 dual full bridge motor driver'],
      ['Current Sense', 'Low ohm sense resistors for overcurrent monitoring'],
      ['Logic Interface', 'Standard microcontroller headers with pull down resistors'],
      ['Thermal Dissipation', 'Exposed pad thermal vias connected to bottom copper plane'],
    ],
    decisions: ['Use wide power traces and dedicated ground planes for high current paths.', 'Place bulk capacitors as close as possible to motor driver pins.', 'Include physical test points for oscilloscope probing during bringup.'],
    implemented: ['Complete schematic capture in KiCad', 'Component bill of materials', 'Design rule verification', 'Netlist validation scripts'],
    simulated: ['Current limit calculations and thermal dissipation estimates'],
    planned: ['Order prototype PCB fabrication', 'Perform load testing on a motor test bench'],
    testing: 'Automated linter checks verify netlist connectivity, missing footprints, and bill of materials completeness.',
    lessons: 'Careful routing of ground paths and thermal vias is essential to prevent motor electrical noise from disturbing microcontroller logic.',
    future: 'Fabricate the board, solder components, and measure voltage ripples and thermal performance under full motor load.',
    media: [
      { type: 'placeholder', label: 'Schematic Diagram', caption: 'Power supply, driver circuitry, and microcontroller headers' },
      { type: 'placeholder', label: 'PCB Layout', caption: 'Two layer board layout with wide power traces and ground planes' },
      { type: 'placeholder', label: '3D Board Render', caption: '3D visualization of assembled components and terminal blocks' },
    ],
  },
  {
    slug: 'jarvis', index: '04', eyebrow: 'Software and Automation', title: 'JARVIS Desktop Assistant', shortTitle: 'JARVIS',
    summary: 'A desktop automation system written in Python that integrates speech recognition, system tools, and task automation on Windows.',
    tags: ['Python', 'Speech Recognition', 'Automation', 'System Tools', 'Windows'], github: 'https://github.com/VivekVRobo/jarvis', live: '', docs: '', accent: 'sand', scene: 'intelligence',
    status: 'Core desktop automation and voice tools functional',
    role: 'Software architecture, speech processing, tool dispatch, and desktop integration.',
    problem: 'Voice assistants often rely entirely on heavy cloud APIs or become brittle when trying to automate local computer tasks.',
    approach: 'Created a modular Python system with clear command routing, local speech synthesis, and direct operating system tool hooks.',
    architecture: [
      ['Speech Input', 'Microphone audio capture and offline speech recognition'],
      ['Command Router', 'Matches spoken phrases to specific local actions and tools'],
      ['Tool Modules', 'Application launching, file organization, volume, and browser control'],
      ['Local Storage', 'Saves user preferences, shortcuts, and command history'],
      ['Hardware Hooks', 'Optional serial link to external Arduino status indicators'],
    ],
    decisions: ['Prioritize fast local actions over slow cloud round trips.', 'Keep tool execution explicit and safe without dangerous shell commands.', 'Provide voice confirmation for actions.'],
    implemented: ['Voice recognition loop', 'System command tools', 'Audio feedback engine', 'Configuration files'],
    simulated: [],
    planned: ['Add lightweight local language model parsing for flexible phrasing', 'Build a clean system tray interface'],
    testing: 'Interactive CLI testing verifies voice intent matching, tool execution, and error handling when microphone input is noisy.',
    lessons: 'Direct, deterministic command matching is much faster and more reliable for daily desktop shortcuts than open ended generation.',
    future: 'Expand hardware integration to control desk lighting and read temperature sensors via serial communication.',
    media: [
      { type: 'placeholder', label: 'Voice Command Interface', caption: 'Audio capture loop and intent recognition' },
      { type: 'placeholder', label: 'System Tools', caption: 'Application launch and Windows automation modules' },
      { type: 'placeholder', label: 'Hardware Link', caption: 'Serial communication with Arduino status display' },
    ],
  },
  {
    slug: 'aurelia-chan', index: '05', eyebrow: 'Conversational AI', title: 'Aurelia AI Runtime', shortTitle: 'Aurelia Runtime',
    summary: 'An experimental conversational AI runtime exploring persistent memory, interaction state, and natural dialogue.',
    tags: ['Python', 'Flask', 'SQLite', 'Dialogue Systems', 'State Management'], github: 'https://github.com/VivekVRobo/Aurelia-Chan-Source', live: '', docs: '', accent: 'rose', scene: 'aurelia',
    status: 'Dialogue runtime and memory module functional',
    role: 'Backend runtime, persistent memory design, state engine, and API integration.',
    problem: 'Simple chatbots forget context immediately between sessions and lack structured state to track user interaction history.',
    approach: 'Structured a modular Python backend with SQLite persistence, conversation memory buffers, and clear separation between dialogue logic and presentation.',
    architecture: [
      ['Runtime Server', 'Flask API handling conversation requests and responses'],
      ['Dialogue Engine', 'Context aware prompt construction and response processing'],
      ['Memory Store', 'SQLite database storing conversation logs and user facts'],
      ['State Manager', 'Tracks active topic and mood state between exchanges'],
      ['Frontend Stage', 'Clean web interface for text and audio conversation'],
    ],
    decisions: ['Store persistent conversation logs locally in SQLite.', 'Separate response logic from the web interface for easy testing.', 'Validate API responses to prevent crashes on malformed data.'],
    implemented: ['Flask API server', 'SQLite conversation storage', 'State tracking engine', 'Web chat interface'],
    simulated: [],
    planned: ['Add vector similarity search for retrieving older conversation memories', 'Improve response streaming speed'],
    testing: 'API endpoint tests verify session creation, message persistence, and memory retrieval across restarts.',
    lessons: 'A persistent memory store dramatically improves conversational continuity compared to stateless prompt loops.',
    future: 'Connect the dialogue system to external robotics interfaces for physical conversation demonstrations.',
    media: [
      { type: 'placeholder', label: 'Conversation Interface', caption: 'Web based dialogue interface with live chat history' },
      { type: 'placeholder', label: 'Memory Architecture', caption: 'SQLite schema for context and user memory persistence' },
      { type: 'placeholder', label: 'State Tracking', caption: 'Context and topic tracking across conversation turns' },
    ],
  },
  {
    slug: 'http-server-from-scratch', index: '06', eyebrow: 'Systems Software', title: 'HTTP Server from Scratch', shortTitle: 'HTTP Server',
    summary: 'A custom HTTP web server written in C++ using POSIX socket programming to handle TCP connections, HTTP requests, and static files.',
    tags: ['C++', 'Socket Programming', 'Networking', 'HTTP Protocol', 'Linux'], github: 'https://github.com/VivekVRobo/http-server-from-scratch', live: '', docs: '', accent: 'graphite', scene: 'server',
    status: 'Socket engine and HTTP parser verified',
    role: 'Network programming, HTTP request parser, thread pool concurrency, and file serving.',
    problem: 'Using high level web frameworks hides the fundamental mechanics of network sockets, TCP handshakes, request parsing, and concurrent connection handling.',
    approach: 'Built a low level server in C++ using Berkeley sockets, implemented an incremental HTTP parser, and handled concurrent clients with a thread pool.',
    architecture: [
      ['Socket Layer', 'TCP socket creation, binding, listening, and accepting client connections'],
      ['Request Parser', 'Parses HTTP request method, URI, headers, and body from raw byte buffers'],
      ['Static File Engine', 'Safely maps URLs to local files with path traversal security checks'],
      ['Thread Pool', 'Worker thread queue to handle multiple concurrent clients efficiently'],
      ['Response Builder', 'Generates valid HTTP response headers and status codes'],
    ],
    decisions: ['Use raw sockets to thoroughly understand network protocols.', 'Sanitize file paths to prevent directory traversal vulnerabilities.', 'Use nonblocking sockets to handle slow clients gracefully.'],
    implemented: ['TCP socket server', 'HTTP request parser', 'Thread pool manager', 'Static file handler with MIME types'],
    simulated: [],
    planned: ['Implement keep alive persistent connections', 'Add HTTPS support with OpenSSL'],
    testing: 'Automated unit tests validate HTTP request parsing, status codes, MIME types, and path traversal defenses.',
    lessons: 'Writing network protocols from scratch provides a much deeper understanding of operating systems and web infrastructure.',
    future: 'Benchmark the server against nginx under concurrent load and analyze memory allocation behavior.',
    media: [
      { type: 'placeholder', label: 'Server Architecture', caption: 'Socket accept loop, request parser, and worker threads' },
      { type: 'placeholder', label: 'HTTP Traffic', caption: 'Raw HTTP request and response messages' },
      { type: 'placeholder', label: 'Load Testing', caption: 'Concurrent client benchmark and response time measurements' },
    ],
  },
];

export const projects = projectBase.map((project, i) => ({ ...project, id: project.slug, featured: i < 6, published: true, order: i }));

export const labProjects = [
  { title: 'Aethel Visual Studio', meta: 'High-Resolution Visual Art, 8K Masters', status: 'Deployment Pending', detail: 'Dedicated visual art direction and verified 4K/8K master workflow for creators, games, music, publishing, and brands.', live: '' },
  { title: 'Universal Brain', meta: 'Local Automation Engine', status: 'Active Development', detail: 'A local engine for coordinating Python scripts, desktop automation, and developer tools on Windows.' },
  { title: 'Native Desktop Pet', meta: 'Windows Desktop Animation', status: 'Prototype', detail: 'A transparent desktop character program with sprite animations, system tray controls, and status reminders.' },
  { title: 'Media Automation Pipeline', meta: 'Python, Playwright, Automation', status: 'Tool in Use', detail: 'An automated media processing and publishing tool with scheduled tasks, image resizing, and error logging.' },
  { title: 'Video Studio Workflow', meta: 'Computer Vision, FFmpeg, Python', status: 'Experimental', detail: 'A modular video processing pipeline for automated clipping, audio normalization, and format conversion.' },
  { title: 'Audio Library Engine', meta: 'Audio Management, Python', status: 'Subsystem', detail: 'A local audio selector and playback utility that categorizes tracks and manages playlists for experiments.' },
  { title: 'Workflow Assistant', meta: 'Python, Automation, Data', status: 'Tool in Use', detail: 'A set of scripts for automated data extraction, formatting, and report generation for engineering projects.' },
  { title: 'Webcam Gesture Controller', meta: 'OpenCV, Arduino, Serial', status: 'Working Prototype', detail: 'A webcam based differential drive controller that translates hand gestures into motor drive commands.', github: 'https://github.com/VivekVRobo/gesture-controlled-robot' },
];

export const experience = [
  { period: '19 June to 3 July 2026', role: 'Embedded Systems Intern', org: 'Corporate Web Solutions', detail: 'Hands on experience with Embedded C, microcontrollers, GPIO interfacing, UART serial communication, buffers, and firmware architecture.' },
];

export const education = [
  { period: 'Current', role: 'B.E. Robotics and Automation Engineering', org: 'Government Engineering College, Gandhinagar, Gujarat Technological University', detail: 'Undergraduate degree focusing on robotics, control systems, embedded electronics, computer vision, and autonomous navigation.' },
];

export const blogPosts = [
  { slug: 'building-reliable-robots', date: 'Engineering Note 01', title: 'Building reliable robots with clear verification', excerpt: 'Why robotics projects become stronger when simulation, hardware testing, and real measurements are clearly documented.', body: ['A visually impressive demo is exciting, but clear engineering documentation is what makes a project trustworthy.', 'When developing robotics systems, I make sure to document the exact hardware specs, code setup, sensor calibrations, and observed results.', 'The goal is to produce honest engineering work that anyone can inspect, verify, and learn from.'] },
  { slug: 'connecting-mechanical-and-code', date: 'Engineering Note 02', title: 'Connecting mechanical parts with microcontroller code', excerpt: 'What building a robotic arm taught me about mechanical limits, motor calibration, and software geometry.', body: ['The most interesting challenge in robotics is the intersection between physical parts and software.', 'A mathematical target point can look perfect on paper, but the real servo might have backlash, cable tension, or slightly different link lengths.', 'Solving those real world discrepancies is where robotics engineering becomes practical and rewarding.'] },
  { slug: 'local-first-automation', date: 'Engineering Note 03', title: 'Why I focus on local and lightweight automation tools', excerpt: 'The benefits of building fast, local desktop automation tools that work directly on your machine.', body: ['Heavy cloud services can be slow and unpredictable for simple desktop tasks.', 'Building local Python utilities with direct system access makes daily development workflows much faster, private, and dependable.', 'Focusing on lightweight tools that do one job well is often the best engineering approach.'] },
];

export function findProject(slug) { return projects.find((project) => project.slug === slug); }

export function relatedProjects(project, allProjects = projects, limit = 3) {
  const tags = new Set(project.tags || []);
  return allProjects
    .filter((item) => item.slug !== project.slug && item.published !== false)
    .map((item) => ({
      item,
      score: (item.eyebrow === project.eyebrow ? 4 : 0)
        + (item.scene === project.scene ? 2 : 0)
        + (item.tags || []).reduce((sum, tag) => sum + (tags.has(tag) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);
}
