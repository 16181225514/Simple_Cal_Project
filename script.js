const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
const historyContainer = document.getElementById("history-container");
const toggleBtn = document.querySelector(".history-toggle");
const scientificPanel = document.querySelector(".scientific-panel");
const clearScientificBtn = document.getElementById("clear-scientific"); // Clear button in scientific panel

let isDragging = false;
let offsetX, offsetY;

// Function to append value to display
function append(value) {
  display.value += value;
}

// Function to clear display
function clearDisplay() {
  display.value = "";
}

// Function to perform backspace (remove the last character)
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Function to add history
function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  li.onclick = () => {
    display.value = expression;
  };
  historyList.prepend(li);
}

// Function to toggle history display
function toggleHistory() {
  if (historyContainer.style.display === "none") {
    historyContainer.style.display = "block";
    toggleBtn.textContent = "Hide History";
  } else {
    historyContainer.style.display = "none";
    toggleBtn.textContent = "Show History";
  }
}

// Function to clear history
function clearHistory() {
  historyList.innerHTML = "";
}

// Function to toggle the scientific panel
function toggleScientific() {
  if (scientificPanel.style.display === "none" || scientificPanel.style.display === "") {
    scientificPanel.style.display = "block";  // Show the panel
  } else {
    scientificPanel.style.display = "none";  // Hide the panel
  }
}
// Function to handle scientific buttons
function scientificAppend(func) {
  switch (func) {
    case 'sin':
      display.value += 'Math.sin(';
      break;
    case 'cos':
      display.value += 'Math.cos(';
      break;
    case 'tan':
      display.value += 'Math.tan(';
      break;
    case 'log':
      display.value += 'Math.log10(';
      break;
    case 'sqrt':
      display.value += 'Math.sqrt(';
      break;
    case 'pi':
      display.value += 'Math.PI';
      break;
    case 'e':
      display.value += 'Math.E';
      break;
    case '^':
      display.value += '**'; // Power operator in JavaScript
      break;
    case '(':
    case ')':
      display.value += func;
      break;
    default:
      display.value += func;
  }
}

// Modify the calculate function to convert degrees to radians for trig functions
function calculate() {
  try {
    let expression = display.value;
    
    // Convert degrees to radians for sin, cos, and tan
    expression = expression.replace(/sin\(([^)]+)\)/g, (match, p1) => `Math.sin(${p1} * Math.PI / 180)`);
    expression = expression.replace(/cos\(([^)]+)\)/g, (match, p1) => `Math.cos(${p1} * Math.PI / 180)`);
    expression = expression.replace(/tan\(([^)]+)\)/g, (match, p1) => `Math.tan(${p1} * Math.PI / 180)`);
    expression = expression.replace(/log\(([^)]+)\)/g, (match, p1) => `Math.log10(${p1})`);
    expression = expression.replace(/sqrt\(([^)]+)\)/g, (match, p1) => `Math.sqrt(${p1})`);
    expression = expression.replace(/e/g, 'Math.E');
    expression = expression.replace(/pi/g, 'Math.PI');
    expression = expression.replace(/\^/g, '**'); // Convert ^ to ** for exponentiation
    // Evaluate the expression
    const result = eval(expression);
    display.value = result;
    addToHistory(expression, result);
  } catch (error) {
    display.value = "Error";
  }
}

// Close button for scientific panel
clearScientificBtn.addEventListener("click", () => {
  scientificPanel.style.display = "none";  // Hide the scientific panel when 'Close' is clicked
});
