/**
 * responses.js - Response Builder & Sanitizer
 * Formats JSON topic objects into structured HTML without emojis or headers.
 */

/**
 * Sanitizes raw text strings from JSON knowledge base files.
 * Replaces math symbols, backslashes, and dollar signs with clean plain text.
 * @param {string} str - Raw string.
 * @returns {string} - Sanitized clean string.
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';

  let clean = str;

  // Replace LaTeX and logic notation with plain English
  clean = clean.replace(/ → /g, ' to ');
  clean = clean.replace(/->/g, ' to ');
  clean = clean.replace(/=>/g, ' implies ');
  clean = clean.replace(/⇒/g, ' implies ');
  clean = clean.replace(/∧/g, ' AND ');
  clean = clean.replace(/∨/g, ' OR ');
  clean = clean.replace(/¬/g, ' NOT ');
  clean = clean.replace(/∀/g, ' For all ');
  clean = clean.replace(/∃/g, ' There exists ');
  clean = clean.replace(/\$/g, '');
  clean = clean.replace(/\\/g, '');

  // Strip residual LaTeX commands if present
  clean = clean.replace(/\\to/g, ' to ');
  clean = clean.replace(/\\in/g, ' in ');

  // Collapse extra spaces and trim
  clean = clean.replace(/\s+/g, ' ').trim();

  return clean;
}

/**
 * Builds formatted HTML for a topic object.
 * @param {Object} topic - Topic object from JSON.
 * @returns {string} - Formatted HTML string.
 */
function buildTopicResponse(topic) {
  if (!topic) return buildFallbackResponse('');

  const title = sanitizeString(topic.title);
  const overview = sanitizeString(topic.overview);

  // Key Concepts List
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

  // Algorithm Steps List
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

  // Related Topics Chips (No emojis, clean text)
  let relatedHTML = '';
  if (topic.related && topic.related.length > 0) {
    const chipButtons = topic.related
      .map(relId => {
        const relTopic = findTopicById(relId);
        const displayLabel = relTopic ? relTopic.title : relId.replace(/_/g, ' ');
        return `<button class="related-chip" data-topicid="${relId}">${sanitizeString(displayLabel)}</button>`;
      })
      .join(' ');

    relatedHTML = `
      <div class="related-container">
        <div class="related-title">Related Topics:</div>
        <div class="related-chips-grid">${chipButtons}</div>
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
 * Builds clean fallback HTML when no rule matches.
 * @param {string} rawQuery - Original user input.
 * @returns {string} - Fallback HTML string.
 */
function buildFallbackResponse(rawQuery) {
  const queryText = rawQuery ? `"${sanitizeString(rawQuery)}"` : 'that topic';

  return `
    <div class="formatted-response fallback-response">
      <h3>Topic Not Found</h3>
      <p class="overview">I couldn't find a direct match for ${queryText} in the knowledge base.</p>
      
      <div class="section-title">Suggestions:</div>
      <ul>
        <li>Try rephrasing your question using standard terms like <strong>A* search</strong>, <strong>PEAS</strong>, <strong>Minimax</strong>, <strong>Resolution</strong>, or <strong>Expert Systems</strong>.</li>
        <li>Click one of the suggested prompts below or select a related topic.</li>
      </ul>

      <div class="related-container">
        <div class="related-title">Popular topics you can ask about:</div>
        <div class="related-chips-grid">
          <button class="related-chip fallback-query-chip" data-query="What is A* search?">A* Search</button>
          <button class="related-chip fallback-query-chip" data-query="Explain PEAS framework">PEAS Framework</button>
          <button class="related-chip fallback-query-chip" data-query="What is Alpha-Beta Pruning?">Alpha-Beta Pruning</button>
          <button class="related-chip fallback-query-chip" data-query="Explain Unification algorithm">Unification</button>
          <button class="related-chip fallback-query-chip" data-query="What is Speech Recognition?">Speech Recognition</button>
          <button class="related-chip fallback-query-chip" data-query="Explain Expert Systems">Expert Systems</button>
        </div>
      </div>
    </div>
  `;
}

/**
 * Looks up a topic object by ID across loaded units.
 * @param {string} topicId - Topic ID string.
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
