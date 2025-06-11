import { useState } from 'react';

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
    <div className="chatbot">
      {messages.map((msg, i) => (
        <div key={i} className={msg.isUser ? 'user' : 'bot'}>
          {msg.text}
        </div>
      ))}
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Ask something..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}