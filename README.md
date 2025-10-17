# Lab 6 – Component-Based Chat Interfaces

## **Project Overview**
This lab explores **component-based thinking**, a foundational concept in modern front-end development. The goal was to build the same chat interface in four different ways to understand how architecture, encapsulation, and progressive enhancement affect usability and maintainability.

The project demonstrates:
- A static prototype using only HTML/CSS
- A dynamic version using DOM manipulation
- A progressively enhanced web component
- A fully encapsulated web component using the Shadow DOM

Each approach builds on the previous one, emphasizing design, functionality, and architectural trade-offs.

---

## **Repository Structure**
```
lab6-components/
│
├── chat-prototype-html-css/
│ ├── index.html
│ └── styles.css
│
├── chat-dom/
│ ├── index.html
│ ├── styles.css
│ ├── script.js
│ └── eliza.js
│
├── chat-webcomponent-pe/
│ ├── index.html
│ ├── styles.css
│ ├── chat-component.js
│ └── eliza.js
│
├── chat-webcomponent-gd/
│ ├── index.html
│ ├── chat-component.js
│ └── eliza.js
│
├── index.html
├── styles.css
└── README.md
```

## **Approaches**

### **1. Static HTML/CSS Prototype**
- Pure layout + styles
- Semantic tags, scrollable messages
- Bubbles (user right, bot left)
- Input/footer visuals only

### **2. DOM Manipulation (Standard JavaScript)**
- Empty container → JS appends messages
- Click + Enter to send
- Simple Eliza reply
- Auto-scroll; clear input

### **3.Progressive Enhancement**
- I made a <simple-chat> tag that shows basic HTML first.
- If JavaScript loads, it “upgrades” the chat: finds .messages and the form, and listens for submit.
- No Shadow DOM here, so my normal CSS works on it.
- When I send a message, it creates the bubbles with createElement and scrolls to the bottom.
- The bot answer comes from eliza.js (or a tiny fallback if that’s not there).

### **4. Web Component**
- built a <chat-interface> that puts all HTML and CSS inside the Shadow DOM.
- The styles are contained, so page CSS doesn’t mess it up (and it doesn’t mess up the page).
- I query stuff with this.shadowRoot.querySelector(...).
- Same flow as before: submit → add user message → bot reply → auto-scroll.
- It feels more “real component,” because I can drop it anywhere and it just works.

## **Reflections & Comparisons**
- Static: fastest for layout; great for nailing structure and visual polish; no behavior.
- DOM: straightforward interactivity; global CSS/JS can collide; good stepping stone.
- Progressive Enhancement: renders useful HTML without JS; JS “upgrades” it; keeps semantics; still shares page styles.
- Web Component: most portable and predictable; styles don’t leak in or out; requires shadow-specific selectors.

## **Observations:**
- Scrolling/layout: min-height: 0 is crucial for scrollable flex/grid children; use gap (not space-between) for stacked messages.
- Auto-scroll: append, then container.scrollTop = container.scrollHeight.
- Selectors: use classes for components; ensure multi-class strings include a space ("message " + role).
- Shadow DOM styling: use :host + internal classes; global selectors like body won’t apply inside the shadow.
- UI polish: badges as inline-block so pills hug text; keep link colors consistent with a:visited; use target="_blank" rel="noopener noreferrer" for external/demo links.

## **Challenges Encountered**
- Module vs. classic scripts: mixing import with non-module <script>; missing .js in imports; opening file:// instead of serving over http://.
- Form behavior: Enter key reloading the page until a submit handler + preventDefault() was added.
- Shadow DOM queries: trying this.querySelector instead of this.shadowRoot.querySelector.
- Layout gaps: using justify-content: space-between in a column created giant spaces; replaced with gap.
- Centering & height: full-viewport cards (height: 100vh) prevented natural scrolling; switched to height: auto and centered with margins/flex.
- Visited link color: anchors turning purple; fixed by styling a:visited.

## **Lessons Learned**
- Semantic first. A strong HTML/CSS base makes every upgrade easier.
- Progressively enhance. The UI should still show something useful if JS fails.
- Pick one JS loading strategy. Consistency avoids 90% of “why did this stop working?”
- Shadow DOM = portable components. Use it when you want reliable, isolated UI you can drop anywhere.

## Link ## 
https://joekaihaynes.github.io/lab6-components/

## **Author**
**Joe Haynes**  