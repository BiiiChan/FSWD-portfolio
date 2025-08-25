import React from 'react';

export default function Home() {
  return (
    <div className="container hero">
      <div className="hero-left">
        <h1>Hi, I'm <span className="accent">Bibina </span></h1>
        <h2>Full-Stack Developer</h2>
        <p>I design and build responsive, accessible web experiences using React & Node.</p>
        <a href="#projects" className="btn">View Projects</a>
      </div>
      <div className="hero-right">
        <div className="hero-card">
          <div className="avatar">BV</div>
          <div className="card-info">
            <h3>Bibina Varshini</h3>
            <p>Building beautiful UIs and robust backends.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
