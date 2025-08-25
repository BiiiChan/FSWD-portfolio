const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors({ origin: 'http://localhost:3000' })); 
app.use(express.json()); 

// MongoDB connection
const MONGO_URI = 'mongodb://localhost:27017/portfolio_db'; 
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(' Connected to MongoDB'))
  .catch(err => {
    console.error(' MongoDB connection error:', err.message);
    process.exit(1);
  });

const { Schema } = mongoose;

// Schemas
const BioSchema = new Schema({
  name: String,
  role: String,
  about: String,
  email: String,
  phone: String,
  socials: {
    linkedin: String,
    github: String,
    twitter: String
  }
}, { timestamps: true });

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  github: String,    
  live: String,      
  techs: [String],
  createdAt: { type: Date, default: Date.now }
});

const SkillSchema = new Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 50 }
});

const MessageSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Bio = mongoose.model('Bio', BioSchema);
const Project = mongoose.model('Project', ProjectSchema);
const Skill = mongoose.model('Skill', SkillSchema);
const Message = mongoose.model('Message', MessageSchema);


async function seedIfEmpty() {
  const bioCount = await Bio.countDocuments();
  if (bioCount === 0) {
    await Bio.create({
      name: 'Bibina Varshini',
      role: 'Full-Stack Developer',
      about: 'I build clean web experiences with React and Node. Passionate about UI, performance, and learning new tech.',
      email: 'varshinibibina2004@gmail.com',
      phone: '+91-9486447347',
      socials: {
        linkedin: 'www.linkedin.com/in/bibina-varshini-7804a6258',
        github: 'https://github.com/BiiiChan'
      }
    });
    console.log(' Seeded bio');
  }

  const skillsCount = await Skill.countDocuments();
  if (skillsCount === 0) {
    await Skill.insertMany([
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'MongoDB', level: 70 }
    ]);
    console.log('Seeded skills');
  }

  const projectsCount = await Project.countDocuments();
  if (projectsCount === 0) {
    await Project.create({
      title: 'MERN Portfolio',
      description: 'A full-stack portfolio site with React frontend and Node/Express backend.',
      github: 'https://github.com/BiiiChan/mern-portfolio',  
      live: 'https://your-portfolio-demo.com',                
      techs: ['React', 'Node', 'MongoDB']
    });
    console.log(' Seeded projects');
  }
}
seedIfEmpty().catch(err => console.error(err));

// Routes
app.get('/api/bio', async (req, res) => {
  try {
    const bio = await Bio.findOne();
    res.json(bio || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/bio', async (req, res) => {
  try {
    let bio = await Bio.findOne();
    if (!bio) bio = new Bio(req.body);
    else Object.assign(bio, req.body);
    await bio.save();
    res.json(bio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const p = await Project.findById(req.params.id);
    if (!p) return res.status(404).json({ error: 'Not found' });
    res.json(p);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/skills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/skills', async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(skill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const msg = new Message(req.body);
    await msg.save();
    res.status(201).json({ message: 'Message received' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
