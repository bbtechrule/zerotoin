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

// ✅ Clean user input (remove useless words)
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(
      /human|image|diagram|picture|photo|of|please|show|me|i|want|need|search|like|these/g,
      ""
    )
    .trim();
}

// ✅ WORD-BASED diagram search (KEY FIX 🔥)
function findDiagram(text) {
  const words = cleanText(text).split(" ").filter(Boolean);

  return diagrams.find(d =>
    words.some(word =>
      d.name.includes(word) ||
      d.keywords.some(k => k.includes(word))
    )
  );
}

// ✅ Send message
function send() {
  const textRaw = input.value.trim();
  if (!textRaw) return;

  addBubble(textRaw, "user");

  // 🔍 Diagram search FIRST
  const diagram = findDiagram(textRaw);

  if (diagram) {
    addBubble(
      `<b>${diagram.name.toUpperCase()}</b><br><br>
       <img src="${diagram.img}" alt="${diagram.name} diagram">`,
      "bot"
    );

  // 📘 Q&A search
  } else if (qa[textRaw.toLowerCase()]) {
    addBubble(qa[textRaw.toLowerCase()], "bot");

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
