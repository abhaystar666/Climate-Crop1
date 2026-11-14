import { fetchNASAData } from "./js/nasa.js";

const button = document.getElementById("getDataBtn");

button.addEventListener("click", getNASAData);

async function getNASAData() {

    const status = document.getElementById("status");

    status.innerText = "Fetching NASA data...";

    try {

        const data = await fetchNASAData(21.47, 78.27);

        const temperatureData =
            Object.values(data.properties.parameter.T2M);

        const rainfallData =
            Object.values(data.properties.parameter.PRECTOTCORR);

        const validTemperatures = temperatureData.filter(
            value => Number.isFinite(value) && value !== -999
        );

        const validRainfall = rainfallData.filter(
            value => Number.isFinite(value) && value !== -999
        );

        if (!validTemperatures.length || !validRainfall.length) {
            throw new Error("No valid climate data received.");
        }

        const averageTemperature =
            validTemperatures.reduce((a, b) => a + b, 0) /
            validTemperatures.length;

        const totalRainfall =
            validRainfall.reduce((a, b) => a + b, 0);

        document.getElementById("temperatureChange").innerText =
            averageTemperature.toFixed(2) + " °C";

        document.getElementById("rainfallChange").innerText =
            totalRainfall.toFixed(2) + " mm";

        status.innerText = "NASA data loaded successfully!";

    } catch (error) {

        console.error("Error:", error);

        status.innerText = error.message;
    }
}