import React from "react";
export default function Home() {
  return (
    <section className="home">
      <div className="hero">
        <h1>
          Hi — I'm <span className="accent">Bibina Varshini S</span>
        </h1>
        <p className="lead">A personal portfolio made using React.js .</p>
        <div className="cta">
          <a href="/projects" className="btn">
            View Projects
          </a>
        </div>
      </div>
    </section>
  );
}
