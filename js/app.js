/**
 * app.js - Main Application Orchestrator
 * Manages async Knowledge Base loading, SPA page routing, search, Explore view,
 * Important Questions, Suggested Questions, and UI event listeners.
 */

// Global Knowledge Base Container
window.knowledgeBase = {
  unit1: [],
  unit2: [],
  unit3: [],
  unit4: [],
  unit5: []
};

// Unit Metadata Configuration
const unitMetadata = {
  unit1: { number: "Unit I", title: "Introduction & Problem-Solving Agents", desc: "AI definitions, Foundations, PEAS framework, Environment typologies, and Agent architectures." },
  unit2: { number: "Unit II", title: "Search Strategies & Constraint Satisfaction", desc: "Uninformed & Informed search, A* algorithm, Local search, Adversarial games (Minimax), and CSPs." },
  unit3: { number: "Unit III", title: "Knowledge Representation & Logical Reasoning", desc: "Logical agents, Propositional logic, First-Order Logic, Unification, Forward/Backward chaining, and Resolution." },
  unit4: { number: "Unit IV", title: "Ontologies, Vision & Pattern Recognition", desc: "Ontological engineering, Situation calculus, Speech & Face recognition, Image segmentation, and Morphological processing." },
  unit5: { number: "Unit V", title: "AI Applications & Natural Language Processing", desc: "Expert systems, System shells, Language models, Information Retrieval (TF-IDF), Syntactic parsing, and NLP." }
};

// Curated List of Important Questions (Syllabus Highlights across Units 1 to 5)
const importantQuestions = [
  { unit: "Unit I", question: "What is an Intelligent Agent and how is the PEAS framework used to design it?", query: "Explain PEAS framework and Intelligent Agents" },
  { unit: "Unit I", question: "Distinguish between Rationality and Omniscience in AI agent design.", query: "Concept of Rationality and Omniscience" },
  { unit: "Unit I", question: "Compare Simple Reflex Agents, Model-Based Reflex Agents, and Goal-Based Agents.", query: "Structure of Agents and agent architectures" },
  { unit: "Unit II", question: "Compare Breadth-First Search (BFS) and Depth-First Search (DFS) in terms of space and time complexity.", query: "Compare BFS and DFS search strategies" },
  { unit: "Unit II", question: "Explain the A* Search algorithm. What conditions guarantee heuristic admissibility and consistency?", query: "What is A* search and heuristic admissibility?" },
  { unit: "Unit II", question: "Explain the Minimax algorithm and how Alpha-Beta Pruning reduces game tree expansion.", query: "Explain Minimax and Alpha-Beta Pruning" },
  { unit: "Unit II", question: "How does Backtracking search solve Constraint Satisfaction Problems (CSPs)?", query: "Backtracking search for CSP" },
  { unit: "Unit III", question: "Explain the architecture of Knowledge-Based Agents (KBAs) and the TELL/ASK interface.", query: "Explain Knowledge-Based Agents" },
  { unit: "Unit III", question: "Compare Propositional Logic and First-Order Logic (FOL) in expressiveness and syntax.", query: "Compare Propositional Logic and First-Order Logic" },
  { unit: "Unit III", question: "Explain the Unification algorithm and the role of the Most General Unifier (MGU).", query: "Explain Unification algorithm" },
  { unit: "Unit III", question: "Explain Resolution proof by refutation and conversion to Conjunctive Normal Form (CNF).", query: "Resolution proof by refutation" },
  { unit: "Unit IV", question: "What is Ontological Engineering? Explain Upper Ontologies and Domain Ontologies.", query: "What is Ontological Engineering?" },
  { unit: "Unit IV", question: "Explain the Voice Recognition pipeline: MFCC feature extraction and acoustic modeling.", query: "Explain Voice Recognition" },
  { unit: "Unit IV", question: "Explain Morphological Image Processing operations: Erosion, Dilation, Opening, and Closing.", query: "Morphological Image Processing" },
  { unit: "Unit V", question: "Explain the architecture of Expert Systems and how Expert System Shells decouple rules.", query: "Explain Expert Systems and Expert System Shells" },
  { unit: "Unit V", question: "Explain Information Retrieval, Inverted Index data structures, and TF-IDF term weighting.", query: "Explain Information Retrieval and Inverted Index" },
  { unit: "Unit V", question: "Explain Syntactic Parsing, Parse Trees, and Context-Free Grammars (CFGs) in NLP.", query: "Syntactic Processing and Parsing in NLP" }
];

