import { useEffect, useState } from 'react';

export function useActiveSection(ids = [], rootMargin = '-32% 0px -56% 0px') {
  const [active, setActive] = useState(ids[0] || '');

  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === 'undefined') return undefined;
    const nodes = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!nodes.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible[0]?.target?.id) setActive(visible[0].target.id);
    }, { rootMargin, threshold: [0.01, 0.15, 0.35, 0.6] });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [ids.join('|'), rootMargin]);

  return active;
}
