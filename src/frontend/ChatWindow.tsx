import { useState } from 'react';

declare const wp: any;
const { createElement } = wp.element;

export default function ChatWindow() {
  const [messages, setMessages] = useState<{text: string, isUser: boolean}[]>([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    const response = await fetch('/wp-json/ai-chatbot/v1/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: input })
    });
    const answer = await response.json();

    setMessages([...messages, 
      { text: input, isUser: true },
      { text: answer, isUser: false }
    ]);
    setInput('');
  };

  return (
   createElement(
  'div',
  { className: 'chatbot' },
  [
    // Render message divs
    ...messages.map((msg, i) =>
      createElement(
        'div',
        {
          key: i,
          className: msg.isUser ? 'user' : 'bot'
        },
        msg.text
      )
    ),
    // Input element
    createElement('input', {
      value: input,
      onChange: (e: Event) => setInput((e.target as HTMLInputElement).value),
      placeholder: 'Ask something...'
    }),
    // Button element
    createElement(
      'button',
      { onClick: handleSend },
      'Send'
    )
  ]
)
  );
}