// GPA Calculator Page JS
const gradeToGPA = {
  "A+": 4.0,
  A: 3.6,
  "B+": 3.2,
  B: 2.8,
  "C+": 2.4,
  C: 2.0,
  D: 1.6,
  NG: 0.0,
};

window.addSubjectRow = function () {
  const subjectInputs = document.getElementById("subjectInputs");
  const newRow = document.createElement("div");
  newRow.className = "subject-row";
  newRow.innerHTML = `
    <input type="text" class="subject-name" placeholder="Subject Name (e.g., Mathematics)" />
    <select class="subject-grade">
      <option value="">Select Grade</option>
      <option value="A+">A+</option>
      <option value="A">A</option>
      <option value="B+">B+</option>
      <option value="B">B</option>
      <option value="C+">C+</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="NG">NG</option>
    </select>
    <button class="remove-subject-btn" onclick="removeSubjectRow(this)">✕</button>
  `;
  subjectInputs.appendChild(newRow);
};

window.removeSubjectRow = function (button) {
  const subjectInputs = document.getElementById("subjectInputs");
  const rows = subjectInputs.querySelectorAll(".subject-row");

  if (rows.length > 1) {
    button.parentElement.remove();
  } else {
    alert("You must have at least one subject!");
  }
};

window.calculateGPA = function () {
  const subjectRows = document.querySelectorAll("#subjectInputs .subject-row");
  const subjects = [];

  let isValid = true;
  subjectRows.forEach((row) => {
    const name = row.querySelector(".subject-name").value.trim();
    const grade = row.querySelector(".subject-grade").value;

    if (!name || !grade) {
      isValid = false;
      return;
    }

    subjects.push({
      name: name,
      grade: grade,
      gradePoint: gradeToGPA[grade],
    });
  });

  if (!isValid) {
    alert("Please fill in all subject details (name and grade)!");
    return;
  }

  if (subjects.length === 0) {
    alert("Please add at least one subject!");
    return;
  }

  let totalGradePoints = 0;

  subjects.forEach((subject) => {
    totalGradePoints += subject.gradePoint;
  });

  const gpa = totalGradePoints / subjects.length;

  displayGPAResult(gpa, subjects.length);
};

function displayGPAResult(gpa, totalSubjects) {
  const inputArea = document.querySelector(".gpa-input-section");
  const resultArea = document.getElementById("gpaResultArea");

  inputArea.style.display = "none";
  resultArea.style.display = "block";

  document.getElementById("gpaValue").textContent = gpa.toFixed(2);
  document.getElementById("totalSubjects").textContent = totalSubjects;

  let performance = "";
  if (gpa >= 3.6) {
    performance = "Distinction";
  } else if (gpa >= 3.2) {
    performance = "First Division";
  } else if (gpa >= 2.8) {
    performance = "Second Division";
  } else if (gpa >= 2.4) {
    performance = "Third Division";
  } else {
    performance = "Pass";
  }
  document.getElementById("performance").textContent = performance;

  window.scrollTo(0, 0);
}

// shree radha.........
window.createNewGPA = function () {
  const inputArea = document.querySelector(".gpa-input-section");
  const resultArea = document.getElementById("gpaResultArea");

  resultArea.style.display = "none";
  inputArea.style.display = "block";

  const subjectInputs = document.getElementById("subjectInputs");
  subjectInputs.innerHTML = `
    <div class="subject-row">
      <input type="text" class="subject-name" placeholder="Subject Name (e.g., Mathematics)" />
      <select class="subject-grade">
        <option value="">Select Grade</option>
        <option value="A+">A+</option>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="NG">NG</option>
      </select>
      <button class="remove-subject-btn" onclick="removeSubjectRow(this)">✕</button>
    </div>
  `;

  window.scrollTo(0, 0);
};

/* Main GPA calculation logic I made :) hehe*/

function gpaCalc(grades) {
  let n = grades.length;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += grades[i];
  }
  return sum / n;
}
