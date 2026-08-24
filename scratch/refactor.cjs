const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const compDir = path.join(srcDir, 'components');
const stylesDir = path.join(srcDir, 'styles');

fs.mkdirSync(compDir, { recursive: true });
fs.mkdirSync(stylesDir, { recursive: true });

// 1. Read and split CSS
const cssPath = path.join(srcDir, 'styles.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const getCssBlock = (startMarker, endMarker) => {
  const startIndex = cssContent.indexOf(startMarker);
  if (startIndex === -1) return '';
  const endIndex = endMarker ? cssContent.indexOf(endMarker, startIndex) : cssContent.length;
  return cssContent.substring(startIndex, endIndex !== -1 ? endIndex : cssContent.length).trim();
};

const globalCssStart = cssContent.substring(0, cssContent.indexOf('/* Header & Navigation */')).trim();
const breakpointsCss = getCssBlock('/* Responsive Breakpoints */', null);

const sections = [
  { name: 'Header', start: '/* Header & Navigation */', end: '/* Hero Section' },
  { name: 'Hero', start: '/* Hero Section', end: '/* Stats Section' },
  { name: 'Stats', start: '/* Stats Section', end: '/* Brand Logos */' },
  { name: 'Brands', start: '/* Brand Logos */', end: '/* Common Section Styles */' },
  { name: 'Works', start: '/* Common Section Styles */', end: '/* Process Section */' },
  { name: 'Process', start: '/* Process Section */', end: '/* About Section */' },
  { name: 'About', start: '/* About Section */', end: '/* Education Section */' },
  { name: 'Education', start: '/* Education Section */', end: '/* Contact Banner */' },
  { name: 'Contact', start: '/* Contact Banner */', end: '/* Footer */' },
  { name: 'Footer', start: '/* Footer */', end: '/* Responsive Breakpoints */' }
];

sections.forEach(sec => {
  const dir = path.join(compDir, sec.name);
  fs.mkdirSync(dir, { recursive: true });
  const block = getCssBlock(sec.start, sec.end);
  if (block) {
    fs.writeFileSync(path.join(dir, `${sec.name}.css`), block);
  }
});

// Write global css
fs.writeFileSync(path.join(stylesDir, 'global.css'), globalCssStart + '\n\n' + breakpointsCss);

