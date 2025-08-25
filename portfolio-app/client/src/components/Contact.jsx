import React, { useState } from "react";
import axios from "axios";
const API = "http://localhost:5000/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // simple, reliable email pattern (good for most cases)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate a single field and update errors state
  function validateField(name, value) {
    const next = { ...errors };

    if (name === "name") {
      if (!value.trim()) next.name = "Name is required.";
      else if (value.trim().length < 2) next.name = "Name must be at least 2 characters.";
      else delete next.name;
    }

    if (name === "email") {
      if (!value.trim()) next.email = "Email is required.";
      else if (!emailRegex.test(value.trim())) next.email = "Enter a valid email (example@example.com).";
      else delete next.email;
    }

    if (name === "subject") {
      if (value.length > 100) next.subject = "Subject cannot exceed 100 characters.";
      else delete next.subject;
    }

    if (name === "message") {
      if (!value.trim()) next.message = "Message is required.";
      else if (value.trim().length < 10) next.message = "Message must be at least 10 characters.";
      else delete next.message;
    }

    setErrors(next);
  }

  // handle typed values + live validation
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    validateField(name, value);
  }

  // mark field as touched on blur (for showing errors only after user interacted)
  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    validateField(name, value);
  }

  // full-form validation (used on submit)
  function validateAll() {
    const v = {};

    if (!form.name.trim()) v.name = "Name is required.";
    else if (form.name.trim().length < 2) v.name = "Name must be at least 2 characters.";

    if (!form.email.trim()) v.email = "Email is required.";
    else if (!emailRegex.test(form.email.trim())) v.email = "Enter a valid email (example@example.com).";

    if (form.subject.length > 100) v.subject = "Subject cannot exceed 100 characters.";

    if (!form.message.trim()) v.message = "Message is required.";
    else if (form.message.trim().length < 10) v.message = "Message must be at least 10 characters.";

    return v;
  }

  async function submit(e) {
    e.preventDefault();

    const validationErrors = validateAll();
    setErrors(validationErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(validationErrors).length > 0) {
      setStatus("Please fix the highlighted errors and try again.");
      return;
    }

    setStatus("");
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, form);
      setStatus("Message sent — thanks!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      setTouched({});
    } catch (err) {
      console.error(err);
      setStatus("Failed to send — please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container contact-grid">
      <div>
        <h2>Contact</h2>

        <form className="card form-card" onSubmit={submit} noValidate>
          <label>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={errors.name && touched.name ? "input-error" : ""}
              placeholder="Your full name"
            />
            {touched.name && errors.name && (
              <p id="name-error" className="error" role="alert" aria-live="polite">
                {errors.name}
              </p>
            )}
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email && touched.email ? "input-error" : ""}
              placeholder="you@example.com"
            />
            {touched.email && errors.email && (
              <p id="email-error" className="error" role="alert" aria-live="polite">
                {errors.email}
              </p>
            )}
          </label>

          <label>
            Subject
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.subject}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={errors.subject && touched.subject ? "input-error" : ""}
              placeholder="(optional)"
            />
            {touched.subject && errors.subject && (
              <p id="subject-error" className="error" role="alert" aria-live="polite">
                {errors.subject}
              </p>
            )}
          </label>

          <label>
            Message
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={errors.message && touched.message ? "input-error" : ""}
              placeholder="Write your message..."
            />
            {touched.message && errors.message && (
              <p id="message-error" className="error" role="alert" aria-live="polite">
                {errors.message}
              </p>
            )}
          </label>

          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send"}
          </button>

          {status && <p className="muted" style={{ marginTop: 8 }}>{status}</p>}
        </form>
      </div>

      {/* Contact Links Section */}
      <div>
        <h3>Other ways to reach me</h3>
        <p>
          Email:{" "}
          <a href="mailto:varshinibibina2004@gmail.com" className="link">
            varshinibibina2004@gmail.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+919486447347" className="link">
            +91 94864 47347
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/bibina-varshini-7804a6258"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            linkedin.com
          </a>
        </p>
      </div>
    </div>
  );
}
