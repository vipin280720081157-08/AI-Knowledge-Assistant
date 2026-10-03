/**
 * chatbot.js - Core Chat Logic & Typing Animation Controller
 * Handles user input processing, assistant typing animation, and message bubble creation.
 */

/**
 * Normalizes user input string: lowercases, trims, strips punctuation except hyphens.
 * @param {string} rawInput - Raw input text.
 * @returns {string} - Clean normalized query.
 */
function normalizeInput(rawInput) {
  if (!rawInput) return '';
  return rawInput
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ');
}

/**
 * Main chat handler. Appends user message, shows typing indicator,
 * evaluates rule engine, and reveals assistant response with typing animation.
 * @param {string} userQuery - Text submitted by user.
 */
function processUserMessage(userQuery) {
  if (!userQuery || !userQuery.trim()) return;

  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  // 1. Immediately append User Bubble
  appendUserBubble(userQuery, chatWindow);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // 2. Append Assistant Typing Indicator Bubble
  const typingIndicatorBubble = createTypingIndicatorBubble();
  chatWindow.appendChild(typingIndicatorBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // 3. Evaluate Rule Engine & KB Lookup
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

  // 4. Delay briefly to simulate thought, then swap indicator with assistant response
  setTimeout(() => {
    // Remove typing indicator
    if (typingIndicatorBubble && typingIndicatorBubble.parentNode) {
      typingIndicatorBubble.parentNode.removeChild(typingIndicatorBubble);
    }

    // Append Assistant Response Bubble
    const assistantBubble = document.createElement('div');
    assistantBubble.className = 'chat-message assistant';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'bubble-content';
    contentDiv.innerHTML = responseHTML;

    assistantBubble.appendChild(contentDiv);
    chatWindow.appendChild(assistantBubble);

    // Attach click listeners to chips inside bubble
    attachBubbleChipListeners(contentDiv);

    // Run Typing Reveal Animation on Assistant Text
    animateTypingReveal(contentDiv, () => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });

  }, 450);
}

/**
 * Appends User message bubble (Terracotta, right aligned).
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
 * Creates a typing indicator element with three animated bouncing dots.
 * @returns {HTMLElement} - Typing indicator container.
 */
function createTypingIndicatorBubble() {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chat-message assistant';

  const indicatorDiv = document.createElement('div');
  indicatorDiv.className = 'typing-indicator';
  indicatorDiv.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;

  msgDiv.appendChild(indicatorDiv);
  return msgDiv;
}

/**
 * Progressively reveals text nodes in an element to simulate a typing effect.
 * Preserves all HTML structure and formatting.
 * @param {HTMLElement} container - Container holding response HTML.
 * @param {Function} onComplete - Callback when typing completes.
 */
function animateTypingReveal(container, onComplete) {
  const chatWindow = document.getElementById('chat-window');

  // Collect text nodes excluding the related topics container
  const textNodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, {
    acceptNode: function(node) {
      if (node.parentElement && node.parentElement.closest('.related-container')) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let currentNode;
  while (currentNode = walker.nextNode()) {
    if (currentNode.nodeValue.trim().length > 0) {
      textNodes.push({
        node: currentNode,
        fullText: currentNode.nodeValue
      });
      currentNode.nodeValue = ''; // Clear text initially
    }
  }

  // If no text nodes, immediately reveal related container
  if (textNodes.length === 0) {
    revealRelatedContainer();
    if (onComplete) onComplete();
    return;
  }

  let nodeIndex = 0;
  let charIndex = 0;
  const charsPerTick = 2; // Speed: ~25 characters per second

  const typingTimer = setInterval(() => {
    if (nodeIndex >= textNodes.length) {
      clearInterval(typingTimer);
      revealRelatedContainer();
      if (onComplete) onComplete();
      return;
    }

    const currentItem = textNodes[nodeIndex];
    charIndex += charsPerTick;

    if (charIndex >= currentItem.fullText.length) {
      currentItem.node.nodeValue = currentItem.fullText;
      nodeIndex++;
      charIndex = 0;
    } else {
      currentItem.node.nodeValue = currentItem.fullText.substring(0, charIndex);
    }

    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, 20);

  function revealRelatedContainer() {
    const relatedElem = container.querySelector('.related-container');
    if (relatedElem) {
      relatedElem.classList.add('visible');
    }
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }
}

/**
 * Binds click events to related chips and fallback buttons inside assistant bubbles.
 * @param {HTMLElement} bubbleElement - Assistant bubble DOM element.
 */
function attachBubbleChipListeners(bubbleElement) {
  const relatedChips = bubbleElement.querySelectorAll('.related-chip');
  relatedChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const topicId = chip.getAttribute('data-topicid');
      const queryAttr = chip.getAttribute('data-query');

      if (topicId) {
        const topicObj = findTopicById(topicId);
        const queryText = topicObj ? topicObj.title : chip.textContent.trim();
        processUserMessage(queryText);
      } else if (queryAttr) {
        processUserMessage(queryAttr);
      } else {
        processUserMessage(chip.textContent.trim());
      }
    });
  });
}
