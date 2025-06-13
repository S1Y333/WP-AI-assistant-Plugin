import { useState, useEffect } from 'react';
import { getKnowledge, saveKnowledge } from '../services/api';

type KnowledgeItem = { id: string; question: string; answer: string };

export default function KnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    const data = await getKnowledge();
    setItems(data);
  };

  const handleSave = async () => {
    await saveKnowledge(items);
    alert('Knowledge saved successfully!');
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  value={item.question}
                  onChange={(e) => {/* Update logic */}}
                />
              </td>
              <td>
                <textarea
                  value={item.answer}
                  onChange={(e) => {/* Update logic */}}
                />
              </td>
              <td>
                <button onClick={() => {/* Delete logic */}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setItems([...items, { id: Date.now().toString(), question: '', answer: '' }])}>
        Add New
      </button>
      <button onClick={handleSave}>Save All</button>
    </div>
  );
}