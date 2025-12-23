document.addEventListener("DOMContentLoaded", function () {
  const formulaForm = document.getElementById("formulaForm");
  const formulaQuery = document.getElementById("formulaQuery");
  const formulaSubmitBtn = document.getElementById("formulaSubmitBtn");
  const formulaInputArea = document.getElementById("formulaInputArea");
  const formulaResultArea = document.getElementById("formulaResultArea");
  const formulaResult = document.getElementById("formulaResult");
  const searchAnotherBtn = document.getElementById("searchAnotherBtn");

  if (formulaForm) {
    formulaForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const query = formulaQuery.value.trim();
      const gradeLevel = document.getElementById("formulaGradeLevel").value;

      if (!query) {
        alert("Please enter a formula to search for.");
        return;
      }

      formulaSubmitBtn.disabled = true;
      formulaSubmitBtn.textContent = "Searching...";

      try {
        const response = await fetch("/api/formula", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formula: query, grade_level: gradeLevel }),
        });

        const data = await response.json();

        if (response.ok) {
          formulaInputArea.style.display = "none";
          formulaResultArea.style.display = "block";
          formulaResult.innerHTML = data.formula;

          if (window.MathJax) {
            MathJax.typesetPromise([formulaResult]).catch((err) =>
              console.error("MathJax error:", err)
            );
          }
        } else {
          alert("Error: " + data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to get formula. Please try again.");
      } finally {
        formulaSubmitBtn.disabled = false;
        formulaSubmitBtn.textContent = "Get Formula";
      }
    });
  }

  if (searchAnotherBtn) {
    searchAnotherBtn.addEventListener("click", function () {
      formulaResultArea.style.display = "none";
      formulaInputArea.style.display = "block";
      formulaQuery.value = "";
      formulaResult.innerHTML = "";
    });
  }
});
