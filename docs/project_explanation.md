# AI Knowledge Assistant - Project Explanation

## 1. Project Title
**AI Knowledge Assistant: A Knowledge-Based Learning and Reasoning System**

## 2. Objective
The primary objective of this project is to design and implement a rule-based chatbot application that serves as an interactive educational tool for the subject "Artificial Intelligence Techniques and Algorithms" (22UAD301). The system aims to provide students with a structured, self-paced learning environment where they can query AI concepts, explore the syllabus unit-by-unit, search for specific topics, and review curated important questions. 

Crucially, this application is built entirely on a **local, deterministic knowledge base**. It deliberately avoids external APIs, Large Language Models (LLMs), or advanced Natural Language Processing (NLP) libraries. The goal is to demonstrate the foundational AI concepts of knowledge representation, rule-based inference, and information retrieval in a lightweight, offline-capable web application.

## 3. Methodology

The application operates on a strict **Rule-Based and Knowledge-Base approach**. The architecture is divided into three core layers:

### A. Knowledge Base (KB)
The syllabus is decomposed into five distinct JSON files, one for each unit of the theory paper. These files act as the application's database. Each JSON file contains an array of structured topic objects. Every object follows a consistent schema:
- `id`: A unique string identifier for rule-engine mapping.
- `title`: The display name of the topic.
- `overview`: A concise, academic explanation of the concept.
- `key_concepts`: An array of essential sub-topics or keywords.
- `algorithm_steps`: A step-by-step breakdown (if applicable).
- `related`: An array of IDs linking to conceptually connected topics.

### B. Rule Engine
When a user submits a query via the Chat interface, the system does not "understand" language. Instead, it applies a deterministic set of predefined rules. The engine:
1. **Normalizes** the input (converts to lowercase, trims whitespace, strips punctuation).
2. **Extracts** keywords using a predefined dictionary of AI terms (e.g., "bfs", "agent", "minimax").
3. **Matches** the extracted keywords against a rule array (e.g., `if query contains "bfs" -> topicId = "bfs"`).
4. **Falls back** to a generic response if no rule matches, guiding the user to rephrase or use the Search feature.

### C. Response Builder
Once a topic ID is identified, the system retrieves the corresponding JSON object. The Response Builder then formats this raw data into structured HTML. It dynamically generates:
- A title header.
- A detailed overview paragraph.
- A bulleted list of key concepts.
- An ordered list of algorithm steps (if present).
- A "Related Topics" section with clickable buttons that trigger new queries.

## 4. Key Features

- **Rule-Based Chat:** A conversational interface that maps user queries to knowledge base entries using keyword matching.
- **Explore Units:** A hierarchical browser that allows users to navigate from Unit -> Topic -> Detailed Explanation.
- **Search Topics:** A global search bar that scans all five JSON files for matching titles or key concepts, returning clickable results.
- **Important Questions:** A curated list of high-priority questions from the syllabus. Clicking a question automatically routes it to the Chat engine.
- **Structured Responses:** All answers are presented in a clean, readable format with clear headings and bullet points.

## 5. Technologies Used

- **Frontend Structure:** HTML5 (Semantic markup).
- **Styling:** CSS3 (Custom properties, Flexbox, CSS Grid, "Midnight Knowledge Theme").
- **Logic & Interactivity:** Vanilla JavaScript (ES6+ Modules, Fetch API, DOM Manipulation).
- **Data Storage:** Local JSON files (No external database required).
- **Hosting:** GitHub Pages (Static site deployment).

## 6. Limitations

- **No Natural Language Understanding:** The system cannot understand synonyms, slang, or complex sentence structures unless explicitly programmed into the rule engine.
- **Deterministic Responses:** The chatbot does not learn from interactions, nor does it maintain conversational context between separate queries.
- **Static Knowledge Base:** The application's knowledge is limited strictly to the content stored in the JSON files. It cannot answer questions outside the provided syllabus.
- **No External Integrations:** By design, the system does not connect to the internet to fetch live data or use cloud-based AI services.