// 2. Write JSX components
const components = {
  UI: {
    'A.jsx': `import React from 'react';\n\nexport const A = ({ children, href }) => <a href={href}>{children}</a>;\n`
  },
  Header: {
    'Header.jsx': `import React from 'react';\nimport './Header.css';\n\nexport function Header({ scrollTo }) {\n  return (\n    <header className="topbar">\n      <a className="brand" href="#top">LG<span>.</span></a>\n      <nav>\n        <button onClick={() => scrollTo('work')}>Work</button>\n        <button onClick={() => scrollTo('about')}>About</button>\n        <button onClick={() => scrollTo('contact')}>Contact</button>\n      </nav>\n    </header>\n  );\n}\n`
  },
  Hero: {
    'Hero.jsx': `import React from 'react';\nimport './Hero.css';\n\nexport function Hero({ portfolio }) {\n  return (\n    <section className="hero">\n      <div className="eyebrow">{portfolio.eyebrow}<span className="line" /></div>\n      <div className="hero-grid">\n        <div className="hero-copy">\n          <div className="hero-brutalist-title" aria-hidden="true">\n            <span className="title-row">LYEANNE</span>\n            <span className="title-row">GADIANO</span>\n          </div>\n          <h1 className="sr-only">LYEANNE GADIANO</h1>\n          <p className="hero-statement">I transform ideas into <em>digital experiences</em> people can <em>connect with.</em></p>\n        </div>\n        <div className="hero-visual">\n          <div className="hero-portrait-frame">\n            <img src="/images/lyeanne-photo.webp" alt="Lyeanne Gadiano" className="hero-portrait-img" />\n          </div>\n          <div className="location">{portfolio.location}<span>●</span></div>\n        </div>\n      </div>\n    </section>\n  );\n}\n`
  },
  Stats: {
    'Stats.jsx': `import React from 'react';\nimport './Stats.css';\n\nexport function Stats({ portfolio }) {\n  return (\n    <section className="stats">\n      {portfolio.stats.map((s) => (\n        <div className="stat" key={s.label}>\n          <div className="stat-body">\n            <strong>{s.value}</strong>\n            <span>{s.label}</span>\n          </div>\n        </div>\n      ))}\n    </section>\n  );\n}\n`
  },
  Brands: {
    'Brands.jsx': `import React from 'react';\nimport './Brands.css';\n\nexport function Brands({ portfolio }) {\n  return (\n    <section className="brand-logos section" aria-label="Brands I have worked with">\n      <div className="section-title brand-logos-header">\n        <h2>BRANDS I WORKED WITH</h2>\n      </div>\n      <div className="brand-logos-grid">\n        {portfolio.brandLogos.map((brand) => (\n          <div className="brand-logo-card" key={brand.name}>\n            <img\n              src={brand.src}\n              alt={brand.name}\n              className="brand-logo-img"\n              onError={(e) => {\n                e.currentTarget.style.display = 'none';\n                e.currentTarget.parentElement.classList.add('placeholder');\n              }}\n            />\n            <span className="brand-logo-name">{brand.name}</span>\n          </div>\n        ))}\n        <div className="brand-more" aria-hidden="true">\n          <span className="brand-more-text">+ many more</span>\n        </div>\n      </div>\n    </section>\n  );\n}\n`
  },
  Works: {
    'ImageCard.jsx': `import React from 'react';\n\nexport function ImageCard({ project }) {\n  return (\n    <article className="project-card">\n      <div className="project-image">\n        <img src={project.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('placeholder'); }} />\n        <span className="image-note">Replace image in <code>public/images</code></span>\n      </div>\n      <div className="project-meta">\n        <div>\n          <h3>{project.title}</h3>\n          <p>{project.type}</p>\n        </div>\n        <span>{project.year}</span>\n      </div>\n      <p className="project-desc">{project.description}</p>\n    </article>\n  );\n}\n`,
    'Works.jsx': `import React, { useState } from 'react';\nimport { ArrowRight } from 'lucide-react';\nimport { ImageCard } from './ImageCard';\nimport './Works.css';\n\nexport function Works({ portfolio, scrollTo }) {\n  const [filter, setFilter] = useState('All');\n  const filteredProjects = portfolio.projects.filter(p => filter === 'All' || p.category === filter);\n  return (\n    <section id="work" className="work-section section">\n      <div className="section-title">\n        <h2>SELECTED WORKS</h2>\n        <div className="project-filters">\n          <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>ALL</button>\n          <button className={filter === 'Content Creation' ? 'active' : ''} onClick={() => setFilter('Content Creation')}>CONTENT CREATION</button>\n          <button className={filter === 'Web Design' ? 'active' : ''} onClick={() => setFilter('Web Design')}>WEB DESIGN</button>\n        </div>\n      </div>\n      <div className="work-grid">\n        <div className="projects">\n          {filteredProjects.map((p) => <ImageCard key={p.title} project={p} />)}\n        </div>\n        <aside className="services">\n          <h2>SERVICES</h2>\n          {portfolio.services.map((s, i) => (\n            <div className="service" key={s.title}>\n              <span className="service-icon">0{i+1}</span>\n              <div>\n                <h3>{s.title}</h3>\n                <p>{s.text}</p>\n              </div>\n            </div>\n          ))}\n          <button className="text-link" onClick={() => scrollTo('about')}>AND MORE <span style={{ display: 'inline-flex', alignItems: 'center' }}><ArrowRight size="1em" /></span></button>\n        </aside>\n      </div>\n    </section>\n  );\n}\n`
  },
  Process: {
    'Process.jsx': `import React from 'react';\nimport { ArrowRight } from 'lucide-react';\nimport './Process.css';\n\nexport function Process({ portfolio }) {\n  return (\n    <section className="process section">\n      <h2>MY PROCESS</h2>\n      <div className="process-grid">\n        {portfolio.process.map(([num, title, text], i) => (\n          <div className="step" key={num}>\n            <div className="step-top">\n              <strong>{num}</strong>\n              {i < portfolio.process.length - 1 && <span style={{ display: 'inline-flex', alignItems: 'center' }}><ArrowRight size="1em" /></span>}\n            </div>\n            <h3>{title}</h3>\n            <p>{text}</p>\n          </div>\n        ))}\n      </div>\n    </section>\n  );\n}\n`
  },
  About: {
    'About.jsx': `import React from 'react';\nimport './About.css';\n\nexport function About({ portfolio }) {\n  return (\n    <section id="about" className="about section">\n      <div className="about-main">\n        <h2>ABOUT ME</h2>\n        <p>{portfolio.intro}</p>\n        <p>My background in Information Technology gives me a practical technical foundation, while content creation has strengthened my creative direction, communication, organization, and digital storytelling skills.</p>\n        <div className="chips">{portfolio.skills.map(s => <span key={s}>{s}</span>)}</div>\n      </div>\n      <div className="resume-side">\n        <h2>EXPERIENCE</h2>\n        {portfolio.experience.map(e => (\n          <div className="resume-item" key={e.title}>\n            <div>\n              <h3>{e.title}</h3>\n              <p>{e.subtitle}</p>\n            </div>\n            <span>{e.date}</span>\n            <ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul>\n          </div>\n        ))}\n      </div>\n    </section>\n  );\n}\n`
  },
  Education: {
    'Education.jsx': `import React from 'react';\nimport './Education.css';\n\nexport function Education({ portfolio }) {\n  return (\n    <section className="education section">\n      <h2>EDUCATION</h2>\n      {portfolio.education.map(e => (\n        <div className="edu-row" key={e.school}>\n          <div>\n            <h3>{e.school}</h3>\n            <p>{e.degree}</p>\n          </div>\n          <strong>{e.status}</strong>\n        </div>\n      ))}\n    </section>\n  );\n}\n`
  },
  Contact: {
    'Contact.jsx': `import React from 'react';\nimport { ArrowRight, Mail } from 'lucide-react';\nimport { A } from '../UI/A';\nimport './Contact.css';\n\nexport function Contact({ portfolio }) {\n  return (\n    <section id="contact" className="contact-banner">\n      <div className="envelope"><Mail size="1em" /></div>\n      <div>\n        <p>LET'S CREATE SOMETHING</p>\n        <h2>meaningful together.</h2>\n      </div>\n      <p className="availability">I'm available for freelance projects, collaborations, and creative opportunities.</p>\n      <A href={\`mailto:\${portfolio.email}\`}>GET IN TOUCH &nbsp;<span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}><ArrowRight size="1.2em" /></span></A>\n    </section>\n  );\n}\n`
  },
  Footer: {
    'Footer.jsx': `import React from 'react';\nimport { ArrowUp } from 'lucide-react';\nimport { A } from '../UI/A';\nimport './Footer.css';\n\nexport function Footer({ portfolio }) {\n  return (\n    <footer>\n      <div><strong>LG.</strong><span>{portfolio.eyebrow}</span></div>\n      <div>\n        <A href={\`mailto:\${portfolio.email}\`}>{portfolio.email}</A><br/>\n        {portfolio.phone}<br/>\n        {portfolio.location}\n      </div>\n      <div className="socials">\n        <A href={\`mailto:\${portfolio.email}\`}>Email</A>\n        <A href="#top">Back to top &nbsp;<span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}><ArrowUp size="1em" /></span></A>\n      </div>\n    </footer>\n  );\n}\n`
  }
};

