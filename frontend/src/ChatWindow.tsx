import { useState, useEffect } from 'react';


declare const wp: any;
const { createElement } = wp.element;

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};


export default function ChatWindow() {
   const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Hello! Welcome to Magnet website. How can I help you today?', sender: 'bot' }
  ]);
  const [input, setInput] = useState<string>('');
 
 

  const toggleChat = () => setIsOpen(!isOpen);
   
  const sendMessage = async (event?: React.FormEvent) => {

    if (event) event.preventDefault();
      if (!input.trim()) return;
      setMessages(prev => [...prev, { id: messages.length +1, sender: "user", text: input }]);

      const response = await fetch("http://localhost:8080/api/agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      
      const data = await response.json();
      console.log("Response from server:", data);

      setMessages(prev => [...prev, {  id: prev.length + 1,sender: "bot", text: data.reply }]);
      setInput("");
  }

  return (
    createElement(
  'div',
  { className: 'tw-fixed tw-bottom-6 tw-right-6 tw-z-50' },
  isOpen
    ? createElement(
        'div',
        { className: 'tw-w-80 tw-h-96 tw-bg-white tw-rounded-t-lg tw-shadow-xl tw-flex tw-flex-col tw-border tw-border-gray-200' },
        // Header
        createElement(
          'div',
          {
            className: 'tw-bg-red-700 tw-text-white tw-p-3 tw-rounded-t-lg tw-flex tw-justify-between tw-items-center tw-cursor-pointer',
            onClick: toggleChat
          },
          createElement('h3', { className: 'tw-font-semibold' }, 'Magnet Chatbot'),
          createElement(
            'button',
            { className: 'tw-text-white focus:tw-outline-none tw-bg-red-700' },
            isOpen ? 'X' : '+'
          )
        ),
        // Messages
        createElement(
          'div',
          { className: 'tw-flex-1 tw-p-4 tw-overflow-y-auto' },
          messages.map((message) =>
            createElement(
              'div',
              {
                key: message.id,
                className: `tw-mb-3 ${message.sender === 'user' ? 'tw-text-right' : 'tw-text-left'}`
              },
              createElement(
                'div',
                {
                  className: `tw-inline-block tw-p-2 tw-rounded-lg ${
                    message.sender === 'user'
                      ? 'tw-bg-red-700 tw-text-white'
                      : 'tw-bg-gray-200 tw-text-gray-800'
                  }`
                },
                message.text
              )
            )
          )
        ),
        // Input
        createElement(
          'form',
          { onSubmit: sendMessage, className: 'tw-p-3 tw-border-t tw-border-gray-200' },
          createElement(
            'div',
            { className: 'tw-flex' },
            createElement('input', {
              type: 'text',
              value: input,
              onChange: (e) => setInput(e.target.value),
              placeholder: 'Type your message...',
              className: 'tw-flex-1 tw-p-2 tw-border tw-border-gray-300 tw-rounded-l-lg focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-red-600 mar-btm',
              
            }),
            createElement(
              'button',
              {
                type: 'submit',
                className: 'tw-bg-red-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-r-lg hover:tw-bg-red-800 focus:tw-outline-none'
              },
              'Send'
            )
          )
        )
      )
    : // Closed chat button
      createElement(
        'button',
        {
          onClick: toggleChat,
          className: 'tw-bg-red-700 tw-text-white tw-p-4 tw-rounded-full tw-shadow-lg hover:tw-bg-red-800 focus:tw-outline-none'
        },
        createElement(
          'svg',
          {
            xmlns: 'http://www.w3.org/2000/svg',
            className: 'tw-h-6 tw-w-6',
            fill: 'none',
            viewBox: '0 0 24 24',
            stroke: 'currentColor'
          },
          createElement('path', {
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            strokeWidth: 2,
            d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
          })
        )
      )
)

  );
}