// Suggested Question Chips for Home Page
const suggestedHomeQuestions = [
  "What is A* Search?",
  "Explain PEAS Framework",
  "What is Alpha-Beta Pruning?",
  "Explain Unification Algorithm",
  "What is Speech Recognition?",
  "Explain Expert Systems",
  "Compare BFS and DFS",
  "What is Resolution in FOL?"
];

// Active State Tracker for Explore View
let currentExploreUnitKey = null;

/* --------------------------------------------------------------------------
   Initialization on DOM Load
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  loadKnowledgeBase();
  initNavigation();
  initMobileDrawer();
  initChatForm();
  initHomeSuggestedChips();
  initImportantQuestionsView();
  initSearchListeners();
  initExploreListeners();
});

/**
 * Asynchronously fetches all 5 knowledge base JSON files.
 */
async function loadKnowledgeBase() {
  const loadingIndicator = document.getElementById('loading-indicator');
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
          if (!response.ok) throw new Error(`HTTP error ${response.status} loading ${item.path}`);
          return response.json();
        })
        .then(data => {
          window.knowledgeBase[item.key] = data;
        })
        .catch(err => {
          console.error(`Error loading ${item.path}:`, err);
          window.knowledgeBase[item.key] = [];
        })
    );

    await Promise.all(fetchPromises);

    if (loadingIndicator) {
      loadingIndicator.style.display = 'none';
    }

    // Render Explore Units view grid once JSON data is available
    renderUnitsGrid();

  } catch (error) {
    console.error("Knowledge base initialization failed:", error);
    if (loadingIndicator) {
      loadingIndicator.innerHTML = `<p style="color: var(--color-warning);">Warning: Failed to load some knowledge base files. Local browsing may be limited.</p>`;
    }
  }
}

/* --------------------------------------------------------------------------
   Page Routing & Navigation (SPA)
   -------------------------------------------------------------------------- */

/**
 * Displays the specified page view and updates navigation UI states.
 * @param {string} pageId - Target page identifier (home, chat, explore, search, important, about).
 */
function showPage(pageId) {
  // Hide all page views
  const pages = document.querySelectorAll('.page-view');
  pages.forEach(p => p.classList.remove('active'));

  // Show target page
  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add('active');
  }

  // Update active status on sidebar nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-page') === pageId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Close mobile sidebar drawer if open
  closeMobileDrawer();

  // Scroll main canvas back to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Initializes navigation event listeners for sidebar items and quick cards.
 */
function initNavigation() {
  // Sidebar nav items
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const pageId = item.getAttribute('data-page');
      showPage(pageId);
    });
  });

  // Quick access cards on Home page
  const quickCards = document.querySelectorAll('.quick-card');
  quickCards.forEach(card => {
    card.addEventListener('click', () => {
      const targetPage = card.getAttribute('data-navigate');
      showPage(targetPage);
    });
  });
}

/**
 * Mobile navigation drawer handlers.
 */
function initMobileDrawer() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (hamburgerBtn && sidebar && overlay) {
    hamburgerBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('mobile-open');
    });

    overlay.addEventListener('click', closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar && overlay) {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('mobile-open');
  }
}

/* --------------------------------------------------------------------------
   Home View Logic
   -------------------------------------------------------------------------- */
function initHomeSuggestedChips() {
  const container = document.getElementById('home-suggested-chips');
  if (!container) return;

  container.innerHTML = suggestedHomeQuestions
    .map(q => `<button class="chip home-suggested-chip" data-query="${q}">🔗 ${q}</button>`)
    .join('');

  const chips = container.querySelectorAll('.home-suggested-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query');
      showPage('chat');
      processUserMessage(query);
    });
  });
}

/* --------------------------------------------------------------------------
   Chat View Logic
   -------------------------------------------------------------------------- */