Object.keys(components).forEach(dirName => {
  const dir = path.join(compDir, dirName);
  fs.mkdirSync(dir, { recursive: true });
  const files = components[dirName];
  Object.keys(files).forEach(fileName => {
    fs.writeFileSync(path.join(dir, fileName), files[fileName]);
  });
});

// 3. Update main.jsx
const mainJsx = `import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { portfolio } from './data';

import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Stats } from './components/Stats/Stats';
import { Brands } from './components/Brands/Brands';
import { Works } from './components/Works/Works';
import { Process } from './components/Process/Process';
import { About } from './components/About/About';
import { Education } from './components/Education/Education';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

function App() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="site-shell">
      <Header scrollTo={scrollTo} />
      <main id="top">
        <Hero portfolio={portfolio} />
        <Stats portfolio={portfolio} />
        <Brands portfolio={portfolio} />
        <Works portfolio={portfolio} scrollTo={scrollTo} />
        <Process portfolio={portfolio} />
        <About portfolio={portfolio} />
        <Education portfolio={portfolio} />
        <Contact portfolio={portfolio} />
      </main>
      <Footer portfolio={portfolio} />
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
`;

fs.writeFileSync(path.join(srcDir, 'main.jsx'), mainJsx);

console.log('Refactoring complete.');
