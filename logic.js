const chat = document.getElementById("chat");
const input = document.getElementById("input");

// ✅ Add chat bubble
function addBubble(html, type) {
  const div = document.createElement("div");
  div.className = "bubble " + type;
  div.innerHTML = html;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

// ✅ Clean user input for better matching
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/human|image|diagram|picture|photo|of/g, "")
    .trim();
}

// ✅ Search diagram from array
function findDiagram(text) {
  const query = cleanText(text);

  return diagrams.find(d =>
    d.name.includes(query) ||
    d.keywords.some(k => cleanText(k).includes(query))
  );
}

// ✅ Send message
function send() {
  const textRaw = input.value.trim();
  if (!textRaw) return;

  const text = textRaw.toLowerCase();
  addBubble(textRaw, "user");

  // 🔍 Diagram search
  const diagram = findDiagram(text);

  if (diagram) {
    addBubble(
      `<b>${diagram.name.toUpperCase()}</b><br><br>
       <img src="${diagram.img}" alt="${diagram.name} diagram">`,
      "bot"
    );

  // 📘 Q&A search
  } else if (qa[text]) {
    addBubble(qa[text], "bot");

  // ❌ Not found
  } else {
    addBubble("❌ No answer or diagram found.", "bot");
  }

  input.value = "";
}

// ✅ Clear chat
function clearChat() {
  chat.innerHTML = "";
}

// ✅ Toggle dark/light mode
function toggleMode() {
  document.body.classList.toggle("light");
}

// ✅ Microphone input
function startMic() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Microphone not supported");
    return;
  }

  const rec = new webkitSpeechRecognition();
  rec.lang = "en-IN";
  rec.start();

  rec.onresult = e => {
    input.value += e.results[0][0].transcript;
  };
}

// ✅ Auto-expand textarea
input.addEventListener("input", () => {
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";
});
