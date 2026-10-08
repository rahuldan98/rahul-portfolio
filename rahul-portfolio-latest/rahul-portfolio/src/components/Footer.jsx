import { profile } from '../data.js';
import { Socials } from './Icons.jsx';

export default function Footer() {
  return (
    <footer className="footer">
      <Socials />
      <p>© {new Date().getFullYear()} {profile.name}. Built with React &amp; Vite.</p>
    </footer>
  );
}
