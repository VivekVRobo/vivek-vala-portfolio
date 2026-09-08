import { useEffect, useRef } from 'react';

export function useScrollProgress() {
  const progress = useRef(0);
  const velocity = useRef(0);
  useEffect(() => {
    let last = window.scrollY;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const now = window.scrollY;
      progress.current = Math.min(1, Math.max(0, now / max));
      velocity.current = now - last;
      last = now;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return { progress, velocity };
}
