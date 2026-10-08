import { skills } from '../data.js';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="title reveal">My <span className="grad-text">Skills</span></h2>
        {/* Bars animate to --lvl when the card gets the "in" class */}
        <div className="card bars reveal">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="bar-head"><span>{s.name}</span><span>{s.level}%</span></div>
              <div className="bar" role="progressbar" aria-label={s.name} aria-valuenow={s.level} aria-valuemin="0" aria-valuemax="100">
                <span style={{ '--lvl': `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
