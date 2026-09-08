import React, { useMemo } from 'react';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

const technicalGroups = [
  {
    name: 'Robotics & Control',
    items: ['ROS 2', 'SLAM', 'Gazebo', 'Kinematics', 'PID control', 'Localization', 'LiDAR', 'Robot validation'],
    linkedProjects: [
      { title: 'SLAM Robot (ROS 2)', slug: 'slam-robot-ros2' },
      { title: '3-DOF Robotic Arm', slug: '3dof-robotic-arm' },
      { title: 'Line Following Robot', slug: 'line-following-robot' },
    ],
  },
  {
    name: 'Embedded & Electronics',
    items: ['Arduino', 'Microcontrollers', 'PCA9685', 'Serial protocols', 'Motor control', 'KiCad', 'PCB reasoning', 'Hardware safety'],
    linkedProjects: [
      { title: 'Custom PCB Motor Driver', slug: 'custom-pcb-motor-driver' },
      { title: '3-DOF Robotic Arm', slug: '3dof-robotic-arm' },
    ],
  },
  {
    name: 'Computer Vision & Interaction',
    items: ['OpenCV', 'MediaPipe', 'HSV pipelines', 'Computer vision', 'Gesture interaction', 'Sensor calibration'],
    linkedProjects: [
      { title: 'CV Object Sorter', slug: 'cv-object-sorter' },
      { title: 'Gesture-Controlled Arm', slug: 'gesture-controlled-robotic-arm' },
    ],
  },
  {
    name: 'Software Engineering & Systems',
    items: ['Python', 'C++20', 'Networking', 'HTTP', 'Linux epoll', 'Testing', 'CI', 'Benchmark tooling'],
    linkedProjects: [
      { title: 'HTTP Server from Scratch', slug: 'http-server-from-scratch' },
    ],
  },
  {
    name: 'Intelligent Systems & Autonomy',
    items: ['Agent architecture', 'Memory systems', 'Tool orchestration', 'Local-first AI', 'Runtime contracts', 'Human-robot interaction'],
    linkedProjects: [
      { title: 'JARVIS Desktop Assistant', slug: 'jarvis' },
      { title: 'Aurelia-chan Agent', slug: 'aurelia-chan' },
      { title: 'Robotic Character Interface', slug: 'robotic-character-interface' },
    ],
  },
];

export default function SkillsPage() {
  const { capabilities, projects } = usePortfolioContent();
  const proof = useMemo(
    () =>
      projects
        .filter((project) => project.published !== false)
        .sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
        .slice(0, 6),
    [projects]
  );

  return (
    <div className="inner-page skills-page">
      <header className="page-hero page-hero--split">
        <div>
          <span className="eyebrow">Skills / engineering practice</span>
          <h1>Tools matter most when they are connected to a system.</h1>
          <p>
            I do not treat a technology list as proof by itself. These are the engineering layers
            I repeatedly use across robotics, embedded work, computer vision, systems software, and
            intelligent interfaces.
          </p>
        </div>
        <aside className="page-hero-note">
          This page shows technical capability. Every capability connects directly to the repository
          where it was measured, validated, and constrained.
        </aside>
      </header>

      <section className="skills-capabilities content-surface">
        <div className="section-head">
          <span className="chapter-kicker">01 / Core disciplines</span>
          <h2>Five connected engineering layers.</h2>
        </div>
        <div className="skills-capability-grid">
          {capabilities.map(([name, detail], index) => (
            <article key={name}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{name}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-stack">
        <div className="section-head">
          <span className="chapter-kicker">02 / Technical stack</span>
          <h2>What I reach for while building.</h2>
          <p>Grouped by discipline and connected directly to verified project evidence.</p>
        </div>
        <div className="skills-stack__grid">
          {technicalGroups.map((group, index) => (
            <article key={group.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <div>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong style={{ display: 'block', fontSize: '1.25rem', marginTop: '0.2rem' }}>{group.name}</strong>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <div style={{ marginTop: '0.4rem', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.6rem' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted, #6a6b65)', display: 'block', marginBottom: '0.3rem' }}>Verified in:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {group.linkedProjects.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/projects/${p.slug}`}
                      style={{ fontSize: '0.82rem', padding: '0.2rem 0.6rem', background: '#fffdf8', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '999px', textDecoration: 'none', color: '#2D302D' }}
                    >
                      {p.title} ↗
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-proof content-surface">
        <div className="section-head">
          <span className="chapter-kicker">03 / Proof of use</span>
          <h2>Skills connected to real project decisions.</h2>
        </div>
        <div className="skills-proof__list">
          {proof.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <span>{project.index}</span>
              <strong>{project.title}</strong>
              <em>{project.tags.slice(0, 4).join(' · ')}</em>
              <b>↗</b>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
