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

## **Observations:**


## **Challenges Encountered**


## **Lessons Learned**


## **Issues / Notes**

## **Author**
**Joe Haynes**  