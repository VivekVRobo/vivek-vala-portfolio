import React, { useEffect, useState } from 'react';

export default function ScrollMeter() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);
  return <div className="scroll-meter" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>;
}
