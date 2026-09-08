import { useEffect } from 'react';

export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (window.matchMedia('(pointer: coarse)').matches) return undefined;

    const html = document.documentElement;
    html.classList.add('smooth-scroll-active');

    let target = window.scrollY || window.pageYOffset || 0;
    let current = target;
    let raf = 0;
    let isTouchingScrollbar = false;

    const maxScroll = () => Math.max(0, html.scrollHeight - window.innerHeight);
    const clamp = (value) => Math.max(0, Math.min(maxScroll(), value));

    const animate = () => {
      const distance = target - current;
      const damping = Math.abs(distance) > window.innerHeight * 0.55 ? 0.085 : 0.12;
      current += distance * damping;
      if (Math.abs(target - current) < 0.25) current = target;
      window.scrollTo({ top: current, left: 0, behavior: 'auto' });
      raf = Math.abs(target - current) > 0.2 ? window.requestAnimationFrame(animate) : 0;
    };

    const requestTick = () => {
      if (!raf) raf = window.requestAnimationFrame(animate);
    };

    const shouldBypass = (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey) return true;
      const targetEl = event.target instanceof Element ? event.target : null;
      if (!targetEl) return false;
      if (targetEl.closest('[data-native-scroll="true"]')) return true;
      const editable = targetEl.closest('input, textarea, select, [contenteditable="true"], [role="textbox"]');
      if (editable) return true;
      let node = targetEl;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const scrollableY = /(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight;
        if (scrollableY) return true;
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (event) => {
      if (shouldBypass(event) || isTouchingScrollbar) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      const delta = Math.max(-220, Math.min(220, event.deltaY * unit));
      target = clamp(target + delta * 1.08);
      requestTick();
    };

    const onKeyDown = (event) => {
      if (shouldBypass(event)) return;
      const step = window.innerHeight * 0.86;
      const map = {
        ArrowDown: 100,
        ArrowUp: -100,
        PageDown: step,
        PageUp: -step,
        Home: -Infinity,
        End: Infinity,
        ' ': event.shiftKey ? -step : step,
      };
      if (!(event.key in map)) return;
      event.preventDefault();
      if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = maxScroll();
      else target = clamp(target + map[event.key]);
      requestTick();
    };

    const syncTarget = () => {
      if (raf) return;
      target = clamp(window.scrollY || window.pageYOffset || 0);
      current = target;
    };

    const pointerDown = (event) => {
      isTouchingScrollbar = event.clientX >= window.innerWidth - 24;
    };
    const pointerUp = () => { isTouchingScrollbar = false; };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('scroll', syncTarget, { passive: true });
    window.addEventListener('resize', syncTarget, { passive: true });
    window.addEventListener('pointerdown', pointerDown, { passive: true });
    window.addEventListener('pointerup', pointerUp, { passive: true });

    return () => {
      html.classList.remove('smooth-scroll-active');
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', syncTarget);
      window.removeEventListener('resize', syncTarget);
      window.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointerup', pointerUp);
    };
  }, [enabled]);
}
