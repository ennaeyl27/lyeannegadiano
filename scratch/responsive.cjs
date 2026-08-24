const fs = require('fs');
const path = require('path');

const srcDir = 'c:/xampp/htdocs/lyeannegadiano/src';
const compDir = path.join(srcDir, 'components');
const stylesDir = path.join(srcDir, 'styles');

// 1. Clean global.css
let globalCss = fs.readFileSync(path.join(stylesDir, 'global.css'), 'utf8');

const globalCleaned = globalCss.split('/* Responsive Breakpoints */')[0] + `/* Responsive Breakpoints */
@media (max-width: 900px) {
  .site-shell {
    padding: 0 24px;
  }
}
@media (max-width: 620px) {
  .site-shell {
    padding: 0 18px;
  }
  .section {
    padding-bottom: 48px;
  }
}
`;
fs.writeFileSync(path.join(stylesDir, 'global.css'), globalCleaned);

// 2. Append to components
const appendCSS = (compName, cssString) => {
  const file = path.join(compDir, compName, `${compName}.css`);
  fs.appendFileSync(file, '\n' + cssString);
};

appendCSS('Header', `
@media (max-width: 620px) {
  .topbar {
    height: 64px;
  }
  .topbar nav {
    gap: 14px;
  }
  .topbar nav button {
    font-size: 14px;
  }
}
`);

appendCSS('Hero', `
@media (max-width: 900px) {
  .hero-brutalist-title {
    font-size: clamp(70px, 18vw, 140px);
    line-height: 0.86;
    margin-bottom: 8px;
  }
  .hero-brutalist-title .title-row:last-child {
    transform: translateX(120px);
  }
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
  .hero-copy {
    order: 2;
  }
  .hero-visual {
    order: 1;
    min-height: 380px;
    padding-top: 0;
    margin-top: -18px;
  }
  .hero-portrait-frame {
    max-width: 520px;
    height: 430px;
    margin-top: -32px;
  }
  .hero-portrait-img {
    max-height: 430px;
    transform: scale(1.08); /* Removed translateY to fix pants */
  }
  .location {
    right: 5%;
    bottom: 16px;
  }
}

@media (max-width: 620px) {
  .hero-brutalist-title {
    font-size: clamp(54px, 18vw, 88px);
    line-height: 0.88;
  }
  .hero-brutalist-title .title-row:last-child {
    transform: translateX(80px);
  }
  .hero-statement {
    font-size: 32px;
  }
  .hero-portrait-frame {
    max-width: 390px;
    height: 390px;
    margin-top: -24px;
  }
  .hero-portrait-img {
    max-height: 390px;
    transform: scale(1.06); /* Removed translateY to fix pants */
  }
}
`);

appendCSS('Stats', `
@media (max-width: 900px) {
  .stats {
    margin-top: -10px;
  }
}
@media (max-width: 620px) {
  .stats {
    grid-template-columns: 1fr;
    padding: 0;
    margin-top: 0;
  }
  .stat {
    border-right: 0;
    border-bottom: 1px solid var(--line);
    padding: 18px 16px;
  }
  .stat:last-child {
    border-bottom: 0;
  }
}
`);

appendCSS('Brands', `
@media (max-width: 900px) {
  .brand-logos-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
@media (max-width: 620px) {
  .brand-logos-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
`);

appendCSS('Works', `
@media (max-width: 900px) {
  .work-grid {
    grid-template-columns: 1fr;
  }
  .services {
    border-left: 0;
    border-top: 1px solid var(--line);
    padding: 24px 0 0;
  }
  .projects {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .projects {
    grid-template-columns: 1fr;
  }
  .project-image {
    height: 320px;
  }
  .project-filters {
    flex-wrap: wrap;
  }
}
`);

appendCSS('Process', `
@media (max-width: 620px) {
  .process-grid {
    grid-template-columns: 1fr 1fr;
  }
  .process-grid .step:last-child {
    grid-column: 1 / -1;
  }
}
`);

appendCSS('About', `
@media (max-width: 900px) {
  .about {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}
`);

appendCSS('Contact', `
@media (max-width: 900px) {
  .contact-banner {
    grid-template-columns: auto 1fr;
  }
  .availability {
    grid-column: 2;
  }
  .contact-banner > a {
    grid-column: 2;
    justify-self: start;
  }
}
@media (max-width: 620px) {
  .contact-banner {
    grid-template-columns: 1fr;
    padding: 24px 20px;
  }
  .availability,
  .contact-banner > a {
    grid-column: auto;
  }
}
`);

appendCSS('Footer', `
@media (max-width: 620px) {
  footer {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .socials {
    justify-content: flex-start !important;
  }
}
`);

console.log('Responsive styles distributed successfully.');
