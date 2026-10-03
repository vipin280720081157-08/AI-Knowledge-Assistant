```markdown
# AI Knowledge Assistant - App Theme

## 1. Theme Identity

**Theme Name:** Midnight Knowledge Theme

**Visual Direction:** Modern • Minimal • Intelligent • Academic • Professional

**Design Philosophy:**
The application is designed to feel like a premium, lightweight desktop learning tool. It prioritizes readability, clean spacing, and a focused academic atmosphere. The theme avoids visual clutter, excessive animations, and childish illustrations. Instead, it relies on a disciplined color palette, consistent typography, and subtle interactive cues to create an environment conducive to deep learning and concept exploration.

---

## 2. Color Palette

The entire application is built on a "Deep Navy + Electric Blue + Soft Cyan" triad. This combination establishes an AI/technology identity while maintaining a calm, academic tone.

| Element | Purpose | Hex Code |
|---|---|---|
| **Main Background** | Base canvas for all pages | `#0A0F1D` |
| **Sidebar Background** | Left navigation panel | `#111827` |
| **Card Background** | Units, topics, chat bubbles | `#1F2937` |
| **Card Border** | Thin separation lines | `#374151` |
| **Primary Accent** | Buttons, active states, user chat | `#3B82F6` |
| **Primary Accent Hover** | Hover state for primary elements | `#2563EB` |
| **Secondary Accent** | Code snippets, formulas, highlights | `#06B6D4` |
| **Main Text** | Headings, body text | `#F9FAFB` |
| **Secondary Text** | Muted labels, metadata, timestamps | `#9CA3AF` |
| **Assistant Bubble** | AI response background | `#1E293B` |
| **User Bubble** | User message background | `#2563EB` |
| **Success / Positive** | Confirmation messages | `#10B981` |
| **Warning / Fallback** | Fallback responses | `#F59E0B` |

### Color Usage Rules:
- **Backgrounds:** Always use the darkest shades (`#0A0F1D`, `#111827`) for large surfaces.
- **Accents:** Use Electric Blue (`#3B82F6`) sparingly for interactive elements (buttons, links, active nav items).
- **Text:** Never use pure black (`#000000`). Use `#F9FAFB` for primary text and `#9CA3AF` for secondary.
- **Borders:** Use `#374151` at `1px` width for card separation. Avoid heavy shadows.

---

## 3. Typography

Typography is kept simple, readable, and consistent across all screens.

### Font Family
```css
font-family: 'Segoe UI', 'Arial', sans-serif;
```

### Font Scale

| Element | Size | Weight | Color |
|---|---|---|---|
| **Page Title (H1)** | 32px | 700 (Bold) | `#F9FAFB` |
| **Section Heading (H2)** | 24px | 600 (Semi-Bold) | `#F9FAFB` |
| **Card Title (H3)** | 18px | 600 (Semi-Bold) | `#F9FAFB` |
| **Body Text** | 15px | 400 (Regular) | `#F9FAFB` |
| **Secondary Text** | 13px | 400 (Regular) | `#9CA3AF` |
| **Button Text** | 14px | 600 (Semi-Bold) | `#F9FAFB` |
| **Code / Formula** | 14px | 400 (Monospace) | `#06B6D4` |

### Line Height
- Body text: `1.6`
- Headings: `1.3`

### Typography Rules:
- Never use more than two font weights on a single screen.
- Avoid all-caps except for small labels or navigation items.
- Use `letter-spacing: 0.5px` for small uppercase labels.

---

## 4. Layout & Spacing

### Grid System
- **Sidebar Width:** 260px (fixed).
- **Main Content Area:** Fluid, fills remaining width.
- **Max Content Width:** 900px (centered within the main area for readability).

### Spacing Scale (in pixels)
| Token | Value | Usage |
|---|---|---|
| `xs` | 4px | Icon padding, tight gaps |
| `sm` | 8px | Inner card padding, list gaps |
| `md` | 16px | Standard padding, element gaps |
| `lg` | 24px | Section padding, card margins |
| `xl` | 40px | Page margins, major section separation |
| `xxl` | 64px | Top-level page headers |

### Border Radius
- **Cards:** 12px
- **Buttons:** 8px
- **Chat Bubbles:** 16px (with one corner less rounded to indicate direction)
- **Input Fields:** 8px

---

## 5. Component Design

### 5.1 Sidebar Navigation
- **Background:** `#111827`
- **Width:** 260px
- **Logo Area:** Top, padded `24px`, displays "✦ AIKA" in bold white.
- **Nav Items:**
  - Padding: `12px 24px`
  - Font: 14px, weight 500, color `#9CA3AF`
  - Icon: Unicode symbol (e.g., 🏠) with `8px` right margin.
  - **Hover:** Background `#1F2937`, text `#F9FAFB`.
  - **Active:** Background `#1F2937`, text `#F9FAFB`, with a `4px` left border in `#3B82F6`.
- **Footer:** Bottom of sidebar, displays "AI Techniques & Algorithms" in `12px` muted text.

### 5.2 Cards
- **Background:** `#1F2937`
- **Border:** `1px solid #374151`
- **Border Radius:** 12px
- **Padding:** `24px`
- **Hover Effect:** Border color changes to `#3B82F6`, transition `0.2s ease`.
- **Shadow:** None (flat design).
- **Content Structure:**
  - Title (H3, `#F9FAFB`)
  - Description (Body, `#9CA3AF`)
  - Optional accent line or icon.

