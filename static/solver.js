const form = document.getElementById("solverForm");
const questionInput = document.getElementById("question");
const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

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
