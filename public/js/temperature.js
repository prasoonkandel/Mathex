// Temperature conversion function
function tempConv(unitFrom, unitTo, value) {
  if (unitFrom === "c") {
    if (unitTo === "c") {
      return value;
    } else if (unitTo === "f") {
      return (value * 9) / 5 + 32;
    } else if (unitTo === "k") {
      return value + 273.15;
    } else {
      return -1;
    }
  } else if (unitFrom === "f") {
    if (unitTo === "c") {
      return ((value - 32) * 5) / 9;
    } else if (unitTo === "f") {
      return value;
    } else if (unitTo === "k") {
      return ((value - 32) * 5) / 9 + 273.15;
    } else {
      return -1;
    }
  } else if (unitFrom === "k") {
    if (unitTo === "c") {
      return value - 273.15;
    } else if (unitTo === "f") {
      return ((value - 273.15) * 9) / 5 + 32;
    } else if (unitTo === "k") {
      return value;
    } else {
      return -1;
    }
  } else {
    return -1;
  }
}

// Same style of logic as distance.js :) he he

function getTempUnitName(unit) {
  const names = {
    c: "Celsius",
    f: "Fahrenheit",
    k: "Kelvin",
  };
  return names[unit] || unit;
}

function performTempConversion() {
  const fromValue = parseFloat(document.getElementById("tempFromValue").value);
  const fromUnit = document.getElementById("tempFromUnit").value;
  const toUnit = document.getElementById("tempToUnit").value;
  const toValueInput = document.getElementById("tempToValue");
  const formulaText = document.getElementById("tempConversionFormula");

  if (!fromValue || isNaN(fromValue)) {
    toValueInput.value = "";
    formulaText.textContent = "Enter a value to convert";
    return;
  }

  const result = tempConv(fromUnit, toUnit, fromValue);

  if (result === -1) {
    toValueInput.value = "Error";
    formulaText.innerHTML =
      '<span class="error-text">⚠️ Invalid conversion</span>';
  } else {
    toValueInput.value = result.toFixed(2);
    formulaText.innerHTML = `
      <span class="conversion-from">${fromValue}</span> 
      <span class="conversion-unit">${getTempUnitName(fromUnit)}</span>
      <span class="conversion-equals">=</span>
      <span class="conversion-to">${result.toFixed(2)}</span> 
      <span class="conversion-unit">${getTempUnitName(toUnit)}</span>
    `;
  }
}

function swapTempUnits() {
  const fromUnit = document.getElementById("tempFromUnit");
  const toUnit = document.getElementById("tempToUnit");
  const fromValue = document.getElementById("tempFromValue");
  const toValue = document.getElementById("tempToValue");

  const tempUnit = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = tempUnit;

  if (toValue.value && toValue.value !== "Error") {
    fromValue.value = toValue.value;
    performTempConversion();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const fromValue = document.getElementById("tempFromValue");
  const fromUnit = document.getElementById("tempFromUnit");
  const toUnit = document.getElementById("tempToUnit");
  const swapBtn = document.getElementById("tempSwapBtn");

  if (fromValue && fromUnit && toUnit && swapBtn) {
    fromValue.addEventListener("input", performTempConversion);
    fromUnit.addEventListener("change", performTempConversion);
    toUnit.addEventListener("change", performTempConversion);
    swapBtn.addEventListener("click", swapTempUnits);

    const formulaElement = document.getElementById("tempConversionFormula");
    if (formulaElement) {
      formulaElement.innerHTML =
        '<span class="initial-text">Enter a value to convert</span>';
    }
  }
});
