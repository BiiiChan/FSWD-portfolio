import React from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  return (
    <header className="nav-header">
      <div className="container nav-inner">
        <div className="brand">Portfolio<span className="dot">.</span></div>
        <nav>
          <ul className="nav-list">
            {navItems.map(i => (
              <li key={i.id}><a href={`#${i.id}`}>{i.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
