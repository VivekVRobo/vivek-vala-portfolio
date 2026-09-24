import React from 'react';
import { Link } from '../router';

export default function ProjectCard({ project, compact = false }) {
  const hasVideo = project.media?.some((m) => m.type === 'video' && m.url);
  return <article className={`project-card ${compact ? 'project-card--compact' : ''}`} data-accent={project.accent}>
    <div className="project-card__top">
      <span className="project-number">{project.index}</span>
      <span className="eyebrow">{project.eyebrow}</span>
    </div>
    <div className="project-status">
      {hasVideo && <span className="project-video-pill">📹 Video demo</span>}
      <span>{project.status}</span>
    </div>
    <h3>{project.title}</h3>
    <p>{project.summary}</p>
    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    <div className="project-actions">
      <Link className="text-button" to={`/projects/${project.slug}`}>Open case study <span>↗</span></Link>
      <a className="text-link" href={project.github} target="_blank" rel="noreferrer">GitHub</a>
    </div>
  </article>;
}
