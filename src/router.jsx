import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const RouterContext = createContext(null);

function normalize(path) {
  if (!path) return '/';
  const cleaned = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return cleaned || '/';
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));
  useEffect(() => {
    const onPop = () => setPath(normalize(window.location.pathname));
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const value = useMemo(() => ({
    path,
    navigate: (to) => {
      const next = normalize(to);
      if (next === path) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
      const commit = () => {
        window.history.pushState({}, '', next);
        setPath(next);
        window.scrollTo({ top: 0, behavior: 'auto' });
      };
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (!reduced && document.startViewTransition) document.startViewTransition(commit);
      else commit();
    },
  }), [path]);
  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() { return useContext(RouterContext); }

export function Link({ to, className = '', children, onClick, ...rest }) {
  const router = useRouter();
  return <a href={to} className={className} onClick={(event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || rest.target) return;
    event.preventDefault();
    onClick?.(event);
    router.navigate(to);
  }} {...rest}>{children}</a>;
}
