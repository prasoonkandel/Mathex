(function () {
  let quizData = null;
  let currentQuestionIndex = 0;
  let score = 0;
  let userAnswers = [];

  let setupScreen, quizScreen, resultsScreen;
  let form, gradeInput, topicInput, submitBtn, loadingMessage;
  let progressBar, questionCounter, questionText, optionsContainer, nextBtn;
  let finalScore, scoreSummary, retryBtn;

  document.addEventListener("DOMContentLoaded", function () {
    setupScreen = document.getElementById("setupScreen");
    quizScreen = document.getElementById("quizScreen");
    resultsScreen = document.getElementById("resultsScreen");

    form = document.getElementById("quizForm");
    gradeInput = document.getElementById("grade");
    topicInput = document.getElementById("topic");
    submitBtn = document.getElementById("quizSubmitBtn");
    loadingMessage = document.getElementById("loadingMessage");

    progressBar = document.getElementById("progressBar");
    questionCounter = document.getElementById("questionCounter");
    questionText = document.getElementById("questionText");
    optionsContainer = document.getElementById("optionsContainer");
    nextBtn = document.getElementById("nextBtn");

    finalScore = document.getElementById("finalScore");
    scoreSummary = document.getElementById("scoreSummary");
    retryBtn = document.getElementById("retryBtn");

    if (form) form.addEventListener("submit", handleQuizGeneration);
    if (nextBtn) nextBtn.addEventListener("click", handleNextQuestion);
    if (retryBtn) retryBtn.addEventListener("click", resetQuiz);
  });

  async function handleQuizGeneration(e) {
    e.preventDefault();

    const grade = gradeInput.value;
    const topic = topicInput.value.trim();

    if (!grade || !topic) return;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Generating...";
    }

    if (loadingMessage) {
      loadingMessage.textContent =
        "Creating your quiz questions... This may take 20-30 seconds.";
      loadingMessage.classList.add("active");
    }

    // Scroll to top immediately using multiple methods
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    console.log("Starting quiz generation...");
    console.log("Grade:", grade);
    console.log("Topic:", topic);
    console.log("API URL:", API_ENDPOINTS.quiz);

    try {
      // Add timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 second timeout

      console.log("Sending request to:", API_ENDPOINTS.quiz);

      const response = await fetch(API_ENDPOINTS.quiz, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade_level: grade,
          description: topic,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Response received. Status:", response.status);

      const data = await response.json();
      console.log("Quiz API response:", data);
      console.log("Response status:", response.status);

      if (response.ok) {
        try {
          let quizString = data.quiz;

          // Check if response contains an error
          if (quizString.includes('"error"')) {
            const errorObj = JSON.parse(quizString);
            if (errorObj.error) {
              if (loadingMessage) {
                loadingMessage.textContent = errorObj.error;
                loadingMessage.style.color = "#ef4444";
              }
              return;
            }
          }

          if (quizString.includes("```json")) {
            quizString = quizString.split("```json")[1].split("```")[0].trim();
          } else if (quizString.includes("```")) {
            quizString = quizString.split("```")[1].split("```")[0].trim();
          }

          quizData = JSON.parse(quizString);

          // Check if parsed data contains error
          if (quizData.error) {
            if (loadingMessage) {
              loadingMessage.textContent = quizData.error;
              loadingMessage.style.color = "#ef4444";
            }
            return;
          }

          if (!quizData.questions || quizData.questions.length === 0) {
            throw new Error("No questions generated");
          }

          const invalidQuestions = quizData.questions.filter(
            (q) =>
              !q.options || !Array.isArray(q.options) || q.options.length === 0
          );

          if (invalidQuestions.length > 0) {
            console.error("Invalid questions found:", invalidQuestions);
            throw new Error(
              "Some questions are missing answer options. Please try again."
            );
          }

          startQuiz();
        } catch (parseError) {
          console.error("Parse error:", parseError);
          console.error("Raw quiz data:", data.quiz);
          if (loadingMessage) {
            loadingMessage.textContent =
              "Error: " +
              (parseError.message || "Invalid quiz format received");
            loadingMessage.style.color = "#ef4444";
          }
        }
      } else {
        console.error("Server error:", data);
        if (loadingMessage) {
          loadingMessage.textContent =
            "Error: " + (data.error || "Something went wrong");
          loadingMessage.style.color = "#ef4444";
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      if (loadingMessage) {
        if (error.name === "AbortError") {
          loadingMessage.textContent =
            "Error: Quiz generation timed out. Please try a simpler topic or try again.";
        } else {
          loadingMessage.textContent = "Error: Could not connect to server";
        }
        loadingMessage.style.color = "#ef4444";
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Generate Quiz";
      }
    }
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    setupScreen.classList.remove("active");
    quizScreen.classList.add("active");

    displayQuestion();
  }

  function displayQuestion() {
    const question = quizData.questions[currentQuestionIndex];

    if (
      !question.options ||
      !Array.isArray(question.options) ||
      question.options.length === 0
    ) {
      console.error("Question missing options:", question);
      loadingMessage.textContent =
        "Error: Question is missing answer options. Please regenerate the quiz.";
      loadingMessage.style.color = "#ef4444";
      loadingMessage.classList.add("active");
      return;
    }

    const progress =
      ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    progressBar.style.width = progress + "%";

    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${
      quizData.questions.length
    }`;

    questionText.textContent = question.question;

    optionsContainer.innerHTML = "";

    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = option;
      button.addEventListener("click", () => selectOption(index));
      optionsContainer.appendChild(button);
    });

    nextBtn.disabled = true;
  }

  function selectOption(selectedIndex) {
    const question = quizData.questions[currentQuestionIndex];
    const options = optionsContainer.querySelectorAll(".option-btn");

    options.forEach((btn) => (btn.disabled = true));

    const correctAnswerLetter = question.correct_answer;
    let correctIndex;

    if (
      correctAnswerLetter.length === 1 &&
      correctAnswerLetter.match(/[A-Z]/i)
    ) {
      correctIndex = correctAnswerLetter.toUpperCase().charCodeAt(0) - 65;
    } else {
      correctIndex = question.options.findIndex(
        (opt) => opt === correctAnswerLetter
      );
    }

    if (correctIndex === -1) correctIndex = 0;

    options[selectedIndex].classList.add("selected");

    if (selectedIndex === correctIndex) {
      options[selectedIndex].classList.add("correct");
      score++;
    } else {
      options[selectedIndex].classList.add("incorrect");
      options[correctIndex].classList.add("correct");
    }

    userAnswers.push({
      question: question.question,
      userAnswer: question.options[selectedIndex],
      correctAnswer: question.options[correctIndex],
      isCorrect: selectedIndex === correctIndex,
    });

    nextBtn.disabled = false;
  }

  function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.questions.length) {
      displayQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    quizScreen.classList.remove("active");
    resultsScreen.classList.add("active");

    const totalQuestions = quizData.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    finalScore.textContent = `${percentage}%`;

    scoreSummary.innerHTML = `
    <p><strong>Correct Answers:</strong> ${score} out of ${totalQuestions}</p>
    <p><strong>Incorrect Answers:</strong> ${totalQuestions - score}</p>
    <p><strong>Percentage:</strong> ${percentage}%</p>
  `;
  }

  function resetQuiz() {
    quizData = null;
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];

    resultsScreen.classList.remove("active");
    setupScreen.classList.add("active");

    loadingMessage.classList.remove("active");
    loadingMessage.style.color = "#6366f1";

    gradeInput.value = "";
    topicInput.value = "";
  }
})();
