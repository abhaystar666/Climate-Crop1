import { fetchNASAData } from "./js/nasa.js";
import { calculateClimate, compareClimate } from "./js/climate.js";

const locationMap = {
  warud: { label: "Warud, Maharashtra", latitude: 21.47, longitude: 78.27 },
  akola: { label: "Akola, Maharashtra", latitude: 20.7, longitude: 77.0 },
  nagpur: { label: "Nagpur, Maharashtra", latitude: 21.15, longitude: 79.08 },
  parbhani: { label: "Parbhani, Maharashtra", latitude: 19.27, longitude: 76.77 }
};

const button = document.getElementById("getDataBtn");
const locationSelect = document.getElementById("location");

button.addEventListener("click", getNASAData);

function formatSignedNumber(value, suffix = "") {
  const prefix = value > 0 ? "+" : "";
  return `${prefix}${value.toFixed(2)}${suffix}`;
}

function updateClimateSummary(summary) {
  const { baseline, recent, rainfallChange, temperatureChange } = summary;

  document.getElementById("baselineRainfall").textContent = `${baseline.rainfall.toFixed(0)} mm`;
  document.getElementById("recentRainfall").textContent = `${recent.rainfall.toFixed(0)} mm`;
  document.getElementById("rainfallChange").textContent = formatSignedNumber(rainfallChange, "%");
  document.getElementById("temperatureChange").textContent = formatSignedNumber(temperatureChange, "°C");

  document.getElementById("rainfallChangeCard").textContent = formatSignedNumber(rainfallChange, "%");
  document.getElementById("temperatureChangeCard").textContent = formatSignedNumber(temperatureChange, "°C");

  const trendLabel = rainfallChange < -10 ? "Drying trend" : rainfallChange > 10 ? "Wetter trend" : "Stable pattern";
  document.getElementById("shiftScore").textContent = `${Math.min(Math.abs(rainfallChange) + Math.abs(temperatureChange) * 30, 99).toFixed(0)}%`;

  const explanation = document.getElementById("climateExplanation");

  if (temperatureChange > 0.5 && rainfallChange < -5) {
    explanation.textContent = `${locationMap[locationSelect.value].label} is showing a warmer and drier trend. This suggests greater risk of heat stress and moisture shortages, so drought-tolerant crops such as sorghum may be better suited for the coming seasons.`;
  } else if (rainfallChange > 7) {
    explanation.textContent = `${locationMap[locationSelect.value].label} is showing a wetter pattern with more available moisture. This can support crops with moderate water demand, but rainfall variability should still be monitored before final planning.`;
  } else {
    explanation.textContent = `${locationMap[locationSelect.value].label} shows a relatively stable climatic pattern. This is a favorable base for crop planning, especially when matching crops to the local rainfall and temperature balance.`;
  }

  document.querySelector(".status-pill").textContent = trendLabel;
}

async function getNASAData() {
  const status = document.getElementById("status");
  const selectedLocation = locationSelect.value;
  const { latitude, longitude } = locationMap[selectedLocation];

  status.textContent = "Fetching NASA POWER data for your selected location...";

  try {
    const data = await fetchNASAData(latitude, longitude, "20010101", "20251231");
    const calculatedYears = calculateClimate(data);
    const comparison = compareClimate(calculatedYears);

    if (!comparison || !comparison.baseline || !comparison.recent) {
      throw new Error("No valid climate comparison was generated.");
    }

    updateClimateSummary(comparison);
    status.textContent = "Climate data loaded successfully. Your crop suitability insight is ready.";
  } catch (error) {
    console.error("Error loading climate data:", error);
    status.textContent = error.message || "Unable to load climate data. Please try again.";
  }
}

locationSelect.addEventListener("change", () => {
  if (locationSelect.value) {
    document.getElementById("status").textContent = `Selected ${locationMap[locationSelect.value].label}. Click “Load climate data” to compare climate trends.`;
  }
});

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("shiftScore").textContent = "--";
  document.getElementById("rainfallChangeCard").textContent = "--";
  document.getElementById("temperatureChangeCard").textContent = "--";
});
