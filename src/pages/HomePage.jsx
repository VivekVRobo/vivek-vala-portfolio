import React from 'react';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { useReducedMotion } from '../hooks/useReducedMotion';
import HeroCinema from '../components/HeroCinema';

const siteSections = [
  {
    title: 'Projects',
    path: '/projects',
    description: 'Browse all 10 robotics, electronics, and software projects with architecture diagrams and source code.',
  },
  {
    title: 'Skills',
    path: '/skills',
    description: 'Technical tools, programming languages, microcontrollers, and hardware platforms I work with.',
  },
  {
    title: 'Experience',
    path: '/experience',
    description: 'Embedded systems internship, academic background, and practical engineering coursework.',
  },
  {
    title: 'Lab Prototypes',
    path: '/lab',
    description: 'Experimental scripts, automation tools, desktop utilities, and early prototypes.',
  },
  {
    title: 'About Me',
    path: '/about',
    description: 'My background, engineering focus, and personal journey building physical and digital systems.',
  },
  {
    title: 'Engineering Notes',
    path: '/blog',
    description: 'Articles on robotics development, hardware debugging, kinematics, and lessons learned.',
  },
];

const focusAreas = [
  {
    category: 'Robotics',
    title: 'Autonomous Mobile Robots',
    description: 'ROS 2 navigation, Gazebo simulations, LiDAR mapping, and path planning algorithms.',
    tools: ['ROS 2', 'SLAM', 'Gazebo', 'LiDAR', 'Nav2'],
  },
  {
    category: 'Hardware',
    title: 'Embedded Systems and Firmware',
    description: 'Microcontroller programming on Arduino and ESP32, motor controllers, sensor interfacing, and serial protocols.',
    tools: ['Arduino', 'ESP32', 'C and C++', 'UART', 'PWM'],
  },
  {
    category: 'Electronics',
    title: 'Circuit and PCB Design',
    description: 'Schematic capture, PCB layout in KiCad, dual H bridge motor drivers, and power distribution.',
    tools: ['KiCad', 'Schematics', 'DRV8848', 'Power Filtering'],
  },
  {
    category: 'Software',
    title: 'Computer Vision and Automation',
    description: 'Real time camera tracking with OpenCV, object detection, visual sorting, and Python desktop automation.',
    tools: ['Python', 'OpenCV', 'MediaPipe', 'System Tools'],
  },
];

export default function HomePage() {
  const { site, projects } = usePortfolioContent();
  const reduced = useReducedMotion();
  const featured = projects.slice(0, 4);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="clean-hero" id="hero">
        <HeroCinema
          poster={site.heroCinema?.poster || '/hero-cinema-poster.webp'}
          videoWebm={site.heroCinema?.enabled ? site.heroCinema?.webm : undefined}
          videoMp4={site.heroCinema?.enabled ? site.heroCinema?.mp4 : undefined}
          reduced={reduced}
        />
        <div className="clean-hero__content">
          <span className="clean-tag">Robotics and Automation Engineering</span>
          <h1 className="clean-hero__name">Vivek Vala</h1>
          <p className="clean-hero__headline">{site.headline}</p>
          <p className="clean-hero__intro">{site.intro}</p>

          <div className="clean-hero__actions">
            <Link to="/projects" className="clean-btn primary">
              View Projects →
            </Link>
            <Link to="/resume" className="clean-btn secondary">
              View Resume
            </Link>
            <Link to="/contact" className="clean-btn secondary">
              Contact Me
            </Link>
          </div>

          <div className="clean-hero__quickinfo">
            <div className="quickinfo-item">
              <span className="quickinfo-label">Current Role</span>
              <strong className="quickinfo-value">{site.role}</strong>
            </div>
            <div className="quickinfo-item">
              <span className="quickinfo-label">Location</span>
              <strong className="quickinfo-value">{site.location}</strong>
            </div>
            <div className="quickinfo-item">
              <span className="quickinfo-label">Availability</span>
              <strong className="quickinfo-value">Open to internships and engineering roles</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="home-section" id="featured-projects">
        <div className="section-heading">
          <span className="clean-tag">Selected Work</span>
          <h2>Featured Engineering Projects</h2>
          <p>
            Practical robotics systems, hardware boards, and automation software built with complete source code and test documentation.
          </p>
        </div>

        <div className="clean-project-grid">
          {featured.map((project, index) => (
            <article key={project.slug} className="clean-project-card">
              <div className="project-card__top">
                <span className="project-card__index">0{index + 1}</span>
                <span className="project-card__eyebrow">{project.eyebrow}</span>
              </div>
              <h3 className="project-card__title">
                <Link to={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p className="project-card__summary">{project.summary}</p>
              <div className="project-card__tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="clean-pill">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="project-card__status">
                <span className="status-indicator" />
                <span>{project.status}</span>
              </div>
              <div className="project-card__footer">
                <Link to={`/projects/${project.slug}`} className="card-link primary">
                  Read Case Study →
                </Link>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="card-link secondary"
                  >
                    GitHub Code ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <Link to="/projects" className="clean-btn primary">
            View All 10 Projects →
          </Link>
        </div>
      </section>

      {/* Core Engineering Focus Section */}
      <section className="home-section" id="engineering-focus">
        <div className="section-heading">
          <span className="clean-tag">Areas of Practice</span>
          <h2>What I Work On</h2>
          <p>
            My core technical competencies spanning autonomous hardware, firmware, and software engineering.
          </p>
        </div>

        <div className="focus-grid">
          {focusAreas.map((area) => (
            <div key={area.title} className="focus-card">
              <span className="focus-card__category">{area.category}</span>
              <h3 className="focus-card__title">{area.title}</h3>
              <p className="focus-card__desc">{area.description}</p>
              <div className="focus-card__tools">
                {area.tools.map((tool) => (
                  <span key={tool} className="clean-pill small">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Site Directory Section */}
      <section className="home-section directory-section" id="directory">
        <div className="section-heading">
          <span className="clean-tag">Site Navigation</span>
          <h2>Explore the Portfolio</h2>
          <p>
            Direct links to detailed case studies, technical skills, resume, and contact details.
          </p>
        </div>

        <div className="clean-directory-grid">
          {siteSections.map((sec, i) => (
            <Link key={sec.path} to={sec.path} className="clean-dir-card">
              <div className="clean-dir-card__header">
                <span className="clean-dir-card__num">0{i + 1}</span>
                <h3 className="clean-dir-card__title">{sec.title}</h3>
                <span className="clean-dir-card__arrow">→</span>
              </div>
              <p className="clean-dir-card__desc">{sec.description}</p>
            </Link>
          ))}
        </div>

        <div className="resume-banner">
          <div className="resume-banner__text">
            <h3>Looking for my resume or internship inquiries?</h3>
            <p>
              You can review my printable resume or reach out directly by email.
            </p>
          </div>
          <div className="resume-banner__actions">
            <Link to="/resume" className="clean-btn primary">
              Open Resume →
            </Link>
            <Link to="/contact" className="clean-btn secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
