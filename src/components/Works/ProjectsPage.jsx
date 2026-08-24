import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { ImageCard } from './ImageCard';
import './Works.css';

export function ProjectsPage({ portfolio, initialFilter, onBack }) {
  const [filter, setFilter] = useState(initialFilter || 'Web Design');
  const filteredProjects = portfolio.projects.filter(p => p.category === filter);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="site-shell">
      <main className="projects-page section" style={{ padding: '64px 0' }}>
        
        <button 
          className="view-details-btn" 
          onClick={onBack}
          style={{ marginBottom: '40px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ChevronLeft size={18} /> Back to Home
        </button>

        <div className="reveal section-title">
          <h2>ALL PROJECTS</h2>
          <div className="project-filters">
            <button className={filter === 'Content Creation' ? 'active' : ''} onClick={() => setFilter('Content Creation')}>CONTENT CREATION</button>
            <button className={filter === 'Web Design' ? 'active' : ''} onClick={() => setFilter('Web Design')}>WEB DESIGN</button>
          </div>
        </div>

        <div className="reveal work-grid">
          <div className="projects">
            {filteredProjects.map((p) => <ImageCard key={p.title} project={p} />)}
          </div>
        </div>
      </main>
    </div>
  );
}
