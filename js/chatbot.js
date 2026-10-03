/**
 * chatbot.js - Core Chat Logic & Processing Module
 * Handles input normalization, rule matching, response construction, and bubble rendering.
 */

/**
 * Normalizes user input string:
 * Converts to lower case, trims whitespace, removes non-alphanumeric punctuation
 * except internal word hyphens.
 * @param {string} rawInput - The raw query from the user.
 * @returns {string} - Clean normalized query string.
 */
function normalizeInput(rawInput) {
  if (!rawInput) return '';
  return rawInput
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ' ') // replace punctuation with spaces
    .replace(/\s+/g, ' ');     // collapse whitespace
}

/**
 * Main chat processing function.
 * Evaluates raw query against rules, retrieves topic from Knowledge Base,
 * and appends user + assistant message bubbles.
 * @param {string} userQuery - Text submitted by user.
 */
function processUserMessage(userQuery) {
  if (!userQuery || !userQuery.trim()) return;

  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  // Remove welcome box if present on first message
  const welcomeBox = chatWindow.querySelector('.chat-welcome-box');
  if (welcomeBox) {
    welcomeBox.remove();
  }

  // 1. Render User Message Bubble
  appendUserBubble(userQuery, chatWindow);

  // 2. Process Query through Rule Engine
  const normalized = normalizeInput(userQuery);
  const matchedTopicId = matchRule(normalized);

  let responseHTML = '';
  if (matchedTopicId) {
    const topicObj = findTopicById(matchedTopicId);
    if (topicObj) {
      responseHTML = buildTopicResponse(topicObj);
    } else {
      responseHTML = buildFallbackResponse(userQuery);
    }
  } else {
    responseHTML = buildFallbackResponse(userQuery);
  }

  // 3. Render Assistant Message Bubble
  appendAssistantBubble(responseHTML, chatWindow);

  // 4. Auto scroll chat window to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * Appends a user message bubble (Right aligned, Blue) to chat window.
 * @param {string} text - User message string.
 * @param {HTMLElement} container - Chat window element.
 */
function appendUserBubble(text, container) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message user';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'bubble-content';
  contentDiv.textContent = text;
  
  msgDiv.appendChild(contentDiv);
  container.appendChild(msgDiv);
}

/**
 * Appends an assistant message bubble (Left aligned, Dark Gray with AI header) to chat window.
 * @param {string} htmlContent - Formatted HTML content string.
 * @param {HTMLElement} container - Chat window element.
 */
function appendAssistantBubble(htmlContent, container) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message assistant';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'bubble-content';

  const headerDiv = document.createElement('div');
  headerDiv.className = 'assistant-header';
  headerDiv.innerHTML = '<span class="brand-icon">✦</span> AI Knowledge Assistant';

  const bodyDiv = document.createElement('div');
  bodyDiv.innerHTML = htmlContent;

  contentDiv.appendChild(headerDiv);
  contentDiv.appendChild(bodyDiv);
  msgDiv.appendChild(contentDiv);

  container.appendChild(msgDiv);

  // Attach event listeners to any chips rendered inside this bubble
  attachBubbleChipListeners(contentDiv);
}

/**
 * Binds click events to chip buttons inside an assistant message bubble.
 * Allows clicking related topics or fallback suggestions to trigger new queries.
 * @param {HTMLElement} bubbleElement - The assistant bubble container.
 */
function attachBubbleChipListeners(bubbleElement) {
  // Related topic chips (data-topicid)
  const relatedChips = bubbleElement.querySelectorAll('.related-chip');
  relatedChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const topicId = chip.getAttribute('data-topicid');
      const topicObj = findTopicById(topicId);
      const queryText = topicObj ? topicObj.title : chip.textContent.replace('🔗 ', '');
      processUserMessage(queryText);
    });
  });

  // Fallback suggestion chips (data-query)
  const fallbackChips = bubbleElement.querySelectorAll('.fallback-chip');
  fallbackChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const queryText = chip.getAttribute('data-query');
      processUserMessage(queryText);
    });
  });

  // Fallback nav links (data-nav)
  const fallbackNavLinks = bubbleElement.querySelectorAll('.fallback-link');
  fallbackNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-nav');
      if (typeof showPage === 'function') {
        showPage(targetPage);
      }
    });
  });
}
