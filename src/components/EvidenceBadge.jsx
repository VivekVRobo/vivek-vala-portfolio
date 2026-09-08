import React from 'react';
export default function EvidenceBadge({ type, children }) {
  return <span className={`evidence-badge evidence-badge--${type}`}>{children}</span>;
}
