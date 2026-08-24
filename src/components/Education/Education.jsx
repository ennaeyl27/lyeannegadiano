import React from 'react';
import './Education.css';

export function Education({ portfolio }) {
  return (
    <section className="education section">
      <h2>EDUCATION</h2>
      {portfolio.education.map(e => (
        <div className="edu-row" key={e.school}>
          <div>
            <h3>{e.school}</h3>
            <p>{e.degree}</p>
          </div>
          <strong>{e.status}</strong>
        </div>
      ))}
    </section>
  );
}
