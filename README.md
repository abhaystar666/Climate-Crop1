# ClimateCrop

ClimateCrop is a climate-smart web application designed to help farmers and agricultural planners understand how local rainfall and temperature patterns are changing over time. By comparing historical and recent climate data, it supports better crop selection and long-term field planning.

## Project Goal

The project uses NASA POWER climate data to analyze:

- Historical rainfall trends
- Recent temperature variation
- Seasonal climate change and risk signals
- Crop suitability recommendations for local agricultural conditions

## Key Features

- Select a farm location from supported districts in Maharashtra
- Fetch climate data from the NASA POWER API
- Compare historical and recent rainfall averages
- Analyze temperature changes over time
- Highlight climate patterns that affect crop planning
- Present a cleaner, modern landing page that explains the project to users

## Tech Stack

- HTML5
- CSS3
- JavaScript (ES modules)
- NASA POWER API
- Visual Studio Code

## Project Structure

```text
ClimateCrop/
├── index.html
├── style.css
├── script.js
├── README.md
├── images/
│   └── farm.jpg
├── js/
│   ├── climate.js
│   ├── crops.js
│   └── nasa.js
└── .git/
```

## How to Run

1. Open the project folder in Visual Studio Code.
2. Install the Live Server extension if it is not already installed.
3. Open `index.html`.
4. Right-click the file and choose "Open with Live Server".
5. Choose a location and click "Load climate data".

## Data Source

This project uses NASA POWER (Prediction Of Worldwide Energy Resources):

- Website: https://power.larc.nasa.gov/
- Data used: rainfall and temperature observations for agricultural climate analysis

## Why This Project Matters

Agriculture is highly sensitive to changing climate patterns. A small shift in rainfall or temperature can influence sowing decisions, crop health, and farm productivity. ClimateCrop aims to make these climate signals easier to understand and act on.

## Future Improvements

- Add more crop recommendation logic
- Show graphs for rainfall and temperature over time
- Support more districts and regions
- Add an AI-assisted crop recommendation model
- Improve mobile responsiveness and user experience further

## Notes

NASA climate data provides regional estimates and is useful for trend analysis, but it is not a substitute for farm-level sensor data or local agronomy advice.
