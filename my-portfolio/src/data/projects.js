// Import images at the top (make sure these images exist in your assets folder)
import portfolioImg from "../assets/project-portfolio.jpg";
import todoImg from "../assets/project-todo.jpg";
import ecommerceImg from "../assets/project-ecommerce.jpg";


export const projects = [
  {
    id: 1,
    title: "Simple Quiz Website",
    description:
      "A fully responsive and sleek quiz app built with React.js, featuring smooth animations and a clean UI to showcase your skills.",
    techStack: ["React.js", "CSS3", "Framer Motion", "Vite"],
    image: portfolioImg,
    liveDemo: "https://yourportfolio.com",
    github: "https://github.com/BiiiChan/React-Quiz-App",
    tags: ["React", "UI", "Responsive", "Animation"],
  },
  {
    id: 2,
    title: "Weather Application",
    description:
      "A feature-rich weather app with real-time data, built using React.js and OpenWeatherMap API, showcasing your ability to work with APIs and state management.",
    techStack: ["React.js", "JavaScript", "CSS Flexbox"],
    image: todoImg,
    liveDemo: "https://yourtodoapp.com",
    github: "https://github.com/BiiiChan/React-weather-app",
    tags: ["React", "LocalStorage", "Productivity"],
  },
  {
    id: 3,
    title: "E-commerce Storefront",
    description:
      "A modern e-commerce site with product filtering, cart management, and checkout flow designed with React and custom CSS.",
    techStack: ["React.js", "Context API", "CSS Grid"],
    image: ecommerceImg,
    liveDemo: "https://yourecommerce.com",
    github: "https://github.com/yourusername/ecommerce-store",
    tags: ["React", "E-commerce", "Shopping Cart"],
  },
];
