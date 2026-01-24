const chat = document.getElementById("chat");
const input = document.getElementById("input");

function addBubble(html, type) {
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.innerHTML = html;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function send() {
  if (!input.value.trim()) return;

  const text = input.value.trim().toLowerCase();
  addBubble(input.value, "user");

  if (diagrams[text]) {
    addBubble(
      `<b>${text.toUpperCase()} Diagram</b><br>
       <img src="${diagrams[text]}" alt="${text} diagram">`,
      "bot"
    );
  } else if (qa[text]) {
    addBubble(qa[text], "bot");
  } else {
    addBubble("❌ No answer or diagram found.", "bot");
  }

  input.value = "";
}

function clearChat() {
  chat.innerHTML = "";
}

function toggleMode() {
  document.body.classList.toggle("light");
}

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

input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});
