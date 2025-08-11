import React from 'react';
import profile from '../assets/profile.jpg';
import './Home.css';

export default function Home() {
  return (
    <section id="home" className="home container">
      <div className="home-text">
        <h1>
          Hello, I'm <span className="highlight">Bibina Varshini S</span>
        </h1>
        <p className="subtitle">
          A passionate Front-End Developer crafting modern, <br />
          responsive and user-friendly web experiences.
        </p>
        <a href="#projects" className="btn btn-primary">
          View My Work
        </a>
      </div>
      <div className="home-image">
        <img src={profile} alt="Profile of Bibina Varshini S" />
      </div>
    </section>
  );
}
