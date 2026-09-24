import React, { Suspense, lazy, useEffect, useMemo } from 'react';
import { useRouter } from './router';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { usePortfolioContent } from './hooks/usePortfolioContent';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const ExperiencePage = lazy(() => import('./pages/ExperiencePage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const ResumePage = lazy(() => import('./pages/ResumePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const StudioPage = lazy(() => import('./pages/StudioPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const pretty = (value = '') => value.replaceAll('-', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function ensureMeta(selector, attributes) {
  let node = document.head.querySelector(selector);
  if (!node) { node = document.createElement('meta'); document.head.appendChild(node); }
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
}

function LoadingRoute() {
  return <div className="route-loading" role="status" aria-live="polite"><span>Loading</span><i /><i /><i /></div>;
}

function routeElement(path) {
  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/projects') return <ProjectsPage />;
  if (path === '/skills') return <SkillsPage />;
  if (path === '/experience') return <ExperiencePage />;
  if (path === '/blog') return <BlogPage />;
  if (path === '/resume') return <ResumePage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/studio') return <StudioPage />;
  if (path.startsWith('/projects/')) return <ProjectPage slug={path.split('/')[2]} />;
  if (path.startsWith('/blog/')) return <BlogPostPage slug={path.split('/')[2]} />;
  return <NotFoundPage />;
}

export default function App() {
  const { path } = useRouter();
  const content = usePortfolioContent();
  const { site, projects, blogPosts } = content;
  const seo = useMemo(() => {
    const project = path.startsWith('/projects/') ? projects.find((p) => p.slug === path.split('/')[2]) : null;
    const note = path.startsWith('/blog/') ? blogPosts.find((p) => p.slug === path.split('/')[2]) : null;
    if (project) return { title: `${project.title} — ${site.name}`, description: project.summary, type: 'article', found: true };
    if (note) return { title: `${note.title} — ${site.name}`, description: note.excerpt, type: 'article', found: true };
    const known = ['/', '/about', '/projects', '/skills', '/experience', '/blog', '/resume', '/contact', '/studio'].includes(path);
    return { title: path === '/' ? `${site.name} — ${site.role}` : `${pretty(path.split('/').filter(Boolean).pop() || 'Portfolio')} — ${site.name}`, description: site.strapline, type: 'website', found: known };
  }, [path, projects, blogPosts, site]);

  useEffect(() => {
    document.title = seo.title;
    ensureMeta('meta[name="description"]', { name: 'description', content: seo.description });
    ensureMeta('meta[name="robots"]', { name: 'robots', content: path === '/studio' || !seo.found ? 'noindex,nofollow' : 'index,follow' });
    ensureMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    ensureMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    ensureMeta('meta[property="og:type"]', { property: 'og:type', content: seo.type });
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    const canonical = document.querySelector('link[rel="canonical"]') || document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'canonical' }));
    canonical.href = `${window.location.origin}${path}`;
    let structured = document.getElementById('portfolio-jsonld');
    if (!structured) { structured = document.createElement('script'); structured.id = 'portfolio-jsonld'; structured.type = 'application/ld+json'; document.head.appendChild(structured); }
    structured.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: site.name, jobTitle: site.role, email: `mailto:${site.email}`, url: window.location.origin, sameAs: [site.github, site.linkedin].filter(Boolean), knowsAbout: ['Robotics', 'ROS 2', 'Embedded Systems', 'Computer Vision', 'Autonomous Systems', 'Software Engineering'] });
    window.setTimeout(() => document.getElementById('main')?.focus({ preventScroll: true }), 0);
  }, [path, seo, site]);

  return <Layout route={path}><ErrorBoundary resetKey={path}><Suspense fallback={<LoadingRoute />}>{routeElement(path)}</Suspense></ErrorBoundary></Layout>;
}
