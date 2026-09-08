import React from 'react';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

export default function ExperiencePage() {
  const { experience, education, capabilities, projects } = usePortfolioContent();
  const proof = projects.filter((p) => p.published !== false).sort((a, b) => (a.order ?? 99) - (b.order ?? 99)).slice(0, 4);
  return <div className="inner-page">
    <header className="page-hero"><span className="eyebrow">Experience / education</span><h1>Learning through systems that have constraints.</h1><p>The timeline is intentionally concise. Projects carry most of the proof; this page provides the academic and professional context around them.</p></header>
    <section className="timeline content-surface"><div className="section-head"><span className="chapter-kicker">Experience</span><h2>Professional context.</h2></div>{experience.map((x, i) => <article key={`${x.role}-${i}`}><span>{x.period}</span><div><h3>{x.role}</h3><strong>{x.org}</strong><p>{x.detail}</p></div></article>)}</section>
    <section className="timeline content-surface timeline--education"><div className="section-head"><span className="chapter-kicker">Education</span><h2>Formal foundation.</h2></div>{education.map((x, i) => <article key={`${x.role}-${i}`}><span>{x.period}</span><div><h3>{x.role}</h3><strong>{x.org}</strong><p>{x.detail}</p></div></article>)}</section>
    <section className="experience-practice content-surface"><div className="section-head"><span className="chapter-kicker">Current practice</span><h2>What I’m actively getting better at.</h2><p>Instead of padding a student résumé with vague experience claims, I use projects to practice these engineering layers directly.</p></div><div className="practice-grid">{capabilities.map(([name, detail], i) => <article key={name}><span>{String(i + 1).padStart(2, '0')}</span><strong>{name}</strong><p>{detail}</p></article>)}</div></section>
    <section className="experience-proof"><div><span className="chapter-kicker">Proof of work</span><h2>The projects carry the technical signal.</h2></div><div>{proof.map((project) => <Link key={project.slug} to={`/projects/${project.slug}`}><span>{project.index}</span><strong>{project.title}</strong><em>{project.eyebrow}</em><b>↗</b></Link>)}</div></section>
  </div>;
}
