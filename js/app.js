/**
 * app.js - SPA Router & Feature Controller
 */

window.knowledgeBase = {
  unit1: [],
  unit2: [],
  unit3: [],
  unit4: [],
  unit5: []
};

const unitMetadata = {
  unit1: { number: "Unit I", title: "Introduction & Problem-Solving Agents", desc: "AI definitions, PEAS framework, task environments, and agent architectures." },
  unit2: { number: "Unit II", title: "Search Strategies & Constraint Satisfaction", desc: "Uninformed & informed search, A* algorithm, Minimax, Alpha-Beta pruning, and CSPs." },
  unit3: { number: "Unit III", title: "Knowledge Representation & Logical Reasoning", desc: "Logical agents, Propositional logic, First-Order Logic, Unification, Chaining, and Resolution." },
  unit4: { number: "Unit IV", title: "Ontologies, Vision & Pattern Recognition", desc: "Ontological engineering, situation calculus, Speech & Face recognition, and Image processing." },
  unit5: { number: "Unit V", title: "AI Applications & Natural Language Processing", desc: "Expert systems, System shells, Language models, Information Retrieval (TF-IDF), and NLP parsing." }
};

const importantQuestions = [
  { unit: "Unit I", question: "What is an Intelligent Agent and how is the PEAS framework used to design it?", query: "Explain PEAS framework and Intelligent Agents" },
  { unit: "Unit I", question: "Distinguish between Rationality and Omniscience in AI agent design.", query: "Concept of Rationality and Omniscience" },
  { unit: "Unit I", question: "Compare Simple Reflex Agents, Model-Based Reflex Agents, and Goal-Based Agents.", query: "Structure of Agents and agent architectures" },
  { unit: "Unit II", question: "Compare Breadth-First Search (BFS) and Depth-First Search (DFS) in space and time complexity.", query: "Compare BFS and DFS search strategies" },
  { unit: "Unit II", question: "Explain the A* Search algorithm and conditions for heuristic admissibility.", query: "What is A* search and heuristic admissibility?" },
  { unit: "Unit II", question: "Explain the Minimax algorithm and how Alpha-Beta Pruning optimizes game search.", query: "Explain Minimax and Alpha-Beta Pruning" },
  { unit: "Unit II", question: "How does Backtracking search solve Constraint Satisfaction Problems (CSPs)?", query: "Backtracking search for CSP" },
  { unit: "Unit III", question: "Explain Knowledge-Based Agents (KBAs) and the TELL and ASK interface operations.", query: "Explain Knowledge-Based Agents" },
  { unit: "Unit III", question: "Compare Propositional Logic and First-Order Logic (FOL) in expressiveness.", query: "Compare Propositional Logic and First-Order Logic" },
  { unit: "Unit III", question: "Explain the Unification algorithm and the Most General Unifier (MGU).", query: "Explain Unification algorithm" },
  { unit: "Unit III", question: "Explain Resolution proof by refutation and Conjunctive Normal Form (CNF).", query: "Resolution proof by refutation" },
  { unit: "Unit IV", question: "What is Ontological Engineering? Explain Upper and Domain Ontologies.", query: "What is Ontological Engineering?" },
  { unit: "Unit IV", question: "Explain Voice Recognition: MFCC feature extraction and acoustic modeling.", query: "Explain Voice Recognition" },
  { unit: "Unit IV", question: "Explain Morphological Image Processing operations: Erosion and Dilation.", query: "Morphological Image Processing" },
  { unit: "Unit V", question: "Explain Expert Systems architecture and how Expert System Shells decouple rules.", query: "Explain Expert Systems and Expert System Shells" },
  { unit: "Unit V", question: "Explain Information Retrieval, Inverted Index data structures, and TF-IDF.", query: "Explain Information Retrieval and Inverted Index" },
  { unit: "Unit V", question: "Explain Syntactic Parsing, Parse Trees, and Context-Free Grammars (CFGs).", query: "Syntactic Processing and Parsing in NLP" }
];

document.addEventListener('DOMContentLoaded', () => {
  loadKnowledgeBase();
  initNavigation();
  initChatForm();
  initPromptChips();
  initExploreView();
  initSearchView();
  initImportantQuestionsView();
});

/**
 * Asynchronously loads JSON knowledge base files.
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
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          window.knowledgeBase[item.key] = data;
        })
        .catch(err => {
          console.error(`Failed loading ${item.path}:`, err);
          window.knowledgeBase[item.key] = [];
        })
    );

    await Promise.all(fetchPromises);
    renderUnitsGrid();
  } catch (err) {
    console.error("Knowledge base loading error:", err);
  }
}

/**
 * Strict SPA Navigation Logic (Critical Fix 1)
 * @param {string} pageId - Target page ID (e.g., 'view-chat', 'view-explore').
 */
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.style.display = 'none';
    page.classList.remove('active');
  });
  
  // Show target page
  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = 'flex';
    target.classList.add('active');
  }

  // Update sidebar active state
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-target') === pageId) {
      item.classList.add('active');
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initNavigation() {
  // Attach event listeners to sidebar links
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('data-target');
      showPage(targetId);
    });
  });
}

/**
 * Chat Controller
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

function initPromptChips() {
  const chips = document.querySelectorAll('.prompt-chip');
  const input = document.getElementById('chat-input');

  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const query = chip.getAttribute('data-query');
      if (query) {
        showPage('view-chat');
        if (input) input.value = query;
        processUserMessage(query);
        if (input) input.value = '';
      }
    });
  });
}

/**
 * Explore View Controller
 */
