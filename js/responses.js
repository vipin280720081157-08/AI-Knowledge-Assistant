/**
 * responses.js - Response Builder & Sanitizer for AI Knowledge Assistant
 * Formats JSON topic objects into structured HTML for display.
 */

/**
 * Sanitizes input strings from knowledge base JSON files.
 * Replaces LaTeX math notation and raw symbols with readable plain text.
 * @param {string} str - Raw string from JSON.
 * @returns {string} - Cleaned and formatted string.
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';

  let clean = str;

  // Pattern replacements as per Step 5 specification
  clean = clean.replace(/ → /g, ' to ');
  clean = clean.replace(/->/g, ' to ');
  clean = clean.replace(/=>/g, ' implies ');
  clean = clean.replace(/⇒/g, ' implies ');
  clean = clean.replace(/∧/g, ' AND ');
  clean = clean.replace(/∨/g, ' OR ');
  clean = clean.replace(/¬/g, ' NOT ');
  clean = clean.replace(/∀/g, ' For all ');
  clean = clean.replace(/∃/g, ' There exists ');
  clean = clean.replace(/\$/g, ''); // Strip dollar signs
  clean = clean.replace(/\\/g, ''); // Strip backslashes

  // Additional LaTeX symbol cleaning if any remain
  clean = clean.replace(/\\to/g, ' to ');
  clean = clean.replace(/\\in/g, ' in ');

  // Collapse multiple spaces into a single space and trim
  clean = clean.replace(/\s+/g, ' ').trim();

  return clean;
}

/**
 * Formats a topic object into structured HTML for the Assistant chat bubble or detail view.
 * @param {Object} topic - The topic object from knowledge base.
 * @returns {string} - Formatted HTML string.
 */
function buildTopicResponse(topic) {
  if (!topic) return buildFallbackResponse('');

  const title = sanitizeString(topic.title);
  const overview = sanitizeString(topic.overview);
  
  // Format Key Concepts list
  let conceptsHTML = '';
  if (topic.key_concepts && topic.key_concepts.length > 0) {
    const listItems = topic.key_concepts
      .map(concept => `<li>${sanitizeString(concept)}</li>`)
      .join('');
    conceptsHTML = `
      <div class="section-title">Key Concepts & Principles</div>
      <ul>${listItems}</ul>
    `;
  }

  // Format Algorithm Steps list (if present and non-empty)
  let stepsHTML = '';
  if (topic.algorithm_steps && topic.algorithm_steps.length > 0) {
    const stepItems = topic.algorithm_steps
      .map(step => `<li>${sanitizeString(step)}</li>`)
      .join('');
    stepsHTML = `
      <div class="section-title">Algorithm & Operational Steps</div>
      <ol>${stepItems}</ol>
    `;
  }

  // Format Related Topics as clickable chip buttons
  let relatedHTML = '';
  if (topic.related && topic.related.length > 0) {
    const chipButtons = topic.related
      .map(relId => {
        // Find title for related topic if accessible, else use formatted ID
        const relTopic = findTopicById(relId);
        const displayLabel = relTopic ? relTopic.title : relId.replace(/_/g, ' ');
        return `<button class="chip related-chip" data-topicid="${relId}" title="Query ${displayLabel}">🔗 ${sanitizeString(displayLabel)}</button>`;
      })
      .join(' ');

    relatedHTML = `
      <div class="related-container">
        <div class="related-title">Related Syllabus Topics:</div>
        <div class="chips-grid">${chipButtons}</div>
      </div>
    `;
  }

  return `
    <div class="formatted-response">
      <h3>${title}</h3>
      <p class="overview">${overview}</p>
      ${conceptsHTML}
      ${stepsHTML}
      ${relatedHTML}
    </div>
  `;
}

/**
 * Builds a friendly fallback response when a query is not recognized.
 * @param {string} rawQuery - The user's original query string.
 * @returns {string} - Formatted fallback HTML.
 */
function buildFallbackResponse(rawQuery) {
  const queryText = rawQuery ? `"${sanitizeString(rawQuery)}"` : 'that topic';
  
  return `
    <div class="formatted-response fallback-response">
      <h3>Topic Not Found in Knowledge Base</h3>
      <p class="overview">I couldn't find a direct match for ${queryText} in the 22UAD301 syllabus knowledge base.</p>
      
      <div class="section-title">Suggestions to find your answer:</div>
      <ul>
        <li>Try rephrasing your question using standard textbook terms (e.g., <strong>"A* search"</strong>, <strong>"PEAS"</strong>, <strong>"Minimax"</strong>, <strong>"Resolution"</strong>).</li>
        <li>Use the <strong><a href="#" class="fallback-link" data-nav="search">🔎 Search Topics</a></strong> page to scan all 5 units by keyword.</li>
        <li>Browse syllabus topics directly on the <strong><a href="#" class="fallback-link" data-nav="explore">📚 Explore Units</a></strong> page.</li>
      </ul>

      <div class="related-container">
        <div class="related-title">Try asking about one of these popular topics:</div>
        <div class="chips-grid">
          <button class="chip fallback-chip" data-query="What is A* search?">🔗 A* Search</button>
          <button class="chip fallback-chip" data-query="Explain PEAS framework">🔗 PEAS Framework</button>
          <button class="chip fallback-chip" data-query="What is Alpha-Beta Pruning?">🔗 Alpha-Beta Pruning</button>
          <button class="chip fallback-chip" data-query="Explain Unification algorithm">🔗 Unification</button>
          <button class="chip fallback-chip" data-query="What is Speech Recognition?">🔗 Speech Recognition</button>
          <button class="chip fallback-chip" data-query="Explain Expert Systems">🔗 Expert Systems</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Helper function to look up a topic object by ID across all loaded units.
 * Note: Window.knowledgeBase is initialized in app.js.
 * @param {string} topicId - The ID of the topic.
 * @returns {Object|null} - Topic object or null.
 */
function findTopicById(topicId) {
  if (!window.knowledgeBase || !topicId) return null;

  for (const unitKey in window.knowledgeBase) {
    const unitTopics = window.knowledgeBase[unitKey];
    if (Array.isArray(unitTopics)) {
      const match = unitTopics.find(t => t.id === topicId);
      if (match) return match;
    }
  }

  return null;
}
