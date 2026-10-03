/**
 * chatbot.js - Core Chat Logic & Reveal Controller
 * Handles user input processing, typing indicators, list marker alignment,
 * and structured line-by-line reveal animation.
 */

/**
 * Normalizes user input text by lowercasing, trimming, and stripping punctuation except hyphens.
 * @param {string} rawInput - Raw input string.
 * @returns {string} - Clean normalized query string.
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
 * Main chat handler function.
 * Appends user bubble, displays typing indicator, evaluates rule engine,
 * and animates assistant response.
 * @param {string} userQuery - Query submitted by user.
 */
function processUserMessage(userQuery) {
  if (!userQuery || !userQuery.trim()) return;

  const chatWindow = document.getElementById('chat-window');
  if (!chatWindow) return;

  // 1. Append User Bubble immediately
  appendUserBubble(userQuery, chatWindow);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // 2. Display Typing Indicator Bubble
  const typingIndicatorBubble = createTypingIndicatorBubble();
  chatWindow.appendChild(typingIndicatorBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // 3. Evaluate Query via Rule Engine & KB Lookup
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

  // 4. Brief thought delay, then animate response reveal
  setTimeout(() => {
    // Remove typing indicator
    if (typingIndicatorBubble && typingIndicatorBubble.parentNode) {
      typingIndicatorBubble.parentNode.removeChild(typingIndicatorBubble);
    }

    // Append Assistant Response Bubble Shell
    const assistantBubble = document.createElement('div');
    assistantBubble.className = 'chat-message assistant';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'bubble-content';
    assistantBubble.appendChild(contentDiv);

    chatWindow.appendChild(assistantBubble);

    // Run Structured Line-by-Line Reveal Animation
    animateStructuredReveal(contentDiv, responseHTML, () => {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    });

  }, 400);
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
 * Creates a typing indicator bubble with 3 animated bouncing dots.
 * @returns {HTMLElement} - Typing indicator DOM element.
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
 * Structured reveal animation controller.
 * Appends list item lines fully-formed (marker + line text together)
 * and streams paragraph words smoothly to eliminate floating list marker bugs.
 * @param {HTMLElement} targetContainer - Bubble container.
 * @param {string} rawHTML - Formatted HTML from responses.js.
 * @param {Function} onComplete - Callback when reveal finishes.
 */
function animateStructuredReveal(targetContainer, rawHTML, onComplete) {
  const chatWindow = document.getElementById('chat-window');

  // Parse rawHTML into virtual DOM
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = rawHTML;

  const formattedResponse = tempDiv.querySelector('.formatted-response');
  if (!formattedResponse) {
    targetContainer.innerHTML = rawHTML;
    attachBubbleChipListeners(targetContainer);
    if (onComplete) onComplete();
    return;
  }

  // Create real wrapper in target container
  const realWrapper = document.createElement('div');
  realWrapper.className = 'formatted-response';
  targetContainer.appendChild(realWrapper);

  const children = Array.from(formattedResponse.children);
  let childIndex = 0;

  function processNextChild() {
    if (childIndex >= children.length) {
      attachBubbleChipListeners(targetContainer);
      if (onComplete) onComplete();
      return;
    }

    const currentElem = children[childIndex];
    childIndex++;

    const tag = currentElem.tagName.toLowerCase();

    if (tag === 'h3' || currentElem.classList.contains('section-title')) {
      // Append heading/title instantly as single unit
      realWrapper.appendChild(currentElem.cloneNode(true));
      scrollToBottom();
      setTimeout(processNextChild, 60);
    } 
    else if (tag === 'p') {
      // Word-by-word reveal for overview paragraphs
      const cloneP = currentElem.cloneNode(false); // empty element
      realWrapper.appendChild(cloneP);

      const words = currentElem.textContent.split(' ');
      let wordIndex = 0;

      const pTimer = setInterval(() => {
        if (wordIndex >= words.length) {
          clearInterval(pTimer);
          scrollToBottom();
          setTimeout(processNextChild, 60);
          return;
        }

        cloneP.textContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        wordIndex++;
        scrollToBottom();
      }, 25);
    } 
    else if (tag === 'ul' || tag === 'ol') {
      // Line-by-line reveal for list items (marker + text appended together)
      const cloneList = currentElem.cloneNode(false); // empty list element
      realWrapper.appendChild(cloneList);

      const listItems = Array.from(currentElem.querySelectorAll('li'));
      let itemIndex = 0;

      const listTimer = setInterval(() => {
        if (itemIndex >= listItems.length) {
          clearInterval(listTimer);
          scrollToBottom();
          setTimeout(processNextChild, 60);
          return;
        }

        // Append whole <li> with marker & text simultaneously
        cloneList.appendChild(listItems[itemIndex].cloneNode(true));
        itemIndex++;
        scrollToBottom();
      }, 70);
    } 
    else if (currentElem.classList.contains('related-container')) {
      // Append related topics container and fade in
      const cloneRelated = currentElem.cloneNode(true);
      realWrapper.appendChild(cloneRelated);
      scrollToBottom();

      setTimeout(() => {
        cloneRelated.classList.add('visible');
        scrollToBottom();
        processNextChild();
      }, 100);
    } 
    else {
      // Fallback for any other element
      realWrapper.appendChild(currentElem.cloneNode(true));
      scrollToBottom();
      setTimeout(processNextChild, 60);
    }
  }

  function scrollToBottom() {
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }

  processNextChild();
}

/**
 * Attaches click event listeners to chips inside assistant message bubbles.
 * @param {HTMLElement} bubbleElement - Assistant bubble DOM element.
 */
function attachBubbleChipListeners(bubbleElement) {
  const chips = bubbleElement.querySelectorAll('.related-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const topicId = chip.getAttribute('data-topicid');
      const queryAttr = chip.getAttribute('data-query');

      // If user is currently on another view, switch back to Chat
      if (typeof showPage === 'function') {
        showPage('chat');
      }

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
