/**
 * app.js - Main Application Orchestrator
 * Asynchronously loads Knowledge Base JSON files and binds input bar & prompt chip listeners.
 */

// Global Knowledge Base Object
window.knowledgeBase = {
  unit1: [],
  unit2: [],
  unit3: [],
  unit4: [],
  unit5: []
};

/**
 * Initializes application on DOM load.
 */
document.addEventListener('DOMContentLoaded', () => {
  loadKnowledgeBase();
  initChatForm();
  initSuggestedPromptChips();
});

/**
 * Asynchronously loads knowledge base JSON files into window.knowledgeBase.
 */
async function loadKnowledgeBase() {
  const unitFiles = [
    { key: 'unit1', path: 'knowledge/unit1.json' },
    { key: 'unit2', path: 'knowledge/unit2.json' },
    { key: 'unit3', path: 'knowledge/unit3.json' },
    { key: 'unit4', path: 'knowledge/unit4.json' },
    { key: 'unit5', path: 'knowledge/unit5.json' }
  ];

  try {
    const fetchPromises = unitFiles.map(item =>
      fetch(item.path)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status} loading ${item.path}`);
          return response.json();
        })
        .then(data => {
          window.knowledgeBase[item.key] = data;
        })
        .catch(err => {
          console.error(`Failed to load ${item.path}:`, err);
          window.knowledgeBase[item.key] = [];
        })
    );

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error("Knowledge base initialization error:", error);
  }
}

/**
 * Initializes input form submit listener.
 */
function initChatForm() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value;
      if (text && text.trim()) {
        processUserMessage(text);
        input.value = '';
      }
    });
  }
}

/**
 * Binds click events to the 6 prompt chips above the input bar.
 * Clicking a chip populates the input field and auto-submits the query.
 */
function initSuggestedPromptChips() {
  const promptChips = document.querySelectorAll('.prompt-chip');
  const input = document.getElementById('chat-input');

  promptChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const query = chip.getAttribute('data-query');
      if (query) {
        if (input) input.value = query;
        processUserMessage(query);
        if (input) input.value = '';
      }
    });
  });
}
