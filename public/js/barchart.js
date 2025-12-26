// Bar Chart Page JavaScript
window.addDataRow = function () {
  const dataInputs = document.getElementById("dataInputs");
  const newRow = document.createElement("div");
  newRow.className = "data-row";
  newRow.innerHTML = `
    <input type="text" class="data-label" placeholder="Label" />
    <input type="number" class="data-value" placeholder="Value" step="any" inputmode="decimal" />
    <button class="remove-data-btn" onclick="removeDataRow(this)">✕</button>
  `;
  dataInputs.appendChild(newRow);
};

window.removeDataRow = function (button) {
  const dataInputs = document.getElementById("dataInputs");
  const rows = dataInputs.querySelectorAll(".data-row");

  if (rows.length > 1) {
    button.parentElement.remove();
  } else {
    alert("You must have at least one data row!");
  }
};

// Generate chart - make it global so it can be called
window.generateChart = async function () {
  const title = document.getElementById("chartTitle").value.trim();
  const xlabel = document.getElementById("chartXLabel").value.trim();
  const ylabel = document.getElementById("chartYLabel").value.trim();
  const color = document.getElementById("chartColor").value;

  // Collect data from rows
  const dataRows = document.querySelectorAll("#dataInputs .data-row");
  const labels = [];
  const values = [];

  let isValid = true;
  dataRows.forEach((row) => {
    const label = row.querySelector(".data-label").value.trim();
    const value = row.querySelector(".data-value").value.trim();

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
  const inputArea = document.querySelector(".barchart-input-section");
  const resultArea = document.getElementById("chartResultArea");
  const loadingArea = document.getElementById("chartLoading");

  inputArea.style.display = "none";
  resultArea.style.display = "none";
  loadingArea.style.display = "block";

  // Scroll to top immediately using multiple methods
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  try {
    console.log("Generating chart with data:", {
      labels,
      values,
      title,
      xlabel,
      ylabel,
      color,
    });

    const response = await fetch(API_ENDPOINTS.barchart, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        labels: labels,
        values: values,
        title: title,
        xlabel: xlabel,
        ylabel: ylabel,
        color: color,
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
    const chartImage = document.getElementById("chartImage");
    chartImage.src = data.image;

    loadingArea.style.display = "none";
    resultArea.style.display = "block";
  } catch (error) {
    console.error("Error generating chart:", error);
    alert("Error generating chart: " + error.message);

    loadingArea.style.display = "none";
    inputArea.style.display = "block";
  }
};

// Save chart as image
window.saveChart = function () {
  const chartImage = document.getElementById("chartImage");
  const title = document.getElementById("chartTitle").value.trim() || "chart";

  // Create a temporary link to download
  const link = document.createElement("a");
  link.href = chartImage.src;
  link.download = `${title.replace(/\s+/g, "_")}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Create new chart
window.createNewChart = function () {
  const inputArea = document.querySelector(".barchart-input-section");
  const resultArea = document.getElementById("chartResultArea");

  resultArea.style.display = "none";
  inputArea.style.display = "block";

  // Scroll to top immediately
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  // Optionally reset form
  // document.getElementById("chartTitle").value = "Bar Chart";
  // document.getElementById("chartXLabel").value = "Categories";
  // document.getElementById("chartYLabel").value = "Values";
};
