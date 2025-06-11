import * as React from "react";

// The React App component
const App = () => (
  <div>
    <h1>WP AI Assistant Plugin</h1>
    <p>Hello from your React frontend!</p>
  </div>
);

// Wait for DOM and WordPress React to be ready
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chatbot-container');

  if (!container) {
    console.error('No container with id "ai-chatbot-container" found.');
    return;
  }

  // Show loading state
  container.innerHTML = `<p>Loading AI Chatbot...</p>`;

  // Check for WordPress React (wp.element)
  if (typeof wp === 'undefined' || !wp.element || !wp.element.createRoot) {
    container.innerHTML = `
      <div style="
        padding: 20px;
        background: #f8d7da;
        color: #721c24;
        border-left: 4px solid #f5c6cb;
      ">
        <p>Error: WordPress React (wp.element) not loaded. Try refreshing the page.</p>
      </div>
    `;
    console.error('WordPress React (wp.element) not loaded');
    return;
  }

  // Mount the React app
  const { createRoot } = wp.element;
  container.innerHTML = ""; // Clear loading/error message
  createRoot(container).render(<App />);
});