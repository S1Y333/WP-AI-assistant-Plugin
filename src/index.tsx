import * as React from "react";
import { createRoot } from "react-dom/client";

const App = () => (
  <div>
    <h1>WP AI Assistant Plugin</h1>
    <p>Hello from your React frontend!</p>
  </div>
);

const container = document.getElementById("ai-chatbot-container");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}