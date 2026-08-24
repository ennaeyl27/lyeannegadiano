import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageCard } from './ImageCard';
import './Works.css';

export function Works({ portfolio, scrollTo, currentFilter, onFilterChange, onViewAll }) {
  const filteredProjects = portfolio.projects.filter(p => p.category === currentFilter);
  
  const MAX_CARDS = 4;
  const displayedProjects = filteredProjects.slice(0, MAX_CARDS);
  const remainingCount = Math.max(0, filteredProjects.length - MAX_CARDS);
  
  return (
    <section id="work" className="work-section section">
      <div className="section-title">
        <h2>PROJECTS</h2>
        <div className="project-filters">
          <button className={currentFilter === 'Content Creation' ? 'active' : ''} onClick={() => onFilterChange('Content Creation')}>CONTENT CREATION</button>
          <button className={currentFilter === 'Web Design' ? 'active' : ''} onClick={() => onFilterChange('Web Design')}>WEB DESIGN</button>
        </div>
      </div>
      <div className="work-grid">
        <div className="projects">
          {displayedProjects.map((p) => <ImageCard key={p.title} project={p} />)}
        </div>
        
        {remainingCount > 0 && (
          <div className="view-more-container" style={{ textAlign: 'center', marginTop: '32px' }}>
            <button className="view-more-btn" onClick={onViewAll}>
              VIEW {remainingCount}+ PROJECTS <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
      <div className="services-bottom">
        <h2>SERVICES</h2>
        <div className="services-grid">
          {portfolio.services.map((s, i) => (
            <div className="service" key={s.title}>
              <span className="service-icon">0{i+1}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
