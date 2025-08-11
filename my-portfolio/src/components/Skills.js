import React from 'react';
import './Skills.css'; // we'll put styles here

export default function Skills() {
  const skills = [
    "HTML", 
    "CSS", 
    "JavaScript", 
    "React.js", 
    "Git", 
    "Responsive Design"
  ];

  return (
    <section id="skills" className="skills container">
      <h2>Skills</h2>
      <div className="timeline">
        <div className="line" />
        {skills.map((skill, index) => (
          <div 
            className="skill-item" 
            key={index} 
            style={{ animationDelay: `${index * 0.3}s` }}
          >
            <div className="skill-circle" />
            <span className="skill-label">{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
