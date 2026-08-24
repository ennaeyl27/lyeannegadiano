import React from 'react';
import { SiTiktok } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import './Hero.css';

export function Hero({ portfolio }) {
  return (
    <section className="hero">
      <div className="eyebrow">{portfolio.eyebrow}<span className="line" /></div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-brutalist-title" aria-hidden="true">
            <span className="title-row">LYEANNE</span>
            <span className="title-row">GADIANO</span>
          </div>
          <h1 className="sr-only">LYEANNE GADIANO</h1>
          <p className="hero-statement">I transform ideas into <em>digital experiences</em> people can <span style={{ whiteSpace: 'nowrap' }}><em>connect with.</em></span></p>
        </div>
        <div className="hero-visual">
          <div className="hero-portrait-frame">
            <img src="/images/lyeanne-photo.webp" alt="Lyeanne Gadiano" className="hero-portrait-img" />
          </div>
          <div className="hero-social-icons">
            <a href={portfolio.socials.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok" style={{ color: '#000000' }}>
              <SiTiktok />
            </a>
            <a href={`mailto:${portfolio.email}`} aria-label="Email" style={{ color: '#EA4335' }}>
              <Mail size={16} />
            </a>
            <a href={portfolio.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: '#0A66C2' }}>
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
