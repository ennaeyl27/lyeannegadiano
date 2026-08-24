import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { portfolio } from './data';

import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Stats } from './components/Stats/Stats';
import { Brands } from './components/Brands/Brands';
import { Experience } from './components/Experience/Experience';
import { Works } from './components/Works/Works';
import { ProjectsPage } from './components/Works/ProjectsPage';
import { About } from './components/About/About';
import { Education } from './components/Education/Education';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [activeFilter, setActiveFilter] = useState('Web Design');

  useEffect(() => {
    if (currentPage === 'projects') {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [currentPage]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  if (currentPage === 'projects') {
    return (
      <ProjectsPage 
        portfolio={portfolio} 
        initialFilter={activeFilter} 
        onBack={() => {
          setCurrentPage('home');
          setTimeout(() => scrollTo('work'), 100);
        }} 
      />
    );
  }

  return (
    <div className="site-shell">
      <Header scrollTo={scrollTo} />
      <main id="top">
        <div className="reveal"><Hero portfolio={portfolio} /></div>
        <div className="reveal"><Stats portfolio={portfolio} /></div>
        <div className="reveal"><Brands portfolio={portfolio} /></div>
        <div className="reveal"><Experience portfolio={portfolio} /></div>
        <div className="reveal">
          <Works 
            portfolio={portfolio} 
            scrollTo={scrollTo} 
            currentFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onViewAll={() => setCurrentPage('projects')} 
          />
        </div>
        <div className="reveal"><About portfolio={portfolio} /></div>
        <div className="reveal"><Education portfolio={portfolio} /></div>
        <div className="reveal"><Contact portfolio={portfolio} /></div>
      </main>
      <Footer portfolio={portfolio} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
