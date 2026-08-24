import React from 'react';
import './Stats.css';

export function Stats({ portfolio }) {
  return (
    <section className="stats">
      {portfolio.stats.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-body">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
