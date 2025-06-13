import KnowledgePage from './pages/KnowledgePage';

const { createElement, createRoot } = wp.element;

export default function App() {
    createElement('div', null,
        createElement('h1', null, 'WP AI Assistant Admin'),
        createElement('p', null, 'Manage your AI chatbot knowledge base here.'),
        createElement(KnowledgePage)
    )

}