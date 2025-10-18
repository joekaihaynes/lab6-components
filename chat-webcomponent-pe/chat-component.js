/**
 * <simple-chat> — Progressive Enhancement
 *
 * Enhances existing semantic HTML inside the element:

 * Key ideas:
 * - If JS doesn't load, the plain HTML is still visible/useful.
 * - When JS loads, we "upgrade" the element: wire events, add bubbles, auto-scroll.
 * - Uses global (page) CSS; no Shadow DOM here.
 */
import { getBotResponse } from './eliza.js';

class simpleChat extends HTMLElement {
    /**
     * Lifecycle: runs when the element is inserted into the document.
     * Finds the inner markup and attaches event listeners.
     */
    connectedCallback() {
        this.messages = this.querySelector('.messages');
        this.form = this.querySelector('.input-area');
        this.input = this.querySelector('input');

        if (this.form){
            this.form.addEventListener('submit', this);
        }
    }

    /**
     * Generic event handler (EventListener object pattern).
     * The browser will call this when events we subscribed to fire.
     * @param {SubmitEvent} event
     */
    handleEvent(event) {
        if (event.type === 'submit') {
            event.preventDefault();
            const text = this.input.value.trim();
            if (!text) return;
            this.add('user', text);
            this.input.value = '';
            this.add('bot', this.reply(text));
            this.messages.scrollTop = this.messages.scrollHeight;
        }
    }
    /**
     * Append a message bubble to the .messages container.
     * Styles rely on classes: "message user" or "message bot".
     * @param {'user'|'bot'} role - who said it (affects styling/alignment)
     * @param {string} text - message text
     */
    add(role,text){
        var div = document.createElement('div');
        div.className = 'message ' + role;
        div.textContent = text;
        this.messages.appendChild(div);
    }
    /**
     * Get a reply from the Eliza-like bot.
     * @param {string} text - user input
     * @returns {string} bot reply text
     */
    reply(text) {
        return getBotResponse(text);
    }
}
// Register the custom element so <simple-chat> works in HTML.
customElements.define('simple-chat', simpleChat);