import { profile } from '../data.js';
import useTyping from '../hooks/useTyping.js';
import { Socials } from './Icons.jsx';

export default function Hero() {
  const role = useTyping(profile.roles);
  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="reveal slide-left">
          <p className="eyebrow">👋 Hello, I'm</p>
          <h1 className="grad-text">{profile.name}</h1>
          <p className="typing">
            <span className="sr-only">{profile.roles.join(', ')}</span>
            <span aria-hidden="true">{role}<i className="caret" /></span>
          </p>
          <p className="lead">{profile.tagline}</p>
          <div className="cta">
            <a className="btn primary" href="#projects">View Projects</a>
            <a className="btn ghost" href="#contact">Contact Me</a>
          </div>
          <Socials />
          <div className="hero-badge reveal" style={{ marginTop: '1.2rem' }}>
            <a
              href="https://www.cncf.io/training/kubestronaut/"
              target="_blank"
              rel="noopener noreferrer"
              title="CNCF Kubestronaut"
            >
              <img
                src="/kubestronaut.png"
                alt="CNCF Kubestronaut Badge"
                className="kubestronaut-badge"
              />
            </a>
          </div>
        </div>
        <div className="avatar reveal slide-right" aria-hidden="true">
          <div className="ring"><span>RD</span></div>
        </div>
      </div>
    </section>
  );
}
