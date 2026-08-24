import React from 'react';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';
import { FaTiktok, FaLinkedin } from 'react-icons/fa';
import { A } from '../UI/A';
import './Footer.css';

export function Footer({ portfolio }) {
  return (
    <footer>
      <div className="footer-brand">
        <a className="brand" href="#top">LG<span>.</span></a>
        <div className="footer-title">
          <span>Digital content creator</span>
          <span>&amp; WEB DESIGNER</span>
        </div>
      </div>
      <div className="footer-contact">
        <span className="contact-item">
          <Mail size={15} />
          <A href={`mailto:${portfolio.email}`}>{portfolio.email}</A>
        </span>
        <span className="contact-item">
          <Phone size={15} />
          <span>{portfolio.phone}</span>
        </span>
        <span className="contact-item">
          <MapPin size={15} />
          <span>{portfolio.location}</span>
        </span>
      </div>
      <div className="socials">
        <A href="https://www.tiktok.com/@ennaeyl" target="_blank" rel="noopener noreferrer"><FaTiktok size={18} /></A>
        <A href="https://www.linkedin.com/in/lyeanne-gadiano-491354311/" target="_blank" rel="noopener noreferrer"><FaLinkedin size={18} /></A>
        <A href="#top">Back to top &nbsp;<span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}><ArrowUp size="1em" /></span></A>
      </div>
    </footer>
  );
}
