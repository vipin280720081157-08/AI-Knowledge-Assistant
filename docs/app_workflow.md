```markdown
# AI Knowledge Assistant - Application Workflow

## 1. High-Level Architecture

The application follows a modular, event-driven architecture that runs entirely in the browser. There is no backend server, no database, and no external API calls. All logic and data reside client-side.

```text
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERFACE                        │
│   (index.html + style.css + app.js)                         │
│                                                              │
│   Home │ Chat │ Explore │ Search │ Important │ About         │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                      RULE ENGINE                             │
│                     (js/rules.js)                            │
│                                                              │
│  Normalize Input → Extract Keywords → Match Rules →          │
│  Return Topic ID (or Fallback)                               │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE BASE                            │
│              (knowledge/unit1.json ... unit5.json)           │
│                                                              │
│  Array of Topic Objects: { id, title, overview,              │
│  key_concepts, algorithm_steps, related }                    │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                   RESPONSE BUILDER                           │
│                  (js/responses.js)                           │
│                                                              │
│  Format JSON → Generate HTML → Append Related Topics →       │
│  Return to Chat UI                                           │
└─────────────────────────────────────────────────────────────┘
```

## 2. Initialization Workflow (App Startup)

When the user opens `index.html`, the following sequence occurs:

1. **DOM Load:** The browser parses the HTML and applies the CSS theme.
2. **Knowledge Base Loading (`app.js`):**
   - The application triggers asynchronous `fetch()` calls to load all five JSON files from the `knowledge/` folder.
   - Each JSON file is parsed and stored in a global `knowledgeBase` object in memory (e.g., `knowledgeBase.unit1`, `knowledgeBase.unit2`).
   - A loading indicator is displayed until all files are successfully loaded.
3. **Rule Engine Initialization (`rules.js`):**
   - The predefined rule array is loaded into memory. This array maps keywords to topic IDs.
4. **Event Listeners Attached (`app.js`):**
   - Sidebar navigation clicks are bound to page-switching functions.
   - Chat input and send button are bound to the chat handler.
   - Search bar input is bound to the search function.
5. **Default View:** The Home page is rendered as the default active view.

## 3. Chat Workflow (Core Feature)

When a user types a query and presses "Send" or "Enter":

### Step 1: Input Capture (`chatbot.js`)
- The raw string from the input field is captured.
- The input field is cleared.
- A user message bubble is immediately appended to the chat window (right-aligned, blue).

### Step 2: Normalization (`rules.js`)
- The raw string is converted to lowercase.
- Punctuation (`?`, `.`, `!`, `,`) is stripped.
- Extra whitespace is trimmed.

### Step 3: Rule Matching (`rules.js`)
- The normalized string is scanned for keywords present in the `rules` array.
- Each rule object has the structure: `{ keywords: ["bfs", "breadth first"], topicId: "bfs" }`.
- The engine iterates through the rules. The first matching rule returns its `topicId`.
- If no rule matches, the engine returns `null` (triggering the fallback).

### Step 4: Knowledge Retrieval (`app.js` / `chatbot.js`)
- If a `topicId` is returned, the system searches the loaded `knowledgeBase` (all five units) for an object with a matching `id`.
- If found, the topic object is passed to the Response Builder.
- If not found (or if `null`), the fallback message is passed to the Response Builder.

### Step 5: Response Building (`responses.js`)
- For a valid topic:
  - The `title` is formatted as an `<h3>`.
  - The `overview` is formatted as a `<p>`.
  - The `key_concepts` array is formatted as an unordered list `<ul>`.
  - If `algorithm_steps` is non-empty, it is formatted as an ordered list `<ol>`.
  - The `related` array is converted into clickable buttons. Clicking a button triggers a new chat query with that topic's title.
- For a fallback:
  - A generic message is generated, suggesting the user try the Search page or rephrase their question.

### Step 6: Rendering (`chatbot.js`)
- The generated HTML is appended to the chat window as an assistant message bubble (left-aligned, dark gray).
- The chat window auto-scrolls to the bottom.
- A "Related Topics" section appears below the answer, allowing the user to continue learning.

## 4. Explore Units Workflow

1. **Unit Selection:** The user clicks a Unit card on the Explore page. The system retrieves the corresponding JSON array from `knowledgeBase`.
2. **Topic List Rendering:** The system maps over the array and renders a list of clickable topic cards (displaying only `title` and a brief snippet of `overview`).
3. **Topic Selection:** The user clicks a topic card. The system passes that topic object to the Response Builder (`responses.js`).
4. **Detailed View:** The formatted HTML is rendered in a dedicated content area on the Explore page (not in the Chat window). A "Back to Unit" button is provided.

## 5. Search Topics Workflow

1. **Input Capture:** The user types a query into the search bar.
2. **Global Scan (`app.js`):**
   - The application iterates through all five units in `knowledgeBase`.
   - For each topic, it checks if the search term exists in the `title` or any element of `key_concepts`.
3. **Result Rendering:**
   - Matches are collected into a results array.
   - The results are rendered as clickable cards showing the topic title and its parent unit.
4. **Result Selection:** Clicking a result opens the detailed view (same as the Explore workflow).

## 6. Important Questions Workflow

1. **Static List:** A predefined array of question strings is stored in `app.js` (e.g., `"What is a Rational Agent?"`, `"Explain Alpha-Beta Pruning"`).
2. **Rendering:** These questions are rendered as clickable buttons/cards on the Important Questions page.
3. **Auto-Routing:** Clicking a question:
   - Switches the active view to the Chat page.
   - Programmatically inserts the question text into the chat input.
   - Triggers the chat submission handler.
   - The chatbot processes the query as if the user typed it manually.

## 7. Page Navigation Workflow

- The application uses a Single Page Application (SPA) approach.
- All pages are `<div>` elements in `index.html`, initially hidden with `display: none`.
- Clicking a sidebar item calls a `showPage(pageId)` function in `app.js`.
- This function hides all pages and displays the selected one.
- The active sidebar item receives a CSS class (e.g., `.active`) for visual highlighting.

## 8. Error Handling

- **JSON Load Failure:** If a `fetch()` call fails, an error message is displayed, and the app continues with the remaining units.
- **Unknown Query:** Handled gracefully by the fallback response in the Rule Engine.
- **Empty Search:** Displays a "No results found" message.
- **Missing Topic ID:** If a rule matches but the topic is missing from the JSON, the fallback response is triggered.
```