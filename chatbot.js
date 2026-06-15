function toggleChat() {
    const win = document.getElementById('chat-window');
    if (!win) return;
    win.style.display = win.style.display === 'flex' ? 'none' : 'flex';
    setTimeout(() => win.classList.toggle('open'), 10);
}

function handleChatSubmit(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if(!msg) return;

    addChatMessage(msg, 'user');
    input.value = '';

    // Simulated AI Response
    setTimeout(() => {
        const container = document.getElementById('chat-msgs');
        const typing = document.createElement('div');
        typing.className = 'msg-ai typing-dots-wrap';
        typing.innerHTML = `<div class="bot-avatar">YC</div><div class="typing-dots"><div class="td"></div><div class="td"></div><div class="td"></div></div>`;
        container.appendChild(typing);
        scrollToBottom();

        setTimeout(() => {
            typing.remove();
            let reply = "That's a great question! Chhaychinh usually responds to inquiries about " + msg.split(' ')[0] + " within 24 hours. You can also email him at chinhyin510@gmail.com.";
            const lmsg = msg.toLowerCase();
            if(lmsg.includes('tutoring')) reply = "Chhaychinh has over 3 years of experience preparing math materials and leading study groups for both high school and university students.";
            if(lmsg.includes('contact')) reply = "You can reach Chhaychinh via Telegram, email (chinhyin510@gmail.com), or the contact form on this site.";
            if(lmsg.includes('skill')) reply = "Chhaychinh is highly proficient in Calculus, Algebra, and using tools like GeoGebra for mathematical visualization.";
            
            addChatMessage(reply, 'ai');
        }, 1500);
    }, 500);
}

function sendSuggested(txt) {
    addChatMessage(txt, 'user');
    setTimeout(() => {
        let reply = "Chhaychinh is highly proficient in both pure mathematics and teaching methodologies. He specializes in Calculus, Algebra, and using tools like GeoGebra.";
        if(txt.includes('contact')) reply = "You can find his email and phone number in the Contact tab, or reach out via his social links in the sidebar.";
        addChatMessage(reply, 'ai');
    }, 800);
}

function addChatMessage(txt, side) {
    const container = document.getElementById('chat-msgs');
    if (!container) return;
    const div = document.createElement('div');
    div.className = side === 'ai' ? 'msg-ai' : 'msg-user';
    div.innerHTML = side === 'ai'
        ? `<div class="bot-avatar">YC</div><div class="bubble">${txt}</div>`
        : `<div class="bubble">${txt}</div>`;
    container.appendChild(div);
    scrollToBottom();
}

function scrollToBottom() {
    const container = document.getElementById('chat-msgs');
    if (container) container.scrollTop = container.scrollHeight;
}
