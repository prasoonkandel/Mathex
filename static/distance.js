// Distance conversion function using the C++ logic i made
function distance(value, unit_from, unit_to) {
  if (unit_from === "mile") {
    if (unit_to === "foot") {
      return value * 5280;
    } else if (unit_to === "inch") {
      return value * 63360;
    } else if (unit_to === "mm") {
      return value * 1609344;
    } else if (unit_to === "cm") {
      return value * 160934.4;
    } else if (unit_to === "m") {
      return value * 1609.344;
    } else if (unit_to === "km") {
      return value * 1.609344;
    } else if (unit_to === "mile") {
      return value;
    } else {
      return -1;
    }
  } else if (unit_from === "foot") {
    if (unit_to === "foot") {
      return value;
    } else if (unit_to === "inch") {
      return value * 12;
    } else if (unit_to === "mm") {
      return value * 304.8;
    } else if (unit_to === "cm") {
      return value * 30.48;
    } else if (unit_to === "m") {
      return value / 3.28084;
    } else if (unit_to === "km") {
      return value / 3280.84;
    } else if (unit_to === "mile") {
      return value / 5280;
    } else {
      return -1;
    }
  } else if (unit_from === "inch") {
    if (unit_to === "foot") {
      return value / 12;
    } else if (unit_to === "inch") {
      return value;
    } else if (unit_to === "mm") {
      return value * 25.4;
    } else if (unit_to === "cm") {
      return value * 2.54;
    } else if (unit_to === "m") {
      return value / 39.3701;
    } else if (unit_to === "km") {
      return value / 39370.1;
    } else if (unit_to === "mile") {
      return value / 63360;
    } else {
      return -1;
    }
  } else if (unit_from === "mm") {
    if (unit_to === "foot") {
      return value / 304.8;
    } else if (unit_to === "inch") {
      return value / 25.4;
    } else if (unit_to === "mm") {
      return value;
    } else if (unit_to === "cm") {
      return value / 10;
    } else if (unit_to === "m") {
      return value / 1000;
    } else if (unit_to === "km") {
      return value / 1000000;
    } else if (unit_to === "mile") {
      return value / 1609344;
    } else {
      return -1;
    }
  } else if (unit_from === "cm") {
    if (unit_to === "foot") {
      return value / 30.48;
    } else if (unit_to === "inch") {
      return value / 2.54;
    } else if (unit_to === "mm") {
      return value * 10;
    } else if (unit_to === "cm") {
      return value;
    } else if (unit_to === "m") {
      return value / 100;
    } else if (unit_to === "km") {
      return value / 100000;
    } else if (unit_to === "mile") {
      return value / 160934.4;
    } else {
      return -1;
    }
  } else if (unit_from === "m") {
    if (unit_to === "foot") {
      return value * 3.28084;
    } else if (unit_to === "inch") {
      return value * 39.3701;
    } else if (unit_to === "mm") {
      return value * 1000;
    } else if (unit_to === "cm") {
      return value * 100;
    } else if (unit_to === "m") {
      return value;
    } else if (unit_to === "km") {
      return value / 1000;
    } else if (unit_to === "mile") {
      return value / 1609.344;
    } else {
      return -1;
    }
  } else if (unit_from === "km") {
    if (unit_to === "foot") {
      return value * 3280.84;
    } else if (unit_to === "inch") {
      return value * 39370.1;
    } else if (unit_to === "mm") {
      return value * 1000000;
    } else if (unit_to === "cm") {
      return value * 100000;
    } else if (unit_to === "m") {
      return value * 1000;
    } else if (unit_to === "km") {
      return value;
    } else if (unit_to === "mile") {
      return value / 1.609344;
    } else {
      return -1;
    }
  } else {
    return -1;
  }
}

// Get unit display name
function getUnitName(unit) {
  const names = {
    m: "meters",
    km: "kilometers",
    cm: "centimeters",
    mm: "millimeters",
    mile: "miles",
    foot: "feet",
    inch: "inches",
  };
  return names[unit] || unit;
}

// Live conversion
function performConversion() {
  const fromValue = parseFloat(document.getElementById("fromValue").value);
  const fromUnit = document.getElementById("fromUnit").value;
  const toUnit = document.getElementById("toUnit").value;
  const toValueInput = document.getElementById("toValue");
  const formulaText = document.getElementById("conversionFormula");

  if (!fromValue || isNaN(fromValue)) {
    toValueInput.value = "";
    formulaText.textContent = "Enter a value to convert";
    return;
  }

  const result = distance(fromValue, fromUnit, toUnit);

  if (result === -1) {
    toValueInput.value = "Error";
    formulaText.innerHTML =
      '<span class="error-text">⚠️ Invalid conversion</span>';
  } else {
    toValueInput.value = result.toFixed(2);
    formulaText.innerHTML = `
      <span class="conversion-from">${fromValue}</span> 
      <span class="conversion-unit">${getUnitName(fromUnit)}</span>
      <span class="conversion-equals">=</span>
      <span class="conversion-to">${result.toFixed(2)}</span> 
      <span class="conversion-unit">${getUnitName(toUnit)}</span>
    `;
  }
}

function swapUnits() {
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const fromValue = document.getElementById("fromValue");
  const toValue = document.getElementById("toValue");

  const tempUnit = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;

  if (toValue.value && toValue.value !== "Error") {
    fromValue.value = toValue.value;
    performConversion();
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  const fromValue = document.getElementById("fromValue");
  const fromUnit = document.getElementById("fromUnit");
  const toUnit = document.getElementById("toUnit");
  const swapBtn = document.getElementById("swapBtn");

  if (fromValue && fromUnit && toUnit && swapBtn) {
    fromValue.addEventListener("input", performConversion);
    fromUnit.addEventListener("change", performConversion);
    toUnit.addEventListener("change", performConversion);
    swapBtn.addEventListener("click", swapUnits);

    document.getElementById("conversionFormula").innerHTML =
      '<span class="initial-text">Enter a value to convert</span>';
  }
});
