import React, { useMemo, useRef, useState } from 'react';
import { Link } from '../router';
import EvidenceBadge from '../components/EvidenceBadge';
import ProjectCard from '../components/ProjectCard';
import SectionRail from '../components/SectionRail';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { relatedProjects } from '../content/site';

const railItems = [
  { id: 'case-question', label: 'Question' },
  { id: 'case-architecture', label: 'Architecture' },
  { id: 'case-decisions', label: 'Decisions' },
  { id: 'case-evidence', label: 'Evidence' },
  { id: 'case-testing', label: 'Validation' },
];

function EvidenceColumn({ type, title, items }) {
  if (!items?.length) return null;
  return <div className="evidence-column"><EvidenceBadge type={type}>{title}</EvidenceBadge><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function VideoShowcase({ item, project }) {
  return (
    <div className="case-video-showcase">
      <div className="case-video-frame">
        <div className="case-video-badge">
          <span className="live-dot" />
          <span>Physical Hardware Demo</span>
        </div>
        <div className="case-video-viewport">
          <video
            src={item.url}
            poster={item.poster || '/assets/projects/gesture-arm/video-poster.jpg'}
            controls
            preload="metadata"
            playsInline
            className="case-video-player"
          />
        </div>
        <span className="case-video-note">Continuous 22s uncut bench test</span>
      </div>

      <div className="case-video-meta">
        <span className="chapter-kicker">Physical Hardware Proof</span>
        <h3>Continuous gesture glove tracking and 3-DOF actuation.</h3>
        <p>{item.caption || 'Continuous uncut physical demonstration: wearable gesture glove driving gripper opening/closing and base panning in real time.'}</p>
        
        <div className="case-video-specs">
          <div className="spec-card">
            <span>Control Latency</span>
            <strong>&lt; 80 ms</strong>
            <small>Sensor to servo response</small>
          </div>
          <div className="spec-card">
            <span>Wireless Link</span>
            <strong>2.4 GHz</strong>
            <small>nRF24L01+ RF packet stream</small>
          </div>
          <div className="spec-card">
            <span>Firmware Target</span>
            <strong>ATmega328P</strong>
            <small>Hardware PWM generation</small>
          </div>
          <div className="spec-card">
            <span>Power Domain</span>
            <strong>5V / 3A Rail</strong>
            <small>Isolated servo power rail</small>
          </div>
        </div>

        <div className="case-video-footnote">
          <span>Bench Verification:</span> Tested with flex sensor glove for continuous open-loop and closed-loop position stability without brownout or servo chatter.
        </div>
      </div>
    </div>
  );
}

function MediaItem({ item, index, onOpen }) {
  if (item.type === 'image' && item.url) {
    return (
      <figure className="media-asset-card">
        <button
          className="media-open"
          onClick={() => onOpen(item)}
          aria-label={`Open ${item.caption || item.alt || 'project image'} larger`}
        >
          <img src={item.url} alt={item.alt || item.caption || 'Project evidence'} loading="lazy" />
          <span className="media-zoom-hint" aria-hidden="true">Enlarge ⤢</span>
        </button>
        <figcaption>
          {item.label && <strong>{item.label}</strong>}
          <p>{item.caption}</p>
        </figcaption>
      </figure>
    );
  }
  if (item.type === 'video' && item.url) {
    return (
      <figure className="media-asset-card">
        <div className="media-card-video">
          <video src={item.url} controls preload="metadata" playsInline poster={item.poster} />
        </div>
        <figcaption>
          {item.label && <strong>{item.label}</strong>}
          <p>{item.caption}</p>
        </figcaption>
      </figure>
    );
  }
  return (
    <div className={index === 0 ? 'media-slot media-slot--wide' : 'media-slot'}>
      <div className="media-slot__diagram" aria-hidden="true"><i /><i /><i /><b /><b /></div>
      <span>{item.label || 'Evidence slot'}</span>
      <strong>{item.caption || 'Add project media in Content Studio'}</strong>
    </div>
  );
}

function Snapshot({ project }) {
  const proofCount = (project.implemented?.length || 0) + (project.simulated?.length || 0);
  return <section className="case-snapshot content-surface" aria-label="Project snapshot">
    <div><span>Discipline</span><strong>{project.eyebrow}</strong></div>
    <div><span>Current maturity</span><strong>{project.status}</strong></div>
    <div><span>Evidence items</span><strong>{String(proofCount).padStart(2, '0')}</strong></div>
    <div><span>Core stack</span><strong>{(project.tags || []).slice(0, 3).join(' · ')}</strong></div>
  </section>;
}

export default function ProjectPage({ slug }) {
  const { projects } = usePortfolioContent();
  const publishedProjects = projects.filter((p) => p.published !== false).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const project = projects.find((p) => p.slug === slug && p.published !== false);
  const dialogRef = useRef(null);
  const [activeMedia, setActiveMedia] = useState(null);
  const [isInspecting, setIsInspecting] = useState(false);
  const dragOrigin = useRef({ x: 0, y: 0 });

  if (!project) return <div className="inner-page"><header className="page-hero"><span className="eyebrow">404 / Project</span><h1>That project isn’t in the public portfolio.</h1><Link className="pill-button dark" to="/projects">Back to projects</Link></header></div>;

  const handleInspectDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
    setIsInspecting(true);
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    window.dispatchEvent(
      new CustomEvent('portfolio-orbit-inspect', { detail: { active: true, dx: 0, dy: 0 } })
    );
  };

  const handleInspectMove = (e) => {
    if (!isInspecting) return;
    const dx = (e.clientX - dragOrigin.current.x) / window.innerWidth;
    const dy = (e.clientY - dragOrigin.current.y) / window.innerHeight;
    dragOrigin.current = { x: e.clientX, y: e.clientY };
    window.dispatchEvent(
      new CustomEvent('portfolio-orbit-inspect', { detail: { active: true, dx, dy } })
    );
  };

  const handleInspectUp = (e) => {
    if (!isInspecting) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
    setIsInspecting(false);
    window.dispatchEvent(
      new CustomEvent('portfolio-orbit-inspect', { detail: { active: false, dx: 0, dy: 0 } })
    );
  };

  const related = relatedProjects(project, publishedProjects);
  const index = publishedProjects.findIndex((item) => item.slug === project.slug);
  const next = publishedProjects[(index + 1) % publishedProjects.length];
  const media = project.media?.length ? project.media : [
    { type: 'placeholder', label: 'Hero evidence', caption: 'Prototype / simulation / system overview' },
    { type: 'placeholder', label: 'Engineering artifact', caption: 'Architecture / CAD / schematic' },
    { type: 'placeholder', label: 'Validation artifact', caption: 'Test output / benchmark / observation' },
  ];
  const openMedia = (item) => { setActiveMedia(item); window.setTimeout(() => dialogRef.current?.showModal(), 0); };
  const closeMedia = () => { dialogRef.current?.close(); setActiveMedia(null); };

  const videoItem = media.find((m) => m.type === 'video' && m.url);
  const secondaryMedia = videoItem ? media.filter((m) => m !== videoItem) : media;

  return <article className={`case-study case-study--${project.accent}`}>
    <SectionRail items={railItems} label="Case study" compact />
    <header className="case-hero">
      <div className="case-hero__copy">
        <div className="case-meta">
          <span>{project.index}</span>
          <span>{project.eyebrow}</span>
          <span>{project.status}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="tag-row">{project.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="hero-actions">
          <a className="pill-button dark" href={project.github} target="_blank" rel="noreferrer">Inspect repository ↗</a>
          {videoItem && (
            <a className="pill-button" href="#case-media">Watch demo video 📹</a>
          )}
          {project.live && <a className="pill-button" href={project.live} target="_blank" rel="noreferrer">Live demo ↗</a>}
          {project.docs && <a className="pill-button" href={project.docs} target="_blank" rel="noreferrer">Documentation ↗</a>}
          <Link className="pill-button" to="/projects">All projects</Link>
        </div>
      </div>
      <div
        className={`case-hero__space ${isInspecting ? 'is-inspecting' : ''}`}
        onPointerDown={handleInspectDown}
        onPointerMove={handleInspectMove}
        onPointerUp={handleInspectUp}
        onPointerCancel={handleInspectUp}
        role="region"
        aria-label={`Interactive 3D model viewport for ${project.title}`}
      >
        <div className="case-scene-label">
          <span>Spatial model</span>
          <strong>{project.scene}</strong>
        </div>
        <div className={`case-inspect-badge ${isInspecting ? 'is-active' : ''}`} aria-hidden="true">
          <span className="inspect-icon">⟳</span>
          <span>{isInspecting ? 'Rotating 360° · Release to spring back' : 'Drag to inspect 360°'}</span>
        </div>
      </div>
    </header>

    <Snapshot project={project} />

    <section id="case-question" className="case-overview content-surface"><div><span className="chapter-kicker">01 / Engineering question</span><h2>{project.problem}</h2></div><aside><strong>My role</strong><p>{project.role}</p><strong>Approach</strong><p>{project.approach}</p></aside></section>

    <section id="case-architecture" className="case-architecture content-surface"><div className="section-head"><span className="chapter-kicker">02 / System architecture</span><h2>Layers that have to agree.</h2><p>Each layer exists because the project gets weaker when one of these boundaries becomes implicit.</p></div><div className="architecture-flow">{project.architecture.map(([name, detail], i) => <div key={`${name}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span><strong>{name}</strong><p>{detail}</p>{i < project.architecture.length - 1 && <b aria-hidden="true">→</b>}</div>)}</div></section>

    <section id="case-decisions" className="case-decisions content-surface"><div className="section-head"><span className="chapter-kicker">03 / Engineering decisions</span><h2>Deliberate constraints.</h2></div><ol>{project.decisions.map((decision, i) => <li key={`${decision}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span><p>{decision}</p></li>)}</ol></section>

    <section id="case-media" className="case-media content-surface">
      <div className="section-head">
        <span className="chapter-kicker">04 / Media &amp; evidence</span>
        <h2>Artifacts, not decoration.</h2>
        <p>Physical hardware bench demonstrations, circuit captures, and engineering documentation.</p>
      </div>

      {videoItem && (
        <VideoShowcase item={videoItem} project={project} />
      )}

      {secondaryMedia.length > 0 && (
        <div className="media-grid">
          {secondaryMedia.map((item, i) => (
            <MediaItem item={item} index={i} onOpen={openMedia} key={`${item.type}-${item.url || item.label}-${i}`} />
          ))}
        </div>
      )}
    </section>

    <section id="case-evidence" className="case-evidence content-surface"><div className="section-head"><span className="chapter-kicker">05 / Claim boundaries</span><h2>What the evidence actually says.</h2><p className="evidence-intro">Implemented means present in the repository or system. Simulated means evidence exists only in a software/digital environment. Planned means the next proof milestone—not a completed claim.</p></div><div className="evidence-grid"><EvidenceColumn type="implemented" title="Implemented" items={project.implemented} /><EvidenceColumn type="simulated" title="Simulated / reference" items={project.simulated} /><EvidenceColumn type="planned" title="Planned / evidence-gated" items={project.planned} /></div></section>

    <section id="case-testing" className="case-testing content-surface"><div><span className="chapter-kicker">06 / Testing</span><h2>How I think about validation.</h2><p>{project.testing}</p></div><aside><span className="chapter-kicker">07 / Lesson</span><blockquote>{project.lessons}</blockquote></aside></section>

    <section className="case-future"><span className="chapter-kicker">08 / Next iteration</span><h2>{project.future}</h2><div className="hero-actions"><a className="pill-button dark" href={project.github} target="_blank" rel="noreferrer">Open GitHub ↗</a><Link className="pill-button" to="/contact">Discuss this work</Link></div></section>

    <section className="related content-surface"><div className="section-head"><span className="chapter-kicker">Related by discipline</span><h2>Continue through connected work.</h2></div><div className="project-grid">{related.map((p) => <ProjectCard key={p.slug} project={p} compact />)}</div></section>

    {next && <section className="next-project"><span className="chapter-kicker">Next case study · {next.index}</span><Link to={`/projects/${next.slug}`}><strong>{next.title}</strong><span>Continue ↗</span></Link></section>}

    <dialog ref={dialogRef} className="media-dialog" onClick={(event) => { if (event.target === dialogRef.current) closeMedia(); }}>
      <div className="media-dialog__content">
        <button className="media-dialog__close" onClick={closeMedia} aria-label="Close dialog">✕</button>
        {activeMedia?.url && activeMedia.type === 'video' ? (
          <video src={activeMedia.url} controls autoPlay playsInline className="media-dialog__video" />
        ) : activeMedia?.url ? (
          <img src={activeMedia.url} alt={activeMedia.alt || activeMedia.caption || 'Project media'} />
        ) : null}
        {activeMedia?.caption && <p>{activeMedia.caption}</p>}
      </div>
    </dialog>
  </article>;
}
