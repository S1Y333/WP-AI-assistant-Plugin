declare global {
  interface Window {
    wpApiSettings: {
      root: string;
      nonce: string;
    };
  }
}

type KnowledgeItem = { id: string; question: string; answer: string };

export const getKnowledge = async (): Promise<KnowledgeItem[]> => {
  const response = await fetch(`${window.wpApiSettings.root}ai-chatbot/v1/knowledge`, {
    headers: {
      'X-WP-Nonce': window.wpApiSettings.nonce,
    },
  });
  return await response.json();
};

export const saveKnowledge = async (items: KnowledgeItem[]): Promise<void> => {
  await fetch(`${window.wpApiSettings.root}ai-chatbot/v1/knowledge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': window.wpApiSettings.nonce,
    },
    body: JSON.stringify(items),
  });
};