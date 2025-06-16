import { useState, useEffect } from 'react';
const { createElement} = wp.element;

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

  return createElement(
    'div',
    null,
    createElement(
      'table',
      null,
      createElement(
        'thead',
        null,
        createElement(
          'tr',
          null,
          createElement('th', null, 'Question'),
          createElement('th', null, 'Answer'),
          createElement('th', null, 'Actions')
        )
      ),
      createElement(
        'tbody',
        null,
        items.map((item, idx) =>
          createElement(
            'tr',
            { key: item.id },
            createElement(
              'td',
              null,
              createElement('input', {
                value: item.question,
                onChange: (e: any) => {
                  const newItems = [...items];
                  newItems[idx].question = e.target.value;
                  setItems(newItems);
                }
              })
            ),
        createElement(
              'td',
              null,
              createElement('textarea', {
                value: item.answer,
                onChange: (e: any) => {
                  const newItems = [...items];
                  newItems[idx].answer = e.target.value;
                  setItems(newItems);
                }
              })
            ),
           createElement(
              'td',
              null,
              createElement(
                'button',
                {
                  onClick: () => {
                    setItems(items.filter((_, i) => i !== idx));
                  }
                },
                'Delete'
              )
            )
          )
        )
      )
    ),
    createElement(
      'button',
      {
        onClick: () =>
          setItems([
            ...items,
            { id: Date.now().toString(), question: '', answer: '' }
          ])
      },
      'Add New'
    ),
    createElement('button', { onClick: handleSave }, 'Save All')
  );
}