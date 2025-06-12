declare const wp: any;
import App from './App';
const { createElement, createRoot } = wp.element;

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('ai-chatbot-admin-root')
  createRoot(container).render(createElement(App));
  
});