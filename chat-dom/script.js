import { getBotResponse } from './eliza.js';


function showResponse(response) {

    addToChatWindow(response, 'bot');

}



function getResponse(message) {

    return getBotResponse(message);

}


function processMessage(message) {

    let response = getResponse(message);

    showResponse(response);

}


function addToChatWindow(message, role) {

    let chatWindow = document.getElementById('chatWindow');

    let p = document.createElement('p');
    p.className = role;
    p.textContent = message;
    chatWindow.appendChild(p);

    chatWindow.scrollTop = chatWindow.scrollHeight;

}


function send() {

    let messageBox = document.getElementById('messageBox');
    let message = messageBox.value;
    if (!message) return;
    let chatWindow = document.getElementById('chatWindow');

    messageBox.value = ''; // clear the fiel
    messageBox.focus();

    addToChatWindow(message,'user');

    processMessage(message);

}





function init() {

    document.getElementById('sendBtn').addEventListener('click', function () {

        send();

    });

}



window.addEventListener('DOMContentLoaded', init);