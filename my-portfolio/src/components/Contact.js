import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Thank you ${form.name}, your message has been sent!`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact container">
      <h2>Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required></textarea>
        <button type="submit" className="btn">Send Message</button>
      </form>
    </section>
  );
}
