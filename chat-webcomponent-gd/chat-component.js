import {getBotResponse} from "../chat-webcomponent-pe/eliza.js";

class chatInterface extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --radius :1rem
                }

                :host{
                    background-color: royalblue;
                    font-family: sans-serif;
                    justify-content: center;
                    align-items: center;
                    display: flex;
                    height: 100vh;
                    margin: 0;
                }
                
                simple-chat {
                    width: 40%;
                    height: 90vh;
                    text-align: center;
                    background-color: white;
                    border-radius: var(--radius);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }
        
                header{
                    background: dodgerblue;
                    color: white;
                }
        
                header h1{
                    margin-top: 2rem;
                }
                header p{
                    margin: 1rem;
                }
        
                .messages{
                    display: flex;
                    flex: 1;
                    flex-direction: column;
                    padding: 1rem;
                    min-height: 0;
                    overflow-y: auto;
                    gap: 1rem;
                }
        
        
        
                .message{
                    border-radius: var(--radius);
                    padding: 1rem;
                    max-width : 45ch;
                    text-align: left;
                    overflow-wrap: anywhere;
                }
            
                .message.user{
                     align-self: flex-end;
                     color: white;
                     background-color: royalblue;
                }
            
                .message.bot{
                     align-self: flex-start;
                     color: black;
                     background-color: lightgrey;
                }
            
                .input-area{
                        display: flex;
                        gap: 0.5rem;
                        padding: 1rem;
                }
            
                input{
                     padding: 1rem;
                     border-radius: var(--radius);
                     flex: 1;
                     background-color: lightgrey;
                }
            
                button{
                     padding: 1rem;
                     min-width: 6rem;
                     border-radius: var(--radius);
                     color: white;
                     background-color: royalblue;
                     cursor : pointer;
                }
            </style>
            
            <simple-chat>
                <header>
                    <h1>Chat Assistant</h1>
                    <p>Progressive Enhancement (Disable JS to Test)</p>
                </header>
            
                <div class="messages">
                    <div class="message bot">Hello! How can I help you?</div>
                </div>
                <form class="input-area">
                    <input type="text" placeholder="Type a message...">
                    <button type="submit">Send</button>
                </form>
            </simple-chat>
        `;

        this.messages = this.shadowRoot.querySelector('.messages');
        this.form = this.shadowRoot.querySelector('.input-area');
        this.input = this.shadowRoot.querySelector('input');

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

    add(role, text) {
        let div = document.createElement('div');
        div.className = 'message ' + role;
        div.textContent = text;
        this.messages.appendChild(div);
    }

    reply(text) {
        return getBotResponse(text);
    }
}
customElements.define('chat-interface', chatInterface);
