export function interpolateKeyframes(frames, t) {
  const clamped = Math.min(1, Math.max(0, t));
  for (let i = 0; i < frames.length - 1; i += 1) {
    const a = frames[i];
    const b = frames[i + 1];
    if (clamped >= a.t && clamped <= b.t) {
      const p = (clamped - a.t) / Math.max(0.0001, b.t - a.t);
      const eased = p * p * (3 - 2 * p);
      return a.v.map((value, idx) => value + (b.v[idx] - value) * eased);
    }
  }
  return frames.at(-1).v;
}
