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

// ✅ Clean user input (very important)
function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .replace(
      /\b(human|image|diagram|picture|photo|of|please|show|me|i|want|need|search|like|these)\b/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}

// ✅ STRONG diagram search (FIXED 🔥)
function findDiagram(text) {
  const words = cleanText(text).split(" ").filter(Boolean);

  // if user types just "heart"
  if (words.length === 1) {
    return diagrams.find(d => d.name === words[0]);
  }

  // sentence-based matching
  for (let d of diagrams) {
    const cleanName = cleanText(d.name);

    // match name
    for (let w of words) {
      if (cleanName.includes(w)) return d;
    }

    // match keywords
    for (let k of d.keywords) {
      const cleanKeyword = cleanText(k);
      for (let w of words) {
        if (cleanKeyword.includes(w)) return d;
      }
    }
  }

  return null;
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
