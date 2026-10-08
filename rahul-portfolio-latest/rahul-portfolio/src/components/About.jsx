import { profile, certifications } from '../data.js';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="title reveal">About <span className="grad-text">Me</span></h2>
        <div className="grid-2">
          <div className="card reveal slide-left">
            {profile.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="card reveal slide-right">
            <h3>Certifications</h3>
            {certifications.map((c) => (
              <div className="cert" key={c.name}>
                <span className="badge">🏅</span>
                <div><strong>{c.name}</strong><p>{c.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
