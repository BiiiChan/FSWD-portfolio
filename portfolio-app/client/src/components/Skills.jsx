import React, { useState } from "react";
import SkillItem from "./SkillItem";
import "./Skills.css";

const Skills = () => {
  const [skills, setSkills] = useState([
    { title: "HTML, CSS, JavaScript", desc: "Building responsive layouts." },
    { title: "React.js", desc: "Creating dynamic front-end apps." },
    { title: "Node.js & Express", desc: "Developing REST APIs." },
    { title: "MongoDB", desc: "Database integration." },
    { title: "CRUD Operations", desc: "Implementing Create, Read, Update, and Delete functionalities in full-stack apps." },
  ]);

  const [newSkill, setNewSkill] = useState({ title: "", desc: "" });

  // Add new skill
  const handleAddSkill = () => {
    if (newSkill.title.trim() && newSkill.desc.trim()) {
      setSkills([...skills, newSkill]);
      setNewSkill({ title: "", desc: "" });
    }
  };

  // Update a skill (simple prompt based)
  const handleUpdateSkill = (index) => {
    const updatedTitle = prompt("Enter new title:", skills[index].title);
    const updatedDesc = prompt("Enter new description:", skills[index].desc);

    if (updatedTitle && updatedDesc) {
      const updatedSkills = [...skills];
      updatedSkills[index] = { title: updatedTitle, desc: updatedDesc };
      setSkills(updatedSkills);
    }
  };

  // Delete a skill
  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <section className="skills">
      <h2 className="skills-title">My Skills</h2>

      {/* Timeline */}
      <div className="timeline">
        {skills.map((skill, index) => (
          <SkillItem
            key={index}
            skill={skill}
            onUpdate={() => handleUpdateSkill(index)}
            onDelete={() => handleDeleteSkill(index)}
          />
        ))}
      </div>

      {/* Add Skill Form */}
      <div className="add-skill">
        <input
          type="text"
          placeholder="Skill Title"
          value={newSkill.title}
          onChange={(e) => setNewSkill({ ...newSkill, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skill Description"
          value={newSkill.desc}
          onChange={(e) => setNewSkill({ ...newSkill, desc: e.target.value })}
        />
        <button className="btn pink-btn" onClick={handleAddSkill}>
          Add Skill
        </button>
      </div>
    </section>
  );
};

export default Skills;
