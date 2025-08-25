import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function About() {
  const [bio, setBio] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    axios.get(`${API}/bio`).then(r => {
      setBio(r.data);
      setForm(r.data || {});
    });
  }, []);

  function handleChange(e) {
    setForm({...form, [e.target.name]: e.target.value});
  }
  function handleSocialChange(e) {
    setForm({...form, socials: { ...(form.socials||{}), [e.target.name]: e.target.value }});
  }
  async function save() {
    const res = await axios.put(`${API}/bio`, form);
    setBio(res.data);
    setEdit(false);
  }

  if (!bio) return <div className="container">Loading...</div>;

  return (
    <div className="container about-grid">
      <div>
        <h2>About</h2>
        {!edit ? (
          <>
            <h3>{bio.name} — {bio.role}</h3>
            <p>{bio.about}</p>
            <p>Email: {bio.email}</p>
            <p>Phone: {bio.phone}</p>
            <div className="socials">
              <a href={bio.socials?.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              <a href={bio.socials?.github} target="_blank" rel="noreferrer">GitHub</a>
            </div>
            <button className="btn" onClick={() => setEdit(true)}>Edit About</button>
          </>
        ) : (
          <div className="card form-card">
            <label>Name<input name="name" value={form.name||''} onChange={handleChange} /></label>
            <label>Role<input name="role" value={form.role||''} onChange={handleChange} /></label>
            <label>About<textarea name="about" value={form.about||''} onChange={handleChange}></textarea></label>
            <label>Email<input name="email" value={form.email||''} onChange={handleChange} /></label>
            <label>Phone<input name="phone" value={form.phone||''} onChange={handleChange} /></label>
            <label>LinkedIn<input name="linkedin" value={form.socials?.linkedin||''} onChange={handleSocialChange} /></label>
            <label>GitHub<input name="github" value={form.socials?.github||''} onChange={handleSocialChange} /></label>
            <div style={{display:'flex', gap: '8px'}}>
              <button className="btn" onClick={save}>Save</button>
              <button className="btn btn-ghost" onClick={() => { setEdit(false); setForm(bio); }}>Cancel</button>
            </div>
          </div>
        )}
      </div>
      <div>
        <h3>Quick facts</h3>
        <ul>
          <li>Location: India</li>
          <li>Available for freelance</li>
          <li>Open-source contributor</li>
        </ul>
      </div>
    </div>
  );
}