### 5.3 Buttons

**Primary Button:**
- Background: `#3B82F6`
- Text: `#F9FAFB`, 14px, weight 600
- Padding: `10px 20px`
- Border Radius: 8px
- Border: None
- **Hover:** Background `#2563EB`, cursor pointer.
- **Active:** Slight scale down (`transform: scale(0.98)`).

**Secondary Button (Outlined):**
- Background: Transparent
- Border: `1px solid #3B82F6`
- Text: `#3B82F6`, 14px, weight 600
- **Hover:** Background `#3B82F6`, text `#F9FAFB`.

**Chip / Tag Button (for Related Topics):**
- Background: `#1E293B`
- Border: `1px solid #374151`
- Text: `#06B6D4`, 13px, weight 500
- Padding: `6px 12px`
- Border Radius: 20px
- **Hover:** Border color `#06B6D4`, background `#111827`.

### 5.4 Chat Interface

**Chat Window:**
- Background: `#0A0F1D`
- Padding: `24px`
- Scrollable with custom thin scrollbar (track `#111827`, thumb `#374151`).

**User Message Bubble:**
- Alignment: Right
- Background: `#2563EB`
- Text: `#F9FAFB`, 15px
- Padding: `12px 16px`
- Border Radius: `16px 16px 4px 16px`
- Max Width: 70%

**Assistant Message Bubble:**
- Alignment: Left
- Background: `#1E293B`
- Text: `#F9FAFB`, 15px
- Padding: `16px 20px`
- Border Radius: `16px 16px 16px 4px`
- Max Width: 80%
- **Header:** "✦ AI Knowledge Assistant" in `12px` uppercase, `#06B6D4`, with `8px` bottom margin.
- **Content:** Includes title, overview, bullet lists, and related topic chips.

**Chat Input Area:**
- Background: `#111827`
- Padding: `16px`
- Border Top: `1px solid #374151`
- **Input Field:** Background `#1F2937`, border `1px solid #374151`, text `#F9FAFB`, padding `12px 16px`, border radius `8px`. Focus: border `#3B82F6`.
- **Send Button:** Primary button style, square aspect ratio, icon "➤".

### 5.5 Search Bar
- Background: `#1F2937`
- Border: `1px solid #374151`
- Border Radius: 8px
- Padding: `12px 16px`
- Text: `#F9FAFB`
- Placeholder: `#9CA3AF`
- **Focus:** Border `#3B82F6`, subtle glow (`box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2)`).

### 5.6 Forms & Inputs
- All inputs follow the same style as the search bar.
- Labels: `13px`, `#9CA3AF`, `4px` bottom margin.

### 5.7 Scrollbars (Custom)
```css
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #111827;
}
::-webkit-scrollbar-thumb {
  background: #374151;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #4B5563;
}
```

---

## 6. Iconography

Icons are rendered using Unicode symbols to keep the application lightweight and dependency-free. No external icon library (FontAwesome, Material Icons) is used.

| Purpose | Symbol | Usage |
|---|---|---|
| Home | 🏠 | Sidebar navigation |
| Chat | 💬 | Sidebar navigation |
| Explore | 📚 | Sidebar navigation |
| Search | 🔎 | Sidebar navigation |
| Important | ⭐ | Sidebar navigation |
| About | ℹ | Sidebar navigation |
| AI Brand | ✦ | Logo, assistant message header |
| Send | ➤ | Chat send button |
| Back | ← | Back navigation |
| Related | 🔗 | Related topics section |

---

## 7. Motion & Interaction

Animations are kept minimal to preserve performance on low-spec laptops.

| Interaction | Effect | Duration |
|---|---|---|
| Card Hover | Border color change | 200ms ease |
| Button Hover | Background color change | 150ms ease |
| Nav Item Hover | Background color change | 150ms ease |
| Page Transition | Fade in (`opacity: 0 → 1`) | 200ms ease |
| Chat Message Append | Slide up (`translateY(10px) → 0`) | 200ms ease |

### Prohibited Animations:
- No bouncing effects.
- No glowing pulses.
- No 3D transforms.
- No particle effects.

---

## 8. Accessibility

- **Contrast:** All text meets WCAG AA standards against their backgrounds.
- **Focus States:** All interactive elements have a visible focus ring (`outline: 2px solid #3B82F6; outline-offset: 2px`).
- **Keyboard Navigation:** Sidebar and chat input are fully navigable via Tab and Enter.
- **Semantic HTML:** Use `<nav>`, `<main>`, `<section>`, `<button>`, `<input>` appropriately.

---

## 9. Responsive Behavior

- **Desktop (>1024px):** Sidebar fixed left, main content fluid.
- **Tablet (768px - 1024px):** Sidebar collapses to icon-only (60px wide). Tooltips on hover.
- **Mobile (<768px):** Sidebar hidden by default. A hamburger menu (☰) toggles it as an overlay.

*Note: Since this is a lab project primarily used on desktops/laptops, mobile optimization is a secondary priority. The desktop experience is the primary target.*

---

## 10. Theme Summary

The **Midnight Knowledge Theme** delivers a focused, distraction-free learning environment. By combining a deep navy foundation with electric blue accents and disciplined typography, the application achieves a professional, academic aesthetic that mirrors modern AI tools without sacrificing simplicity or performance. Every visual decision is made to serve the content — the AI concepts themselves.
```