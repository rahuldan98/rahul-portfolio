import { useEffect, useState } from 'react';

const links = ['about', 'skills', 'projects', 'experience', 'contact'];

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // Highlight the link of the section currently in the middle of the viewport
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['home', ...links].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#home" className="logo grad-text">RD.</a>

        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main">
          {links.map((id) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>
              {id}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark/light mode">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="icon-btn burger" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
