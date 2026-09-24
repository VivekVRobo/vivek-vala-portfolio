import React, { useMemo } from 'react';
import { useRouter } from '../router';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { usePortfolioContent } from '../hooks/usePortfolioContent';

/**
 * AmbientBlobs — Hardware-accelerated fluid atmospheric lighting system.
 * 
 * Renders 4 organic, softly blurred gradient orbs matching the palette:
 * - Sand / Limestone (#D7C7AE)
 * - Eucalyptus Sage (#9AA596)
 * - Mist Sky Blue (#A9BBC4)
 * - Terracotta Clay (#B98569)
 * 
 * Features:
 * - Continuous, non-repeating multi-axis drift via CSS @keyframes
 * - Route reactivity: accentuates relevant hue on project case studies
 * - Full accessibility: freezes gracefully on prefers-reduced-motion
 */
export default function AmbientBlobs() {
  const { path } = useRouter();
  const { projects } = usePortfolioContent();
  const reduced = useReducedMotion();

  // Determine active accent if viewing a project
  const currentAccent = useMemo(() => {
    if (!path.startsWith('/projects/')) return 'default';
    const slug = path.split('/')[2];
    const project = projects.find((p) => p.slug === slug);
    return project?.accent || 'default';
  }, [path, projects]);

  return (
    <div
      className={`ambient-blobs ${reduced ? 'ambient-blobs--reduced' : ''} ambient-blobs--accent-${currentAccent}`}
      aria-hidden="true"
    >
      <div className="ambient-blob ambient-blob--sand" />
      <div className="ambient-blob ambient-blob--sage" />
      <div className="ambient-blob ambient-blob--sky" />
      <div className="ambient-blob ambient-blob--clay" />
    </div>
  );
}
