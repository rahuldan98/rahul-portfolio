import { experience } from '../data.js';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="title reveal">Work <span className="grad-text">Experience</span></h2>
        <ol className="timeline">
          {experience.map((e) => (
            <li key={e.company} className="reveal slide-left">
              <span className="dot" aria-hidden="true" />
              <div className="card">
                <span className="period">{e.period}</span>
                <h3>{e.role}</h3>
                <p className="company">{e.company}</p>
                <ul>{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
