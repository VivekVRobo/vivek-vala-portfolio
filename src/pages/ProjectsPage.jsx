import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

export default function ProjectsPage() {
  const { projects } = usePortfolioContent();
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const searchRef = useRef(null);
  const publicProjects = useMemo(() => projects.filter((p) => p.published !== false), [projects]);
  const categories = useMemo(() => ['All', ...new Set(publicProjects.map((p) => p.eyebrow))], [publicProjects]);
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publicProjects
      .filter((p) => filter === 'All' || p.eyebrow === filter)
      .filter((p) => !q || [p.title, p.summary, p.eyebrow, p.status, ...(p.tags || [])].join(' ').toLowerCase().includes(q))
      .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  }, [publicProjects, filter, query]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) { event.preventDefault(); searchRef.current?.focus(); }
      if (event.key === 'Escape' && document.activeElement === searchRef.current) { setQuery(''); searchRef.current.blur(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return <div className="inner-page"><header className="page-hero"><span className="eyebrow">Project index / {publicProjects.length} case studies</span><h1>Built across software and the physical world.</h1><p>These pages are intentionally evidence-aware: code, simulation, physical validation, and future milestones are labeled differently instead of being flattened into the same “finished project” language.</p></header><section className="project-index content-surface"><div className="project-tools"><label className="project-search"><span>Search</span><input ref={searchRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="SLAM, C++, vision, Arduino…" aria-label="Search projects" /><kbd>/</kbd></label><div className="filter-row" aria-label="Project filters">{categories.map((c) => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div></div><p className="project-count" aria-live="polite">Showing {visible.length} of {publicProjects.length} projects</p>{visible.length ? <div className="project-grid project-grid--index">{visible.map((p) => <ProjectCard key={p.slug} project={p} />)}</div> : <div className="empty-state"><strong>No project matches that search.</strong><button className="text-button" onClick={() => { setQuery(''); setFilter('All'); }}>Clear search and filters</button></div>}</section></div>;
}
