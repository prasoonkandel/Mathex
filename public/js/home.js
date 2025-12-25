// Page Navigation
function showPage(pageName) {
  document.querySelectorAll(".page-section").forEach((section) => {
    section.classList.remove("active");
  });

  const pageSection = document.getElementById("page-" + pageName);
  if (pageSection) {
    pageSection.classList.add("active");
  }
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  if (hamburger && navLinks) {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  }

  // Update URL hash without reloading page
  if (pageName === "home") {
    // For home page, remove hash from URL
    if (window.location.hash) {
      window.history.pushState(null, null, window.location.pathname);
    }
  } else {
    // For other pages, add hash to URL
    if (window.location.hash !== "#" + pageName) {
      window.history.pushState(null, null, "#" + pageName);
    }
  }

  // Smooth scroll to top on all pages
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 50);
}

// Load page from URL hash
function loadPageFromURL() {
  const hash = window.location.hash.substring(1); // Remove the #
  const pageName = hash || "home"; // Default to home if no hash

  // List of valid pages
  const validPages = [
    "home",
    "solver",
    "quiz",
    "formula",
    "barchart",
    "piechart",
    "distance",
    "others",
  ];

  if (validPages.includes(pageName)) {
    showPage(pageName);
  } else {
    showPage("home");
  }
}

// Quote Functions
async function getQuote() {
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  if (!quoteText || !quoteAuthor || !newQuoteBtn) return;

  newQuoteBtn.disabled = true;
  quoteText.style.opacity = "0.5";
  quoteAuthor.style.opacity = "0.5";

  try {
    const response = await fetch(API_ENDPOINTS.quotes);
    const data = await response.json();

    if (response.ok) {
      setTimeout(() => {
        quoteText.textContent = data.quote;
        quoteAuthor.textContent = "- " + data.author;
        quoteText.style.opacity = "1";
        quoteAuthor.style.opacity = "1";
      }, 200);
    } else {
      quoteText.textContent = "Error loading quote";
      quoteAuthor.textContent = "";
      quoteText.style.opacity = "1";
      quoteAuthor.style.opacity = "1";
    }
  } catch (error) {
    quoteText.textContent = "Could not connect to server";
    quoteAuthor.textContent = "";
    quoteText.style.opacity = "1";
    quoteAuthor.style.opacity = "1";
  } finally {
    newQuoteBtn.disabled = false;
  }
}

// Mini Calculator Functions
let calcExpression = "";
let calcDisplay = null;

function appendCalc(value) {
  if (calcExpression === "0" || calcExpression === "Error") {
    calcExpression = "";
  }
  // Limit to 15 characters to prevent overflow
  if (calcExpression.length < 15) {
    calcExpression += value;
  }
  updateCalcDisplay();
}

function clearCalc() {
  calcExpression = "";
  updateCalcDisplay();
}

function deleteCalc() {
  if (calcExpression.length > 0) {
    calcExpression = calcExpression.slice(0, -1);
    updateCalcDisplay();
  }
}

function calculateCalc() {
  try {
    if (calcExpression === "") {
      calcExpression = "0";
    } else {
      // Replace × with * for evaluation
      const evalExpression = calcExpression
        .replace(/×/g, "*")
        .replace(/−/g, "-");
      const result = eval(evalExpression);
      calcExpression = result.toString();
    }
    updateCalcDisplay();
  } catch (error) {
    calcExpression = "Error";
    updateCalcDisplay();
    setTimeout(() => {
      calcExpression = "";
      updateCalcDisplay();
    }, 1500);
  }
}

function updateCalcDisplay() {
  if (calcDisplay) {
    calcDisplay.textContent = calcExpression || "0";
  }
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize calculator display
  calcDisplay = document.getElementById("calcDisplay");

  // Smooth scroll for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement && !link.hasAttribute("data-page")) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Page navigation click handler
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-page]");
    if (target) {
      e.preventDefault();
      const pageName = target.getAttribute("data-page");
      showPage(pageName);
    }
  });

  // Handle browser back/forward buttons
  window.addEventListener("hashchange", () => {
    loadPageFromURL();
  });

  // Initialize quote on home page
  const quoteText = document.getElementById("quoteText");
  const quoteAuthor = document.getElementById("quoteAuthor");
  const newQuoteBtn = document.getElementById("newQuoteBtn");

  if (quoteText && quoteAuthor) {
    getQuote();
  }

  if (newQuoteBtn) {
    newQuoteBtn.addEventListener("click", getQuote);
  }

  // Load page based on URL hash (or default to home)
  loadPageFromURL();
});
