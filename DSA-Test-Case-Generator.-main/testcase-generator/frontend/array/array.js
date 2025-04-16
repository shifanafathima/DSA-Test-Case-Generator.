const defaultMin = -10000;
const defaultMax = 10000;

document.querySelectorAll(".card.edge").forEach(card => {
  card.addEventListener("click", () => card.classList.toggle("selected"));
});

function generateTestCases() {
  const t = parseInt(document.getElementById("testcases").value);
  const size = parseInt(document.getElementById("arraysize").value) || Math.floor(Math.random() * 10) + 1;
  const type = document.getElementById("valuetype").value;
  const min = parseInt(document.getElementById("minvalue").value) || defaultMin;
  const max = parseInt(document.getElementById("maxvalue").value) || defaultMax;

  const edges = Array.from(document.querySelectorAll(".card.edge.selected")).map(c => c.dataset.value);

  let output = "";

  for (let i = 0; i < t; i++) {
    const order = "random";
    const arr = generateArray(size, order, min, max, type);
    output += `[${arr.join(", ")}]\n`;
  }

  edges.forEach(edge => {
    const arr = getEdgeCaseArray(edge, min, max, size, type);
    if (arr.length || edge === "empty") output += `[${arr.join(", ")}]\n`;
  });

  document.getElementById("output").value = output.trim();
}

function generateArray(len, order, min, max, type) {
  let arr = [];
  switch (order) {
    case "asc":
      for (let i = 0; i < len; i++) arr.push(generateValue(min + i, type));
      break;
    case "desc":
      for (let i = len; i > 0; i--) arr.push(generateValue(min + i, type));
      break;
    case "constant":
      const val = generateValue(randomInRange(min, max), type);
      arr = Array(len).fill(val);
      break;
    default: // random
      for (let i = 0; i < len; i++) arr.push(generateValue(randomInRange(min, max), type));
      break;
  }
  return arr;
}

function generateValue(val, type) {
  if (type === "double" || type === "float") {
    return (val + Math.random()).toFixed(2);
  }
  return Math.floor(val);
}

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

function getEdgeCaseArray(edge, min, max, len, type) {
  switch (edge) {
    case "random": return generateArray(len, "random", min, max, type);
    case "asc": return generateArray(len, "asc", min, max, type);
    case "desc": return generateArray(len, "desc", min, max, type);
    case "constant": return generateArray(len, "constant", min, max, type);
    case "1-1": return [1, -1];
    case "large": return [10000, -10000];
    case "empty": return [];
    case "dup": return Array(len).fill(7);
    case "reverse":
      const base = generateArray(len, "asc", min, max, type);
      return base.reverse();
    default: return [];
  }
}

function copyToClipboard() {
  const text = document.getElementById("output").value;
  navigator.clipboard.writeText(text).then(() => alert("Copied to clipboard!"));
}
