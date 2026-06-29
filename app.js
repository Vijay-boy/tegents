const sendBtn = document.getElementById("sendBtn");

const message = document.getElementById("message");

const chatBox = document.getElementById("chatBox");

const progressCount =
document.getElementById(
"progressCount"
);

function getTime() {

  return new Date()
  .toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}

window.addEventListener("load", () => {

  const savedChats = localStorage.getItem("tegentsChats");

  if (savedChats) {

    chatBox.innerHTML = savedChats;

  }

  chatBox.scrollTop=chatBox.scrollHeight;

  updateProgress();

});

async function sendMessage() {

  const userMessage = message.value.trim();

  if (!userMessage) return;

  chatBox.innerHTML += `<div class="user-message">👤 ${userMessage}<span class="time">${getTime()}</span></div>`;

  updateProgress();

  chatBox.scrollTop = chatBox.scrollHeight;

  localStorage.setItem(
"tegentsChats",
chatBox.innerHTML
);

  message.value = "";

  chatBox.innerHTML += `
<div id="typingIndicator"
class="bot-message">

🤖 Tegents is typing...

</div>
`;

chatBox.scrollTop =
chatBox.scrollHeight;

  const typingIndicator = document.getElementById("typingIndicator");

if (typingIndicator) {
    typingIndicator.remove();
}

let reply = "";

const text = userMessage.toLowerCase();

if (text.includes("i am go") && text.includes("yesterday")) {

    reply = `
❌ Grammar Mistake Found<br><br>

✅ Correct Sentence:<br>
I went to school yesterday.<br><br>

📝 Explanation:<br>
Because "yesterday" is in the past, use <b>went</b> instead of <b>go</b>.<br><br>

📊 Communication Score<br>
Grammar: 6/10<br>
Vocabulary: 8/10<br>
Confidence: 8/10
`;

}
else if (text.includes("he don't")) {

    reply = `
❌ Grammar Mistake Found<br><br>

✅ Correct Sentence:<br>
He doesn't like it.<br><br>

📝 Explanation:<br>
Use <b>doesn't</b> with <b>he/she/it</b>.
`;

}
else if (text.includes("vocabulary")) {

    reply = `
📚 Word of the Day<br><br>

Word: Confident<br><br>

Meaning:<br>
Believing in yourself.<br><br>

Example:<br>
I am confident in interviews.
`;

}
else if (text.includes("interview")) {

    reply = `
🎯 Interview Question<br><br>

Tell me about yourself.
`;

}
else {

    reply = `
💬 I'm currently an English Communication Coach.

I can help with:
✅ Grammar
✅ Vocabulary
✅ Interview Preparation
✅ Spoken English

Please ask me an English learning question.
`;

}

chatBox.innerHTML += `
<div class="bot-message">
🤖 ${reply}
<span class="time">${getTime()}</span>
</div>
`;

localStorage.setItem("tegentsChats", chatBox.innerHTML);

chatBox.scrollTop = chatBox.scrollHeight;

}

sendBtn.addEventListener(
  "click",
  sendMessage
);

message.addEventListener(
  "keypress",
  (event) => {

    if (event.key === "Enter") {

      sendMessage();

    }

  }
);
const dailyChat = document.getElementById("dailyChat");

const grammarFix = document.getElementById("grammarFix");

const vocabulary = document.getElementById("vocabulary");

const interviewPrep = document.getElementById("interviewPrep");

const confidence = document.getElementById("confidence");

dailyChat.addEventListener("click", () => {

message.value =
"Let's practice daily English conversation.";

});

grammarFix.addEventListener("click", () => {

message.value =
"Please correct my grammar mistakes.";

});

vocabulary.addEventListener("click", () => {

message.value =
"Teach me 5 useful English words.";

});

interviewPrep.addEventListener("click", () => {

message.value =
"Ask me interview questions.";

});

confidence.addEventListener("click", () => {

message.value =
"Help me build confidence while speaking English.";

});

const micBtn = document.getElementById("micBtn");

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition =
  new SpeechRecognition();

  recognition.lang = "en-US";

  recognition.continuous = false;

  recognition.interimResults = false;

  micBtn.addEventListener(
    "click",
    () => {

      recognition.start();

    }
  );

  recognition.addEventListener(
    "result",
    (event) => {

      message.value =
      event.results[0][0].transcript;

    }
  );

}

const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {

chatBox.innerHTML = "";

localStorage.removeItem("tegentsChats");

});

const themeBtn =
document.getElementById(
"themeBtn"
);

themeBtn.addEventListener(
"click",
() => {

document.body.classList.toggle(
"dark-mode"
);

}
);
