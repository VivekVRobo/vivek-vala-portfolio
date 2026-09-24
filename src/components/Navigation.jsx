import React, { useEffect, useState } from 'react';
import { Link, useRouter } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { useScenePreference } from '../hooks/useScenePreference';

const links = [['Projects', '/projects'], ['Skills', '/skills'], ['Experience', '/experience'], ['About', '/about'], ['Notes', '/blog'], ['Contact', '/contact']];
const activeFor = (path, to) => path === to || (to === '/projects' && path.startsWith('/projects/')) || (to === '/blog' && path.startsWith('/blog/'));

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const { site } = usePortfolioContent();
  const { enabled: sceneEnabled, toggle: toggleScene } = useScenePreference();
  useEffect(() => setOpen(false), [path]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [open]);
  return <><header className="nav"><Link className="brand" to="/" aria-label="Home"><span>{site.monogram}</span><strong>{site.name}</strong></Link><nav className="nav-links" aria-label="Primary">{links.map(([label, to]) => <Link key={to} to={to} className={activeFor(path, to) ? 'active' : ''} aria-current={activeFor(path, to) ? 'page' : undefined}>{label}</Link>)}</nav><div className="nav-actions"><button className="scene-toggle" onClick={toggleScene} aria-pressed={sceneEnabled} title="Toggle the live 3D scene"><span className={sceneEnabled ? 'on' : ''} />3D {sceneEnabled ? 'On' : 'Off'}</button><Link to="/resume" className={activeFor(path, '/resume') ? 'nav-resume active' : 'nav-resume'}>Resume</Link><button className="menu-button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-menu">{open ? 'Close' : 'Menu'}</button></div></header><div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`} aria-hidden={!open}>{links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}<Link to="/resume">Resume</Link><button className="mobile-scene-toggle" onClick={toggleScene}>3D Scene: {sceneEnabled ? 'On' : 'Off'}</button></div></>;
}
