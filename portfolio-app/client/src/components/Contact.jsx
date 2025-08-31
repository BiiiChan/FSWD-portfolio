import React from "react";

export default function Contact() {
  return (
    <section className="contact card">
      <h2>Contact</h2>
      <p>
        Want to work together? Email me at{" "}
        <a href="mailto:you@example.com">you@example.com</a>
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <input placeholder="Your name" />
        <input placeholder="Email" />
        <textarea placeholder="Message" rows="4"></textarea>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
