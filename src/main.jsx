import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { portfolio } from './data';

const A = ({ children, href }) => <a href={href}>{children}</a>;

function ImageCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <img src={project.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.classList.add('placeholder'); }} />
        <span className="image-note">Replace image in <code>public/images</code></span>
      </div>
      <div className="project-meta">
        <div>
          <h3>{project.title}</h3>
          <p>{project.type}</p>
        </div>
        <span>{project.year}</span>
      </div>
      <p className="project-desc">{project.description}</p>
    </article>
  );
}

function App() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">LG<span>.</span></a>
        <nav>
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow">{portfolio.eyebrow}<span className="line" /></div>

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-brutalist-title" aria-hidden="true">
                <span className="title-row">LYEANNE</span>
                <span className="title-row">GADIANO</span>
              </div>
              <h1 className="sr-only">LYEANNE GADIANO</h1>
              <p className="hero-statement">I transform ideas into <em>digital experiences</em> people can <em>connect with.</em></p>
            </div>
            <div className="hero-visual">
              <div className="hero-portrait-frame">
                <img
                  src="/images/lyeanne-photo.webp"
                  alt="Lyeanne Gadiano"
                  className="hero-portrait-img"
                />
              </div>
              <div className="location">{portfolio.location}<span>●</span></div>
            </div>
          </div>
        </section>

        <section className="stats">
          {portfolio.stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-body">
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="brand-logos section" aria-label="Brands I have worked with">
          <div className="section-title brand-logos-header">
            <h2>BRANDS I WORKED WITH</h2>
          </div>
          <div className="brand-logos-grid">
            {portfolio.brandLogos.map((brand) => (
              <div className="brand-logo-card" key={brand.name}>
                <img
                  src={brand.src}
                  alt={brand.name}
                  className="brand-logo-img"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.classList.add('placeholder');
                  }}
                />
                <span className="brand-logo-name">{brand.name}</span>
              </div>
            ))}
            <div className="brand-logo-card brand-more" aria-hidden="true">
              <span className="brand-more-text">+ many more</span>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section">
          <div className="section-title"><h2>SELECTED WORKS</h2><button onClick={() => scrollTo('contact')}>VIEW ALL PROJECTS <span>→</span></button></div>
          <div className="work-grid"><div className="projects">{portfolio.projects.map((p) => <ImageCard key={p.title} project={p} />)}</div><aside className="services"><h2>SERVICES</h2>{portfolio.services.map((s, i) => <div className="service" key={s.title}><span className="service-icon">0{i+1}</span><div><h3>{s.title}</h3><p>{s.text}</p></div></div>)}<button className="text-link" onClick={() => scrollTo('about')}>AND MORE <span>→</span></button></aside></div>
        </section>

        <section className="process section"><h2>MY PROCESS</h2><div className="process-grid">{portfolio.process.map(([num, title, text], i) => <div className="step" key={num}><div className="step-top"><strong>{num}</strong>{i < portfolio.process.length - 1 && <span>→</span>}</div><h3>{title}</h3><p>{text}</p></div>)}</div></section>

        <section id="about" className="about section">
          <div className="about-main"><h2>ABOUT ME</h2><p>{portfolio.intro}</p><p>My background in Information Technology gives me a practical technical foundation, while content creation has strengthened my creative direction, communication, organization, and digital storytelling skills.</p><div className="chips">{portfolio.skills.map(s => <span key={s}>{s}</span>)}</div></div>
          <div className="resume-side"><h2>EXPERIENCE</h2>{portfolio.experience.map(e => <div className="resume-item" key={e.title}><div><h3>{e.title}</h3><p>{e.subtitle}</p></div><span>{e.date}</span><ul>{e.bullets.map(b => <li key={b}>{b}</li>)}</ul></div>)}</div>
        </section>

        <section className="education section"><h2>EDUCATION</h2>{portfolio.education.map(e => <div className="edu-row" key={e.school}><div><h3>{e.school}</h3><p>{e.degree}</p></div><strong>{e.status}</strong></div>)}</section>

        <section id="contact" className="contact-banner"><div className="envelope">✉</div><div><p>LET'S CREATE SOMETHING</p><h2>meaningful together.</h2></div><p className="availability">I'm available for freelance projects, collaborations, and creative opportunities.</p><A href={`mailto:${portfolio.email}`}>GET IN TOUCH →</A></section>
      </main>

      <footer><div><strong>LG.</strong><span>{portfolio.eyebrow}</span></div><div><A href={`mailto:${portfolio.email}`}>{portfolio.email}</A><br/>{portfolio.phone}<br/>{portfolio.location}</div><div className="socials"><A href={`mailto:${portfolio.email}`}>Email</A><A href="#top">Back to top ↑</A></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
