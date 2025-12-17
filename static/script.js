const questionForm = document.getElementById("question-form");
const questionInput = document.getElementById("question-input");
const chatMessages = document.getElementById("chat-messages");
const sendBtn = document.getElementById("send-btn");
const sendText = document.getElementById("send-text");
const loadingSpinner = document.getElementById("loading-spinner");

function addMessage(text, isUser = false) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user" : "ai"}`;

  const label = document.createElement("div");
  label.className = "message-label";
  label.textContent = isUser ? "You" : "Mathex AI";

  const content = document.createElement("div");
  content.className = "message-content";
  content.textContent = text;

  messageDiv.appendChild(label);
  messageDiv.appendChild(content);
  chatMessages.appendChild(messageDiv);

  chatMessages.scrollTop = chatMessages.scrollHeight;

  const welcomeMessage = document.querySelector(".welcome-message");
  if (welcomeMessage) {
    welcomeMessage.remove();
  }
}

function setLoading(isLoading) {
  sendBtn.disabled = isLoading;
  questionInput.disabled = isLoading;

  if (isLoading) {
    sendText.style.display = "none";
    loadingSpinner.style.display = "inline-block";
  } else {
    sendText.style.display = "inline-block";
    loadingSpinner.style.display = "none";
  }
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = `Error: ${message}`;
  chatMessages.appendChild(errorDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendQuestion(question) {
  try {
    setLoading(true);

    const response = await fetch("/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: question }),
    });

    const data = await response.json();

    if (response.ok) {
      addMessage(data.answer, false);
    } else {
      showError(data.error || "Something went wrong");
    }
  } catch (error) {
    showError("Failed to connect to server. Please try again.");
    console.error("Error:", error);
  } finally {
    setLoading(false);
  }
}

questionForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = questionInput.value.trim();

  if (!question) return;

  addMessage(question, true);

  questionInput.value = "";

  await sendQuestion(question);
});

questionInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    questionForm.dispatchEvent(new Event("submit"));
  }
});

function setExample(text) {
  questionInput.value = text;
  questionInput.focus();
}

questionInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = Math.min(this.scrollHeight, 150) + "px";
});

window.addEventListener("load", () => {
  questionInput.focus();
});
