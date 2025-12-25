// Pie Chart Page JavaScript
window.addPieDataRow = function () {
  const dataInputs = document.getElementById("pieDataInputs");
  const newRow = document.createElement("div");
  newRow.className = "data-row";
  newRow.innerHTML = `
    <input type="text" class="pie-data-label" placeholder="Label" />
    <input type="number" class="pie-data-value" placeholder="Value" step="any" inputmode="decimal" />
    <button class="remove-data-btn" onclick="removePieDataRow(this)">✕</button>
  `;
  dataInputs.appendChild(newRow);
};

window.removePieDataRow = function (button) {
  const dataInputs = document.getElementById("pieDataInputs");
  const rows = dataInputs.querySelectorAll(".data-row");

  if (rows.length > 1) {
    button.parentElement.remove();
  } else {
    alert("You must have at least one data row!");
  }
};

// Generate pie chart - make it global
window.generatePieChart = async function () {
  const title = document.getElementById("pieChartTitle").value.trim();

  // Collect data from rows
  const dataRows = document.querySelectorAll("#pieDataInputs .data-row");
  const labels = [];
  const values = [];

  let isValid = true;
  dataRows.forEach((row) => {
    const label = row.querySelector(".pie-data-label").value.trim();
    const value = row.querySelector(".pie-data-value").value.trim();

    if (!label || !value) {
      isValid = false;
      return;
    }

    labels.push(label);
    values.push(parseFloat(value));
  });

  // Validation
  if (!isValid) {
    alert("Please fill in all labels and values!");
    return;
  }

  if (labels.length === 0) {
    alert("Please add at least one data row!");
    return;
  }

  if (!title) {
    alert("Please enter a chart title!");
    return;
  }

  // Show loading
  const inputArea = document.querySelector(".piechart-input-section");
  const resultArea = document.getElementById("pieChartResultArea");
  const loadingArea = document.getElementById("pieChartLoading");

  inputArea.style.display = "none";
  resultArea.style.display = "none";
  loadingArea.style.display = "block";

  try {
    console.log("Generating pie chart with data:", { labels, values, title });

    const response = await fetch(API_ENDPOINTS.piechart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        labels: labels,
        values: values,
        title: title,
      }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      throw new Error(
        `Server error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Response data:", data);

    if (data.error) {
      throw new Error(data.error);
    }

    // Display chart
    const chartImage = document.getElementById("pieChartImage");
    chartImage.src = data.image;

    loadingArea.style.display = "none";
    resultArea.style.display = "block";

    // Scroll to top smoothly after DOM updates
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  } catch (error) {
    console.error("Error generating pie chart:", error);
    alert("Error generating pie chart: " + error.message);

    loadingArea.style.display = "none";
    inputArea.style.display = "block";
  }
};

// Save chart as image
function savePieChart() {
  const chartImage = document.getElementById("pieChartImage");
  const title =
    document.getElementById("pieChartTitle").value.trim() || "pie_chart";

  // Create a temporary link to download
  const link = document.createElement("a");
  link.href = chartImage.src;
  link.download = `${title.replace(/\s+/g, "_")}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Create new pie chart
window.createNewPieChart = function () {
  const inputArea = document.querySelector(".piechart-input-section");
  const resultArea = document.getElementById("pieChartResultArea");

  resultArea.style.display = "none";
  inputArea.style.display = "block";
};
