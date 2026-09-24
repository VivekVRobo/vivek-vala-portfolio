import React from 'react';
import Navigation from './Navigation';
import SceneCanvas from './SceneCanvas';
import AmbientBlobs from './AmbientBlobs';
import ScrollMeter from './ScrollMeter';
import { Link } from '../router';
import { usePortfolioContent } from '../hooks/usePortfolioContent';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

export default function Layout({ route, children }) {
  const { site } = usePortfolioContent();
  const studio = route === '/studio';
  useSmoothScroll(!studio);
  return <div className={`site-shell route-${route === '/' ? 'home' : route.split('/')[1] || 'home'}`}>
    <a className="skip-link" href="#main">Skip to content</a>
    {!studio && <><SceneCanvas route={route} /><AmbientBlobs /><ScrollMeter /></>}
    {!studio && <div className="ambient-wash" aria-hidden="true" />}
    {!studio && <Navigation />}
    <main id="main" tabIndex="-1" key={route} className="route-enter">{children}</main>
    {!studio && <footer className="site-footer"><div><Link to="/" className="footer-brand">{site.name}</Link><span>{site.role}</span></div><div className="footer-links"><Link to="/projects">Projects</Link><Link to="/skills">Skills</Link><Link to="/experience">Experience</Link><Link to="/about">About</Link><a href={site.github} target="_blank" rel="noreferrer">GitHub ↗</a></div><div className="footer-fine"><span>{site.location}</span><span>Robotics and Automation Engineering Portfolio</span></div></footer>}
  </div>;
}
