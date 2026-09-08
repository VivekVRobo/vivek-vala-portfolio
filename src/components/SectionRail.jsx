import React from 'react';
import { useActiveSection } from '../hooks/useActiveSection';

export default function SectionRail({ items, label = 'On this page', compact = false }) {
  const ids = items.map((item) => item.id);
  const active = useActiveSection(ids);
  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return <nav className={`section-rail ${compact ? 'section-rail--compact' : ''}`} aria-label={label}>
    <span className="section-rail__label">{label}</span>
    <div>{items.map((item, index) => <button key={item.id} className={active === item.id ? 'active' : ''} onClick={() => jump(item.id)} aria-current={active === item.id ? 'location' : undefined}><i>{String(index + 1).padStart(2, '0')}</i><span>{item.label}</span></button>)}</div>
  </nav>;
}
