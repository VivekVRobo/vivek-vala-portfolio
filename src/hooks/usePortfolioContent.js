import { useEffect, useState } from 'react';
import { loadContent } from '../content/store';
export function usePortfolioContent() {
  const [content, setContent] = useState(loadContent);
  useEffect(() => {
    const refresh = () => setContent(loadContent());
    window.addEventListener('storage', refresh);
    window.addEventListener('portfolio-content-change', refresh);
    return () => { window.removeEventListener('storage', refresh); window.removeEventListener('portfolio-content-change', refresh); };
  }, []);
  return content;
}
