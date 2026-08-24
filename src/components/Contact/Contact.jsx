import React from 'react';
import { Mail } from 'lucide-react';
import { FaTiktok, FaLinkedin } from 'react-icons/fa';
import { A } from '../UI/A';
import './Contact.css';

export function Contact({ portfolio }) {
  return (
    <section id="contact" className="contact-banner">
      <div className="envelope"><Mail size="1em" /></div>
      <div>
        <p>LET'S CREATE SOMETHING</p>
        <h2>meaningful together.</h2>
      </div>
      <p className="availability">I'm available for freelance projects, collaborations, and creative opportunities.</p>
      
      <div className="contact-links">
        <A href={`mailto:${portfolio.email}`} className="contact-btn">
          <Mail size={16} /> Email
        </A>
        <A href="https://www.tiktok.com/@ennaeyl" target="_blank" rel="noopener noreferrer" className="contact-btn">
          <FaTiktok size={16} /> TikTok
        </A>
        <A href="https://www.linkedin.com/in/lyeanne-gadiano-491354311/" target="_blank" rel="noopener noreferrer" className="contact-btn">
          <FaLinkedin size={16} /> LinkedIn
        </A>
      </div>
    </section>
  );
}
