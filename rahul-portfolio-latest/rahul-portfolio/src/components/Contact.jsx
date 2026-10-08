import { useState } from 'react';
import { profile } from '../data.js';

export default function Contact() {
  const [sent, setSent] = useState(false);

  // Front-end only: opens the visitor's email client with the message pre-filled.
  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Portfolio contact from ${f.get('name')}`);
    const body = encodeURIComponent(`${f.get('message')}\n\n— ${f.get('name')} (${f.get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    e.target.reset();
  };

  return (
    <section id="contact" className="section">
      <div className="container narrow">
        <h2 className="title reveal">Get In <span className="grad-text">Touch</span></h2>
        <form className="card form reveal" onSubmit={submit}>
          <label>Name<input name="name" required autoComplete="name" /></label>
          <label>Email<input name="email" type="email" required autoComplete="email" /></label>
          <label>Message<textarea name="message" rows="5" required /></label>
          <button className="btn primary" type="submit">Send Message</button>
          {sent && <p role="status" className="ok">Thanks! Your email app should open to finish sending.</p>}
        </form>
      </div>
    </section>
  );
}
