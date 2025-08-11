import React from 'react';
import { projects } from '../data/projects';
import './Projects.css'; 

export default function Projects() {
  return (
    <section id="projects" className="projects container">
      <h2>Projects</h2>
      <div className="projects-grid">
        {projects.map((proj) => (
          <div className="project-card" key={proj.id}>
            <img src={proj.image} alt={proj.title} className="project-image" />
            <h3>{proj.title}</h3>
            <p>{proj.description}</p>

            {/* Tech Stack */}
            <div className="tech-stack">
              {proj.techStack.map((tech, i) => (
                <span className="tech-badge" key={i}>
                  {tech}
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="project-tags">
              {proj.tags.map((tag, i) => (
                <span className="tag" key={i}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="project-links">
              {proj.liveDemo && (
                <a href={proj.liveDemo} className="btn" target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
              {proj.github && (
                <a href={proj.github} className="btn btn-secondary" target="_blank" rel="noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
