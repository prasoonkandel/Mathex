const form = document.getElementById("quizForm");
const gradeInput = document.getElementById("grade");
const topicInput = document.getElementById("topic");
const resultDiv = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const grade = gradeInput.value;
  const topic = topicInput.value.trim();

  if (!grade || !topic) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Generating Quiz...";
  resultDiv.style.display = "block";
  resultDiv.className = "result loading";
  resultDiv.textContent = "Creating your quiz questions...";

  try {
    const response = await fetch("/api/quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grade_level: grade,
        description: topic,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      resultDiv.className = "result";
      resultDiv.textContent = data.quiz;
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
    submitBtn.textContent = "Generate Quiz";
  }
});
