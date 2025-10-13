import { getBotResponse } from './eliza.js';

class simpleChat extends HTMLElement {
    connectedCallback() {
        this.messages = this.querySelector('.messages');
        this.form = this.querySelector('.input-area');
        this.input = this.querySelector('input');

        if (this.form){
            this.form.addEventListener('submit', this);
        }
    }

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

    add(role,text){
        var div = document.createElement('div');
        div.className = 'message ' + role;
        div.textContent = text;
        this.messages.appendChild(div);
    }

    reply(text) {
        return getBotResponse(text);
    }
}

customElements.define('simple-chat', simpleChat);