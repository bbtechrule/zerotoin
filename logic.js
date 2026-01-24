const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Add a chat bubble
function addBubble(html, type) {
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.innerHTML = html;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// Send message
function send() {
  const textRaw = input.value.trim();
  if (!textRaw) return;

  const text = textRaw.toLowerCase();
  addBubble(textRaw, "user");

  // Diagram search
  const diagramKey = Object.keys(diagrams).find(d => text.includes(d));
  if (diagramKey) {
    addBubble(
      `<b>${diagramKey.toUpperCase()}</b><br>
       <img src="${diagrams[diagramKey]}" alt="${diagramKey} diagram">`,
      "bot"
    );

  // QA search
  } else if (qa[text]) {
    addBubble(qa[text], "bot");

  // Not found
  } else {
    addBubble("❌ No answer or diagram found.", "bot");
  }

  input.value = "";
}

// Clear chat
function clearChat() {
  chat.innerHTML = "";
}

// Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("light");
}

// Microphone input
function startMic() {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Microphone not supported");
    return;
  }
  const rec = new webkitSpeechRecognition();
  rec.lang = "en-IN";
  rec.start();
  rec.onresult = e => input.value += e.results[0][0].transcript;
}

// Auto-expand textarea
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});