function initChatForm() {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const clearBtn = document.getElementById('clear-chat-btn');

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

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      const chatWindow = document.getElementById('chat-window');
      if (chatWindow) {
        chatWindow.innerHTML = `
          <div class="chat-welcome-box">
            <div class="welcome-avatar">✦</div>
            <h3>Welcome to AI Knowledge Assistant!</h3>
            <p>I can help you understand AI concepts, algorithms, search strategies, logic systems, ontologies, and NLP. Type a concept or question below to start.</p>
          </div>
        `;
      }
    });
  }
}

/* --------------------------------------------------------------------------
   Explore Units View Logic
   -------------------------------------------------------------------------- */
function renderUnitsGrid() {
  const grid = document.getElementById('units-grid');
  if (!grid) return;

  grid.innerHTML = Object.keys(unitMetadata).map(unitKey => {
    const meta = unitMetadata[unitKey];
    const topicCount = (window.knowledgeBase[unitKey] || []).length;
    return `
      <div class="card unit-card" data-unitkey="${unitKey}">
        <div class="unit-number">${meta.number} • ${topicCount} Topics</div>
        <h3>${meta.title}</h3>
        <p>${meta.desc}</p>
      </div>
    `;
  }).join('');

  const unitCards = grid.querySelectorAll('.unit-card');
  unitCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-unitkey');
      openUnitTopicsView(key);
    });
  });
}

function openUnitTopicsView(unitKey) {
  currentExploreUnitKey = unitKey;
  const meta = unitMetadata[unitKey];
  const topics = window.knowledgeBase[unitKey] || [];

  const unitsListView = document.getElementById('units-list-view');
  const topicsView = document.getElementById('unit-topics-view');
  const topicDetailView = document.getElementById('explore-topic-detail');
  const titleElem = document.getElementById('current-unit-title');
  const topicsGrid = document.getElementById('topics-grid');

  if (titleElem) titleElem.textContent = `${meta.number}: ${meta.title}`;

  if (topicsGrid) {
    topicsGrid.innerHTML = topics.map(topic => `
      <div class="card topic-card" data-topicid="${topic.id}">
        <h4>${sanitizeString(topic.title)}</h4>
        <p>${sanitizeString(topic.overview)}</p>
      </div>
    `).join('');

    const topicCards = topicsGrid.querySelectorAll('.topic-card');
    topicCards.forEach(card => {
      card.addEventListener('click', () => {
        const topicId = card.getAttribute('data-topicid');
        openExploreTopicDetail(topicId);
      });
    });
  }

  unitsListView.classList.add('hidden');
  topicsView.classList.remove('hidden');
  topicDetailView.classList.add('hidden');
}

function openExploreTopicDetail(topicId) {
  const topicObj = findTopicById(topicId);
  if (!topicObj) return;

  const topicsView = document.getElementById('unit-topics-view');
  const detailView = document.getElementById('explore-topic-detail');
  const contentContainer = document.getElementById('explore-topic-content');

  if (contentContainer) {
    contentContainer.innerHTML = buildTopicResponse(topicObj);
    attachBubbleChipListeners(contentContainer);
  }

  topicsView.classList.add('hidden');
  detailView.classList.remove('hidden');
}

function initExploreListeners() {
  const backToUnitsBtn = document.getElementById('back-to-units-btn');
  const backToTopicsBtn = document.getElementById('back-to-topics-btn');

  if (backToUnitsBtn) {
    backToUnitsBtn.addEventListener('click', () => {
      document.getElementById('units-list-view').classList.remove('hidden');
      document.getElementById('unit-topics-view').classList.add('hidden');
      document.getElementById('explore-topic-detail').classList.add('hidden');
    });
  }

  if (backToTopicsBtn) {
    backToTopicsBtn.addEventListener('click', () => {
      document.getElementById('unit-topics-view').classList.remove('hidden');
      document.getElementById('explore-topic-detail').classList.add('hidden');
    });
  }
}

/* --------------------------------------------------------------------------
   Search View Logic
   -------------------------------------------------------------------------- */
