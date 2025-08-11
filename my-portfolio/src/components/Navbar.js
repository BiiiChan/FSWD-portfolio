import React from 'react';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-container">
        <a href="#home" className="logo">MyPortfolio</a>
        <nav>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
