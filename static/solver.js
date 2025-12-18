const form = document.getElementById("solverForm");
const questionInput = document.getElementById("question");
const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const symbolsGrid = document.getElementById("symbolsGrid");

symbolsGrid.addEventListener("click", (e) => {
  if (e.target.classList.contains("symbol-btn")) {
    const symbol = e.target.dataset.symbol;
    const cursorPos = questionInput.selectionStart;
    const textBefore = questionInput.value.substring(0, cursorPos);
    const textAfter = questionInput.value.substring(cursorPos);

    questionInput.value = textBefore + symbol + textAfter;
    questionInput.focus();
    questionInput.setSelectionRange(
      cursorPos + symbol.length,
      cursorPos + symbol.length
    );
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = questionInput.value.trim();
  if (!question) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Solving...";
  resultDiv.style.display = "block";
  resultDiv.className = "result loading";
  resultDiv.textContent = "Processing your question...";

  try {
    const response = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = "result";
      resultDiv.textContent = data.answer;
    } else {
      resultDiv.className = "result error";
      resultDiv.textContent =
        "Error: " + (data.error || "Something went wrong");
    }
  } catch (error) {
    resultDiv.className = "result error";
    resultDiv.textContent = "Error: Could not connect to server";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Solve Problem";
  }
});
