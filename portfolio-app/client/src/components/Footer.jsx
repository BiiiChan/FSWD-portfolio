import React from 'react';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Bibina Varshini — Built with React & Node</p>
      </div>
    </footer>
  );
}
