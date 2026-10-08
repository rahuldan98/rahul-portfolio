import { projects } from '../data.js';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="title reveal">Featured <span className="grad-text">Projects</span></h2>
        <div className="grid-3">
          {projects.map((p, i) => (
            <article key={p.title} className="card hover-lift reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <ul className="tags">{p.tags.map((t) => <li key={t}>{t}</li>)}</ul>
              <div className="links">
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}
                {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
