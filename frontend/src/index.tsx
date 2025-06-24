

import './index.css';//need to import css file and never edit build file
import ChatWindow from "./ChatWindow";

const { createElement, createRoot } = wp.element;

const App = () => (
  createElement('div', null,
    createElement(ChatWindow) 
  )
);

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chatbot-container');

  if (!container) {
    console.error('No container with id "ai-chatbot-container" found.');
    return;
  }

  container.innerHTML = '<p>Loading AI Chatbot...</p>';

  if (!wp || !wp.element || !wp.element.createRoot) {
    container.innerHTML = `
      <div style="padding: 20px; background: #f8d7da; color: #721c24; border-left: 4px solid #f5c6cb;">
        <p>Error: WordPress React (wp.element) not loaded. Try refreshing the page.</p>
      </div>
    `;
    console.error('WordPress React (wp.element) not loaded');
    return;
  }

  container.innerHTML = ''; // Clear loading state
  createRoot(container).render(createElement(App));
});