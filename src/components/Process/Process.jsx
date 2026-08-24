import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Process.css';

export function Process({ portfolio }) {
  return (
    <section className="process section">
      <h2>MY PROCESS</h2>
      <div className="process-timeline">
        {portfolio.process.map(([num, title, text], i) => (
          <div className="timeline-step" key={num}>
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <strong className="step-number">{num}</strong>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