function renderUnitsGrid() {
  const grid = document.getElementById('units-grid');
  if (!grid) return;

  grid.innerHTML = Object.keys(unitMetadata).map(unitKey => {
    const meta = unitMetadata[unitKey];
    const count = (window.knowledgeBase[unitKey] || []).length;
    return `
      <div class="card unit-card" data-unitkey="${unitKey}">
        <div class="unit-badge">${meta.number} • ${count} Topics</div>
        <h2>${meta.title}</h2>
        <p>${meta.desc}</p>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.unit-card').forEach(card => {
    card.addEventListener('click', () => {
      const unitKey = card.getAttribute('data-unitkey');
      openUnitTopicsView(unitKey);
    });
  });
}

function openUnitTopicsView(unitKey) {
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
        <h3>${sanitizeString(topic.title)}</h3>
        <p>${sanitizeString(topic.overview)}</p>
      </div>
    `).join('');

    topicsGrid.querySelectorAll('.topic-card').forEach(card => {
      card.addEventListener('click', () => {
        const topicId = card.getAttribute('data-topicid');
        openExploreTopicDetail(topicId);
      });
    });
  }

  unitsListView.style.display = 'none';
  topicsView.style.display = 'block';
  topicDetailView.style.display = 'none';
}

function openExploreTopicDetail(topicId) {
  const topicObj = findTopicById(topicId);
  if (!topicObj) return;

  const topicsView = document.getElementById('unit-topics-view');
  const detailView = document.getElementById('explore-topic-detail');
  const contentElem = document.getElementById('explore-topic-content');

  if (contentElem) {
    contentElem.innerHTML = buildTopicResponse(topicObj);
    attachBubbleChipListeners(contentElem);
  }

  topicsView.style.display = 'none';
  detailView.style.display = 'block';
}

function initExploreView() {
  const backToUnitsBtn = document.getElementById('back-to-units-btn');
  const backToTopicsBtn = document.getElementById('back-to-topics-btn');

  if (backToUnitsBtn) {
    backToUnitsBtn.addEventListener('click', () => {
      document.getElementById('units-list-view').style.display = 'block';
      document.getElementById('unit-topics-view').style.display = 'none';
      document.getElementById('explore-topic-detail').style.display = 'none';
    });
  }

  if (backToTopicsBtn) {
    backToTopicsBtn.addEventListener('click', () => {
      document.getElementById('unit-topics-view').style.display = 'block';
      document.getElementById('explore-topic-detail').style.display = 'none';
    });
  }
}

/**
 * Search View Controller
 */
function initSearchView() {
  const input = document.getElementById('search-input');
  const backBtn = document.getElementById('back-to-search-btn');

  if (input) {
    input.addEventListener('input', () => {
      const term = input.value.trim();
      if (term.length > 0) {
        performSearch(term);
      } else {
        resetSearchUI();
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      document.getElementById('search-main-view').style.display = 'block';
      document.getElementById('search-topic-detail').style.display = 'none';
    });
  }
}

function performSearch(term) {
  const results = searchKnowledgeBase(term);
  const statsElem = document.getElementById('search-stats');
  const gridElem = document.getElementById('search-results-grid');
  const mainView = document.getElementById('search-main-view');
  const detailView = document.getElementById('search-topic-detail');

  mainView.style.display = 'block';
  detailView.style.display = 'none';

  if (statsElem) {
    statsElem.textContent = `Found ${results.length} matching topics for "${term}":`;
  }

  if (gridElem) {
    if (results.length === 0) {
      gridElem.innerHTML = `<p class="search-empty-state" style="color: #6B6157; font-size: 15px;">No topics found. Try a different keyword.</p>`;
      return;
    }

    gridElem.innerHTML = results.map(item => `
      <div class="card result-card" data-topicid="${item.topic.id}">
        <span class="result-unit-badge">${unitMetadata[item.unitKey].number}</span>
        <h3>${sanitizeString(item.topic.title)}</h3>
        <p>${sanitizeString(item.topic.overview)}</p>
      </div>
    `).join('');

    gridElem.querySelectorAll('.result-card').forEach(card => {
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

  const mainView = document.getElementById('search-main-view');
  const detailView = document.getElementById('search-topic-detail');
  const contentElem = document.getElementById('search-topic-content');

  if (contentElem) {
    contentElem.innerHTML = buildTopicResponse(topicObj);
    attachBubbleChipListeners(contentElem);
  }

  mainView.style.display = 'none';
  detailView.style.display = 'block';
}

function resetSearchUI() {
  const statsElem = document.getElementById('search-stats');
  const gridElem = document.getElementById('search-results-grid');
  if (statsElem) statsElem.textContent = 'Type a keyword above to search across all units.';
  if (gridElem) gridElem.innerHTML = '';
}

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

/**
 * Important Questions Controller
 */
function initImportantQuestionsView() {
  const listElem = document.getElementById('important-questions-list');
  if (!listElem) return;

  listElem.innerHTML = importantQuestions.map((qObj, index) => `
    <div class="card important-card" data-query="${qObj.query}">
      <div>
        <div class="question-text">${index + 1}. ${qObj.question}</div>
        <div class="question-unit">${qObj.unit}</div>
      </div>
    </div>
  `).join('');

  listElem.querySelectorAll('.important-card').forEach(card => {
    card.addEventListener('click', () => {
      const query = card.getAttribute('data-query');
      showPage('view-chat');
      const input = document.getElementById('chat-input');
      if (input) input.value = query;
      processUserMessage(query);
      if (input) input.value = '';
    });
  });
}
