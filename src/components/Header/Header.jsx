import React from 'react';
import './Header.css';

export function Header({ scrollTo }) {
  return (
    <header className="topbar">
      <a className="brand" href="#top">LG<span>.</span></a>
      <nav>
        <button onClick={() => scrollTo('experience')}>Experience</button>
        <button onClick={() => scrollTo('work')}>Projects</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </nav>
    </header>
  );
}
