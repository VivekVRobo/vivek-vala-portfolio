import { useEffect, useState } from 'react';

const KEY = 'vivek-portfolio-scene-enabled';

export function useScenePreference() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return localStorage.getItem(KEY) !== 'false';
  });

  useEffect(() => {
    const sync = () => setEnabled(localStorage.getItem(KEY) !== 'false');
    window.addEventListener('portfolio-scene-change', sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener('portfolio-scene-change', sync); window.removeEventListener('storage', sync); };
  }, []);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    localStorage.setItem(KEY, String(next));
    window.dispatchEvent(new Event('portfolio-scene-change'));
  };

  return { enabled, toggle };
}
