import React from 'react';
import './Experience.css';

export function Experience({ portfolio }) {
  return (
    <section id="experience" className="experience section">
      <div className="experience-header">
        <h2>Experience</h2>
      </div>
      
      <div className="experience-list">
        {portfolio.experience.map(e => (
          <div className="experience-item" key={e.title}>
            <div className="experience-date">
              <span>{e.date}</span>
            </div>
            <div className="experience-info">
              <h3>{e.title}</h3>
              <p>{e.subtitle}</p>
              <ul className="details-bullets">
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
