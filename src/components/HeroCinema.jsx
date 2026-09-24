import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

/**
 * HeroCinema — V7 Cinematic Engineering Hero
 * 
 * Renders a full-bleed cinematic hero with three layers:
 * 1. Poster image (always present — the Day 1 fallback)
 * 2. Video (optional enhancement — drops in from content store)
 * 3. WebGL telemetry overlay (animated coordinate markers)
 * 
 * The visual sits on the right 55-60% of the viewport.
 * The left 40-45% is transparent for the text content beneath.
 * 
 * Usage: <HeroCinema poster="/hero-cinema-poster.webp" />
 * With video: <HeroCinema poster="/hero-cinema-poster.webp" videoWebm="/hero-cinema.webm" videoMp4="/hero-cinema.mp4" />
 */

const TELEMETRY_POINTS = [
  { x: 62, y: 18, label: 'TF/MAP', value: '0.00' },
  { x: 78, y: 32, label: 'ODOM', value: '1.24' },
  { x: 68, y: 55, label: 'SCAN', value: '360°' },
  { x: 85, y: 68, label: 'BASE', value: 'OK' },
  { x: 72, y: 82, label: 'NAV2', value: 'IDLE' },
];

const TRAJECTORY_POINTS = [
  [58, 75], [62, 68], [67, 60], [71, 52], [74, 45],
  [76, 38], [78, 32], [80, 28], [82, 25], [85, 22],
];

function TelemetryOverlay({ reduced }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => t + 1), 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <svg
      className="hero-cinema__telemetry"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Measurement grid lines */}
      {[20, 40, 60, 80].map((v) => (
        <React.Fragment key={v}>
          <line x1={v} y1="0" x2={v} y2="100" className="hero-cinema__grid-line" />
          <line x1="0" y1={v} x2="100" y2={v} className="hero-cinema__grid-line" />
        </React.Fragment>
      ))}

      {/* Trajectory path */}
      <polyline
        points={TRAJECTORY_POINTS.map(([x, y]) => `${x},${y}`).join(' ')}
        className="hero-cinema__trajectory"
      />

      {/* Coordinate frame markers */}
      {TELEMETRY_POINTS.map((pt, i) => {
        const visible = reduced || i <= (tick % (TELEMETRY_POINTS.length + 2));
        return (
          <g
            key={pt.label}
            className={`hero-cinema__marker ${visible ? 'visible' : ''}`}
            style={{ '--delay': `${i * 0.18}s` }}
          >
            {/* Crosshair */}
            <line x1={pt.x - 1.2} y1={pt.y} x2={pt.x + 1.2} y2={pt.y} className="hero-cinema__cross" />
            <line x1={pt.x} y1={pt.y - 1.2} x2={pt.x} y2={pt.y + 1.2} className="hero-cinema__cross" />
            {/* Dot */}
            <circle cx={pt.x} cy={pt.y} r="0.4" className="hero-cinema__dot" />
            {/* Label */}
            <text x={pt.x + 1.8} y={pt.y - 0.8} className="hero-cinema__label">
              {pt.label}
            </text>
            <text x={pt.x + 1.8} y={pt.y + 1.2} className="hero-cinema__value">
              {pt.value}
            </text>
          </g>
        );
      })}

      {/* Coordinate frame at center of visual area */}
      <g className="hero-cinema__frame" transform="translate(75, 50)">
        {/* X axis - red */}
        <line x1="0" y1="0" x2="5" y2="0" stroke="#c75050" strokeWidth="0.25" opacity="0.6" />
        <text x="6" y="0.5" fill="#c75050" fontSize="1.4" opacity="0.5">x</text>
        {/* Y axis - green */}
        <line x1="0" y1="0" x2="0" y2="-5" stroke="#50a050" strokeWidth="0.25" opacity="0.6" />
        <text x="0.5" y="-5.5" fill="#50a050" fontSize="1.4" opacity="0.5">y</text>
        {/* Z axis - blue */}
        <line x1="0" y1="0" x2="-3" y2="-3" stroke="#5070c0" strokeWidth="0.25" opacity="0.6" />
        <text x="-4.5" y="-3.5" fill="#5070c0" fontSize="1.4" opacity="0.5">z</text>
      </g>
    </svg>
  );
}

export default function HeroCinema({
  poster,
  videoWebm,
  videoMp4,
  reduced = false,
}) {
  const videoRef = useRef(null);
  const [posterError, setPosterError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const hasVideo = Boolean(videoWebm || videoMp4);

  const handleVideoCanPlay = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoError(true);
  }, []);

  return (
    <div className="hero-cinema" aria-hidden="true">
      {/* Layer 1: Poster (optional static fallback) */}
      {poster && !posterError && (
        <img
          src={poster}
          alt=""
          className={`hero-cinema__poster ${videoLoaded ? 'hero-cinema__poster--hidden' : ''}`}
          loading="eager"
          fetchPriority="high"
          draggable="false"
          onError={() => setPosterError(true)}
        />
      )}

      {/* Layer 2: Video (optional enhancement) */}
      {hasVideo && !videoError && (
        <video
          ref={videoRef}
          className={`hero-cinema__video ${videoLoaded ? 'hero-cinema__video--loaded' : ''}`}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoCanPlay}
          onError={handleVideoError}
        >
          {videoWebm && <source src={videoWebm} type="video/webm" />}
          {videoMp4 && <source src={videoMp4} type="video/mp4" />}
        </video>
      )}

      {/* Layer 3: Telemetry overlay */}
      <TelemetryOverlay reduced={reduced} />

      {/* Left fade: transparent → paper gradient (text reading area) */}
      <div className="hero-cinema__fade-left" />

      {/* Bottom fade: blend into page background */}
      <div className="hero-cinema__fade-bottom" />
    </div>
  );
}
