import React from "react";
import "./Skills.css";

const SkillItem = ({ skill, onUpdate, onDelete }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h3>{skill.title}</h3>
        <p>{skill.desc}</p>
        <div className="btn-group">
          <button className="btn pink-btn" onClick={onUpdate}>
            Update
          </button>
          <button className="btn delete-btn" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillItem;
