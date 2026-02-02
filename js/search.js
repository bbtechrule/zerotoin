const diagrams = [
  { name: "Structure of DNA", link: "dna.html" }
];

function searchDiagram() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  diagrams.forEach(d => {
    if (d.name.toLowerCase().includes(input)) {
      let li = document.createElement("li");
      li.innerHTML = `<a href="${d.link}">${d.name}</a>`;
      resultList.appendChild(li);
    }
  });
}
