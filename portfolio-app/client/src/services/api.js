import axios from "axios";

const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL?.replace(/\/$/, "") ||
    "http://localhost:5000/api",
});

// Attach token if exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const signup = (data) => API.post("/auth/signup", data);
export const login = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Bio
export const fetchBio = () => API.get("/bio");
export const saveBio = (data) => API.post("/bio", data);
export const deleteBio = () => API.delete("/bio");

// Skills
export const fetchSkills = () => API.get("/skills");
export const createSkill = (data) => API.post("/skills", data);
export const updateSkill = (id, data) => API.put(`/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// Projects
export const fetchProjects = () => API.get("/projects");
export const createProject = (data) => API.post("/projects", data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);
