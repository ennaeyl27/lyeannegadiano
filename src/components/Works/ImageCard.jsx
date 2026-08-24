import React from 'react';

import { 
  SiLaravel, SiReact, SiPython, SiPostgresql, 
  SiTailwindcss, SiVercel, SiPhp, SiMysql, 
  SiWordpress, SiWoocommerce, SiSpringboot, SiSqlite 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const TECH_ICONS = {
  'Laravel': { icon: SiLaravel, color: '#FF2D20' },
  'React': { icon: SiReact, color: '#61DAFB' },
  'Python': { icon: SiPython, color: '#3776AB' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'Vercel': { icon: SiVercel, color: '#000000' },
  'PHP': { icon: SiPhp, color: '#777BB4' },
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'WordPress': { icon: SiWordpress, color: '#21759B' },
  'WooCommerce': { icon: SiWoocommerce, color: '#96588A', scale: 1.5 },
  'Java': { icon: FaJava, color: '#007396' },
  'Spring Boot': { icon: SiSpringboot, color: '#6DB33F' },
  'SQLite': { icon: SiSqlite, color: '#003B57' }
};

export function ImageCard({ project }) {
  const href = project.url || project.link || null;



  const handleOpen = () => {
    if (href) window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleKey = (e) => {
    if (!href) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  const clickableProps = href ? { onClick: handleOpen, tabIndex: 0, onKeyDown: handleKey, style: { cursor: 'pointer' }, role: 'link' } : {};

  return (
    <article className="project-card" {...clickableProps}>
      <div className="project-image">
        <img src={project.image} alt={project.title || ''} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('placeholder'); }} />
      </div>
      <div className="project-meta">
        <h3>{project.title}</h3>
        {project.role && project.title && project.role.toLowerCase() !== project.title.toLowerCase() && (
          <p>{project.role}</p>
        )}
      </div>
      <p className="project-desc">{project.summary}</p>
      {project.techStack && project.techStack.length > 0 && (
        <div className="project-tech-stack">
          {project.techStack.map((tech) => {
            const techObj = TECH_ICONS[tech];
            if (techObj) {
              const Icon = techObj.icon;
              return (
                <div 
                  key={tech} 
                  className="tech-icon-wrapper" 
                  title={tech}
                  style={{ 
                    color: techObj.color,
                    fontSize: techObj.scale ? `calc(18px * ${techObj.scale})` : undefined,
                    margin: techObj.scale ? '0 4px' : '0'
                  }}
                >
                  <Icon />
                </div>
              );
            }
            return <span key={tech} className="tech-text">{tech}</span>;
          })}
        </div>
      )}
    </article>
  );
}