function initSearchListeners() {
  const input = document.getElementById('search-input');
  const clearBtn = document.getElementById('search-clear-btn');
  const backBtn = document.getElementById('back-to-search-btn');

  if (input) {
    input.addEventListener('input', () => {
      const term = input.value.trim();
      if (term.length > 0) {
        if (clearBtn) clearBtn.classList.remove('hidden');
        performSearch(term);
      } else {
        if (clearBtn) clearBtn.classList.add('hidden');
        resetSearchUI();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (input) input.value = '';
      clearBtn.classList.add('hidden');
      resetSearchUI();
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('search-results-container').classList.remove('hidden');
      document.getElementById('search-topic-detail').classList.add('hidden');
    });
  }
}

function performSearch(term) {
  const results = searchKnowledgeBase(term);
  const statsElem = document.getElementById('search-stats');
  const gridElem = document.getElementById('search-results-grid');
  const detailView = document.getElementById('search-topic-detail');
  const resultsContainer = document.getElementById('search-results-container');

  resultsContainer.classList.remove('hidden');
  detailView.classList.add('hidden');

  if (statsElem) {
    statsElem.textContent = `Found ${results.length} matching topics for "${term}":`;
  }

  if (gridElem) {
    if (results.length === 0) {
      gridElem.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1;">No matching topics found. Try rephrasing your search query.</p>`;
      return;
    }

    gridElem.innerHTML = results.map(item => `
      <div class="card result-card" data-topicid="${item.topic.id}">
        <span class="result-unit-badge">${unitMetadata[item.unitKey].number}</span>
        <h4>${sanitizeString(item.topic.title)}</h4>
        <p>${sanitizeString(item.topic.overview)}</p>
      </div>
    `).join('');

    const resultCards = gridElem.querySelectorAll('.result-card');
    resultCards.forEach(card => {
      card.addEventListener('click', () => {
        const topicId = card.getAttribute('data-topicid');
        openSearchTopicDetail(topicId);
      });
    });
  }
}

function openSearchTopicDetail(topicId) {
  const topicObj = findTopicById(topicId);
  if (!topicObj) return;

  const resultsContainer = document.getElementById('search-results-container');
  const detailView = document.getElementById('search-topic-detail');
  const contentElem = document.getElementById('search-topic-content');

  if (contentElem) {
    contentElem.innerHTML = buildTopicResponse(topicObj);
    attachBubbleChipListeners(contentElem);
  }

  resultsContainer.classList.add('hidden');
  detailView.classList.remove('hidden');
}

function resetSearchUI() {
  const statsElem = document.getElementById('search-stats');
  const gridElem = document.getElementById('search-results-grid');
  if (statsElem) statsElem.textContent = 'Type a query above to start searching.';
  if (gridElem) gridElem.innerHTML = '';
}

/**
 * Searches across all 5 JSON units for term matches in title and key_concepts.
 * @param {string} term - Search term.
 * @returns {Array<Object>} - Array of { unitKey, topic } matches.
 */
function searchKnowledgeBase(term) {
  if (!term) return [];
  const cleanTerm = term.toLowerCase().trim();
  const results = [];

  for (const unitKey in window.knowledgeBase) {
    const topics = window.knowledgeBase[unitKey];
    if (Array.isArray(topics)) {
      topics.forEach(topic => {
        const titleMatch = topic.title && topic.title.toLowerCase().includes(cleanTerm);
        const conceptMatch = topic.key_concepts && topic.key_concepts.some(c => c.toLowerCase().includes(cleanTerm));
        const overviewMatch = topic.overview && topic.overview.toLowerCase().includes(cleanTerm);

        if (titleMatch || conceptMatch || overviewMatch) {
          results.push({ unitKey, topic });
        }
      });
    }
  }

  return results;
}

/* --------------------------------------------------------------------------
   Important Questions View Logic
   -------------------------------------------------------------------------- */
function initImportantQuestionsView() {
  const grid = document.getElementById('important-questions-grid');
  if (!grid) return;

  grid.innerHTML = importantQuestions.map((qObj, index) => `
    <div class="card question-card" data-query="${qObj.query}">
      <div>
        <div class="question-text">${index + 1}. ${qObj.question}</div>
        <div class="question-unit">${qObj.unit}</div>
      </div>
      <span class="question-action">Ask Assistant →</span>
    </div>
  `).join('');

  const qCards = grid.querySelectorAll('.question-card');
  qCards.forEach(card => {
    card.addEventListener('click', () => {
      const query = card.getAttribute('data-query');
      showPage('chat');
      processUserMessage(query);
    });
  });
}
