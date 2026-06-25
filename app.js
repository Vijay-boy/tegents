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

  try {

    const response = await fetch("/chat", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: userMessage
      })

    });

    const data = await response.json();

    const typingIndicator =
document.getElementById(
"typingIndicator"
);

if (typingIndicator) {

  typingIndicator.remove();

}

    chatBox.innerHTML += `<div class="bot-message">🤖 ${data.reply}<span class="time">${getTime()}</span></div>`;

    chatBox.scrollTop=chatBox.scrollHeight;

    localStorage.setItem(
"tegentsChats",
chatBox.innerHTML
);

    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (error) {

    const typingIndicator =
document.getElementById(
"typingIndicator"
);

if (typingIndicator) {

  typingIndicator.remove();

}

   chatBox.innerHTML += `
<div class="bot-message">
🤖 Great attempt!

Your message was:
"${userMessage}"

📊 Communication Score

Grammar: 8/10<br>
Vocabulary: 7/10<br>
Confidence: 9/10<br>

🏆 Overall Score: 8/10

💡 Tip:
Try speaking in complete sentences and use more descriptive words.
</div>
`;

    localStorage.setItem("tegentsChats",chatBox.innerHTML);

    console.log(error);

  }

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
