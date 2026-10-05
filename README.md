# AI Knowledge Assistant: A Knowledge-Based Learning and Reasoning System


---

## 📌 Project Overview

**AI Knowledge Assistant (AIKA)** is a lightweight, 100% client-side static web application designed as an interactive learning tool for students studying artificial intelligence concepts.

The application operates strictly on a **local, deterministic Knowledge Base (KB)** and a custom keyword-matching **Rule Engine**. It deliberately avoids external APIs, Large Language Models (LLMs), or heavy NLP libraries to demonstrate fundamental principles of knowledge representation, rule-based inference, and client-side information retrieval.

---

## ✨ Key Features

- 💬 **Rule-Based Chatbot:** Query syllabus concepts through an interactive chat interface. Input is normalized and matched against predefined rules to retrieve structured topic explanations.
- 📚 **Explore Syllabus Units:** Browse the complete 22UAD301 syllabus hierarchically across Unit I to Unit V.
- 🔎 **Global Keyword Search:** Instant search across titles and key concepts in all five syllabus units.
- ⭐ **Curated Important Questions:** Static list of 17+ high-priority exam questions that automatically route and query the chatbot when clicked.
- ℹ️ **Project Documentation:** Integrated links to internal architectural documentation (`docs/project_explanation.md`, `docs/app_workflow.md`, `docs/app_theme.md`).
- 🎨 **Midnight Knowledge Theme:** Clean, academic UI built with CSS custom properties, responsive breakpoints (Desktop, Tablet, Mobile), and Unicode iconography.

---

## 📁 Repository Folder Structure

```text
AI-Knowledge-Assistant/
├── index.html               # SPA Entry Point & HTML Layout
├── css/
│   └── style.css            # Custom CSS Styling (Midnight Knowledge Theme)
├── js/
│   ├── rules.js             # Rule Engine & Keyword Mapping Array
│   ├── responses.js         # LaTeX Sanitizer & Response HTML Builder
│   ├── chatbot.js           # Chat Logic & Message Bubble Renderer
│   └── app.js               # SPA Navigation, Fetch API & Main Orchestrator
├── knowledge/
│   ├── unit1.json           # Unit I: Introduction & Problem Solving
│   ├── unit2.json           # Unit II: Search Strategies & CSP
│   ├── unit3.json           # Unit III: Knowledge Representation & Logic
│   ├── unit4.json           # Unit IV: Ontologies, Vision & Pattern Recognition
│   └── unit5.json           # Unit V: AI Applications & NLP
├── docs/
│   ├── project_explanation.md # System Architecture & Academic Rationale
│   ├── app_workflow.md        # Detailed Input-to-Output Flow Diagrams
│   └── app_theme.md           # Color Tokens & Component Design System
└── README.md                # Project Overview & Deployment Guide
```

---

## 🛠️ Technologies Used

- **HTML5:** Semantic structural layout (`<nav>`, `<main>`, `<section>`, `<header>`).
- **CSS3:** Custom Properties (Variables), Flexbox, CSS Grid, Media Queries, Custom Scrollbars.
- **JavaScript (ES6+):** Async/Await, Fetch API, DOM Manipulation, Modules (No build step, no npm).
- **JSON:** Structured knowledge representations for syllabus topics.
- **Hosting:** GitHub Pages static site hosting.

---

## 🚀 Local Setup & Quick Start

Because this application relies on standard `fetch()` calls to load local JSON files, running `index.html` directly via the file protocol (`file:///`) in some strict browsers may trigger CORS restrictions.

To run locally without issues:

### Method 1: VS Code Live Server (Recommended)
1. Open the project folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` and select **"Open with Live Server"**.

### Method 2: Python Local HTTP Server
Run one of the following commands inside PowerShell / Terminal at the project root:

```bash
# Python 3
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

---

## 🌐 Live GitHub Pages Deployment

The application is deployed live on GitHub Pages:
[https://Vipin28.github.io/AI-Knowledge-Assistant/]((https://vipin280720081157-08.github.io/AI-Knowledge-Assistant/))

---
