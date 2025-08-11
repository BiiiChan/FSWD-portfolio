import React, { useState } from 'react';
import './About.css';

const aboutParagraphs = [
  <>
    I am a <span className="highlight">dedicated front-end developer</span> with experience in{' '}
    <span className="highlight">React.js</span>, <span className="highlight">HTML</span>,{' '}
    <span className="highlight">CSS</span>, and <span className="highlight">JavaScript</span>.
  </>,
  <>
    I enjoy building <em>visually appealing</em>, <em>responsive</em>, and <em>user-friendly</em> interfaces that
    bring ideas to life. Creating seamless <span className="highlight">web experiences</span> that engage users
    is my passion.
  </>,
  <>
    When not coding, I love exploring <span className="highlight">UI/UX design trends</span> and{' '}
    <span className="highlight">learning new technologies</span> to stay updated.
  </>
];

export default function About() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('right'); 

  const prevParagraph = () => {
    if (index > 0) {
      setDirection('left');
      setIndex(index - 1);
    }
  };

  const nextParagraph = () => {
    if (index < aboutParagraphs.length - 1) {
      setDirection('right');
      setIndex(index + 1);
    }
  };

  return (
    <section id="about" className="about container">
      <h2 className="about-title">About Me</h2>
      <div className="about-content">
        <button
          className={`arrow left-arrow ${index === 0 ? 'disabled' : ''}`}
          onClick={prevParagraph}
          aria-label="Previous About Section"
          disabled={index === 0}
        >
          &#8592;
        </button>

        <div
          key={index}
          className={`about-text animate-slide-in-${direction}`}
        >
          <p>{aboutParagraphs[index]}</p>
        </div>

        <button
          className={`arrow right-arrow ${index === aboutParagraphs.length - 1 ? 'disabled' : ''}`}
          onClick={nextParagraph}
          aria-label="Next About Section"
          disabled={index === aboutParagraphs.length - 1}
        >
          &#8594;
        </button>
      </div>
    </section>
  );
}
