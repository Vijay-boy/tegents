const sendBtn = document.getElementById("sendBtn");
const message = document.getElementById("message");
const chatBox = document.getElementById("chatBox");
const progressCount = document.getElementById("progressCount");

function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

window.addEventListener("load", () => {
    const savedChats = localStorage.getItem("tegentsChats");

    if (savedChats) {
        chatBox.innerHTML = savedChats;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
    updateProgress();
});

async function sendMessage() {

    const userMessage = message.value.trim();

    if (!userMessage) return;

    chatBox.innerHTML += `
    <div class="user-message">
        👤 ${userMessage}
        <span class="time">${getTime()}</span>
    </div>`;

    updateProgress();

    localStorage.setItem("tegentsChats", chatBox.innerHTML);

    message.value = "";

    chatBox.innerHTML += `
    <div id="typingIndicator" class="bot-message">
        🤖 Tegents is typing...
    </div>`;

    chatBox.scrollTop = chatBox.scrollHeight;

    const typingIndicator = document.getElementById("typingIndicator");

    if (typingIndicator) {
        typingIndicator.remove();
    }

    const text = userMessage.toLowerCase();

    let reply = "";
    let ruleFound = false;

    for (const rule of grammarRules) {

        if (text.includes(rule.wrong)) {

            reply = `
            ❌ <b>Grammar Mistake Found</b><br><br>

            📝 <b>Your Sentence:</b><br>
            ${userMessage}<br><br>

            ✅ <b>Correct Sentence:</b><br>
            ${rule.correct}<br><br>

            📚 <b>Explanation:</b><br>
            ${rule.explanation}<br><br>

            📊 <b>Communication Score</b><br>
            Grammar: 6/10<br>
            Vocabulary: 8/10<br>
            Confidence: 8/10
            `;

            ruleFound = true;
            break;
        }
    }

    if (!ruleFound) {

      if (text.includes("hello") || text.includes("hi")) {

            reply = `
            👋 <b>Hello!</b><br><br>

            Welcome to <b>Tegents</b>, your English Communication Coach.

            How can I help you today?
            `;

        }
        else if (text.includes("vocabulary")) {

            reply = `
            📚 <b>Word of the Day</b><br><br>

            <b>Confident</b><br><br>

            Meaning:<br>
            Believing in yourself.<br><br>

            Example:<br>
            I am confident during interviews.
            `;

        }
        else if (text.includes("interview")) {

            reply = `
            🎯 <b>Interview Question</b><br><br>

            Tell me about yourself.
            `;

        }
        else if (text.includes("grammar")) {

            reply = `
            ✍️ Type any English sentence.

            I'll check your grammar and explain your mistakes.
            `;

        }
        else {

            reply = `
            💬 I'm your <b>English Communication Coach</b>.<br><br>

            I can help you with:<br><br>

            ✅ Grammar Correction<br>
            ✅ Vocabulary Building<br>
            ✅ Interview Preparation<br>
            ✅ Spoken English Practice<br>
            ✅ Daily Conversation
            `;

        }
    }

    chatBox.innerHTML += `
    <div class="bot-message">
        🤖 ${reply}
        <span class="time">${getTime()}</span>
    </div>`;

    localStorage.setItem("tegentsChats", chatBox.innerHTML);

    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener("click", sendMessage);

message.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

const dailyChat = document.getElementById("dailyChat");
const grammarFix = document.getElementById("grammarFix");
const vocabulary = document.getElementById("vocabulary");
const interviewPrep = document.getElementById("interviewPrep");
const confidence = document.getElementById("confidence");

dailyChat.addEventListener("click", () => {
    message.value = "Let's practice daily English conversation.";
});

grammarFix.addEventListener("click", () => {
    message.value = "Please correct my grammar mistakes.";
});

vocabulary.addEventListener("click", () => {
    message.value = "Teach me 5 useful English words.";
});

interviewPrep.addEventListener("click", () => {
    message.value = "Ask me interview questions.";
});

confidence.addEventListener("click", () => {
    message.value = "Help me build confidence while speaking English.";
});

const micBtn = document.getElementById("micBtn");

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    micBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.addEventListener("result", (event) => {
        message.value = event.results[0][0].transcript;
    });

}

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
    chatBox.innerHTML = "";
    localStorage.removeItem("tegentsChats");
});

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
