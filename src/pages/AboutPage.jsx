import React from 'react';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

export default function AboutPage() {
  const { site } = usePortfolioContent();

  return (
    <div className="inner-page about-page">
      <header className="page-hero">
        <span className="eyebrow">About Vivek Vala</span>
        <h1>Between the code and the machine.</h1>
        <p>
          I am a Robotics and Automation Engineering student based in Gujarat, India.
          My focus is on autonomous mobile robots, embedded microcontroller firmware, motor control
          electronics, and computer vision. I care about the places where software logic meets physical constraints.
        </p>
        <div className="about-hero-meta">
          <span>Gujarat, India</span>
          <span>B.E. Robotics &amp; Automation</span>
          <span>ROS 2 &amp; SLAM</span>
          <span>Embedded C &amp; KiCad</span>
        </div>
      </header>

      {/* Story & Background */}
      <section className="about-narrative content-surface">
        <div className="section-head">
          <span className="chapter-kicker">Background</span>
          <h2>How I got into robotics and automation.</h2>
          <p>
            My interest in robotics started from a simple curiosity: making physical objects move with precision through software.
          </p>
        </div>

        <div className="about-story-grid">
          <article className="about-story-card">
            <span className="about-step-num">01</span>
            <h3>From breadboards to autonomous navigation</h3>
            <p>
              I started by experimenting with basic microcontrollers, wiring motor drivers and ultrasonic sensors on breadboards.
              As projects grew, I quickly realized that writing code on a screen is only half the battle. Physical robots face
              mechanical backlash, wheel slip, electrical noise, and battery voltage drops that pure software never encounters.
            </p>
            <p>
              That realization pushed me to study the entire robotics stack in depth: learning control systems, modeling robot
              kinematics, building custom PCBs in KiCad, and implementing ROS 2 autonomous navigation with LiDAR SLAM.
            </p>
          </article>

          <article className="about-story-card">
            <span className="about-step-num">02</span>
            <h3>Building full closed-loop systems</h3>
            <p>
              I enjoy projects where hardware and software cannot be separated. Rather than treating embedded electronics
              as a black box or writing high-level algorithms in complete isolation, I like owning the full loop:
              routing the motor control circuits, writing bare-metal firmware in C, tuning PID speed control, and
              integrating high-level ROS 2 nodes on Linux.
            </p>
            <p>
              When a robot maps an unknown room autonomously or an articulated arm positions a payload accurately,
              it succeeds because every layer from power regulation to path planning is aligned.
            </p>
          </article>
        </div>
      </section>

      {/* Core Engineering Disciplines */}
      <section className="about-disciplines">
        <div className="section-head">
          <span className="chapter-kicker">Core Practice</span>
          <h2>What I work on day to day.</h2>
          <p>
            Four main engineering areas where I spend most of my development, testing, and prototyping time.
          </p>
        </div>

        <div className="about-disciplines-grid">
          <article className="about-discipline-card">
            <span className="discipline-num">01</span>
            <h3>Autonomous Mobile Robots</h3>
            <p>
              Configuring ROS 2 Nav2 navigation stacks, implementing LiDAR-based SLAM mapping, Gazebo 3D simulation,
              differential drive kinematics, costmap tuning, and autonomous path tracking.
            </p>
            <div className="discipline-tags">
              <span>ROS 2</span>
              <span>Nav2</span>
              <span>SLAM</span>
              <span>Gazebo</span>
              <span>LiDAR</span>
            </div>
          </article>

          <article className="about-discipline-card">
            <span className="discipline-num">02</span>
            <h3>Embedded Systems &amp; Firmware</h3>
            <p>
              Writing bare-metal and RTOS firmware in Embedded C and C++ on ESP32, Arduino, and microcontrollers.
              Configuring hardware timers, PWM motor drives, GPIO interrupts, and serial communication protocols.
            </p>
            <div className="discipline-tags">
              <span>Embedded C</span>
              <span>C++</span>
              <span>ESP32</span>
              <span>UART / I2C</span>
              <span>PWM</span>
            </div>
          </article>

          <article className="about-discipline-card">
            <span className="discipline-num">03</span>
            <h3>Electronics &amp; PCB Design</h3>
            <p>
              Designing schematics and 2-layer PCB layouts in KiCad. Integrating TI DRV8848 dual H-bridge motor drivers,
              reverse-polarity protection, decoupling capacitors, and safe power regulation.
            </p>
            <div className="discipline-tags">
              <span>KiCad</span>
              <span>PCB Layout</span>
              <span>DRV8848</span>
              <span>Motor Drivers</span>
              <span>Power Circuits</span>
            </div>
          </article>

          <article className="about-discipline-card">
            <span className="discipline-num">04</span>
            <h3>Computer Vision &amp; Practical AI</h3>
            <p>
              Building real-time computer vision pipelines with OpenCV and MediaPipe for object detection, color segmentation,
              hand gesture tracking, and connecting vision outputs directly to robot actuator actions.
            </p>
            <div className="discipline-tags">
              <span>OpenCV</span>
              <span>Python</span>
              <span>MediaPipe</span>
              <span>Color Tracking</span>
              <span>Gesture Control</span>
            </div>
          </article>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="about-principles content-surface">
        <div className="section-head">
          <span className="chapter-kicker">Engineering Principles</span>
          <h2>How I approach technical work.</h2>
          <p>
            Practical guidelines I return to when designing hardware, writing firmware, or debugging robots.
          </p>
        </div>

        <div className="about-principles__grid">
          <article>
            <span>01</span>
            <strong>Test on the physical bench early</strong>
            <p>
              Simulations verify logic, but physical test benches reveal electrical noise, thermal limits,
              and mechanical friction. I validate on real hardware as early as possible.
            </p>
          </article>

          <article>
            <span>02</span>
            <strong>Keep system boundaries clear</strong>
            <p>
              Modular code and clear hardware interfaces make debugging straightforward. Perception, planning,
              motor control, and telemetry should fail gracefully without cascading crashes.
            </p>
          </article>

          <article>
            <span>03</span>
            <strong>Design for noise and constraints</strong>
            <p>
              Real sensor readings drift, voltage dips under motor load, and mechanical components flex.
              Robust systems expect real-world imperfections and handle them by design.
            </p>
          </article>

          <article>
            <span>04</span>
            <strong>Honest and transparent documentation</strong>
            <p>
              Clear schematics, reproducible builds, and measured test data matter more than buzzwords.
              I document what works, what was simulated, and what remains to be built.
            </p>
          </article>
        </div>
      </section>

      {/* Career Goals & CTA */}
      <section className="page-cta">
        <h2>Open to robotics and embedded engineering roles.</h2>
        <p style={{ maxWidth: '640px', margin: '0 auto 1.8rem', color: 'var(--muted)', lineHeight: '1.75' }}>
          I am actively seeking internships and entry-level engineering opportunities in robotics,
          embedded firmware, automation, and hardware development. Let’s talk about what you’re building.
        </p>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="pill-button dark" to="/projects">View Projects ↗</Link>
          <Link className="pill-button" to="/resume">View Resume</Link>
          <Link className="pill-button" to="/contact">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
