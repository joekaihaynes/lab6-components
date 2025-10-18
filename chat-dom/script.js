import { getBotResponse } from './eliza.js';

/**
 * Append the bot's response to the chat.
 * @param {string} response - Text returned from the bot logic.
 * @returns {void}
 */
function showResponse(response) {

    addToChatWindow(response, 'bot');

}


/**
 * Get a bot reply for the given user message.
 * @param {string} message - The user's message.
 * @returns {string} Bot reply from eliza.js.
 */
function getResponse(message) {

    return getBotResponse(message);

}

/**
 * Orchestrates the request/response round trip for a user message.
 * @param {string} message - The user's message (already trimmed).
 * @returns {void}
 */
function processMessage(message) {

    let response = getResponse(message);

    showResponse(response);

}

/**
 * Add a new message bubble to the chat window and auto-scroll.
 * Expects CSS classes `.user` and `.bot` to style differently.
 *
 * @param {string} message - Message text to display.
 * @param {"user"|"bot"} role - Who said it (controls styling/alignment).
 * @returns {void}
 */
function addToChatWindow(message, role) {

    let chatWindow = document.getElementById('chatWindow');

    let p = document.createElement('p');
    p.className = role;
    p.textContent = message;
    chatWindow.appendChild(p);

    // Auto-scroll to bottom after appending the new message
    chatWindow.scrollTop = chatWindow.scrollHeight;

}

/**
 * Read the input value, validate, render user bubble, and trigger bot reply.
 * Clears and refocuses the input. No-op for empty/whitespace-only input.
 * @returns {void}
 */
function send() {

    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value.trim();
    if (!message) return;
    let chatWindow = document.getElementById('chatWindow');

    messageBox.value = '';
    messageBox.focus();

    addToChatWindow(message,'user');

    processMessage(message);

}




/**
 * Wire up event listeners after the DOM is ready.
 * - Click on the Send button triggers send()
 * - Submitting the form (Enter) triggers send() and prevents page reload
 * @returns {void}
 */
function init() {

    document.getElementById('sendBtn').addEventListener('click', function () {

        send();

    });

    document.getElementById('chatForm').addEventListener('submit', function(e){
        e.preventDefault();
        send();
    });

}


// Initialize once the DOM is fully parsed
window.addEventListener('DOMContentLoaded', init);