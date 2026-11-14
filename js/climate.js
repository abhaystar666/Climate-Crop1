// CLIMATE DATA CALCULATIONS

export function calculateClimate(data) {

    const rainfall = data.properties.parameter.PRECTOTCORR;
    const temperature = data.properties.parameter.T2M;

    const years = {};

    for (const date in rainfall) {

        const year = date.substring(0, 4);

        const rain = rainfall[date];
        const temp = temperature[date];

        if (!years[year]) {
            years[year] = {
                rainfall: 0,
                temperature: 0,
                rainDays: 0,
                tempDays: 0
            };
        }

        // Calculate rainfall
        if (Number.isFinite(rain) && rain !== -999) {
            years[year].rainfall += rain;
            years[year].rainDays++;
        }

        // Calculate temperature
        if (Number.isFinite(temp) && temp !== -999) {
            years[year].temperature += temp;
            years[year].tempDays++;
        }
    }

    return years;
}


// COMPARE HISTORICAL AND RECENT CLIMATE

export function compareClimate(years) {

    function averagePeriod(start, end) {

        let totalRain = 0;
        let totalTemp = 0;
        let count = 0;

        for (let year = start; year <= end; year++) {

            const record = years[year];

            if (
                record &&
                record.rainDays >= 300 &&
                record.tempDays >= 300
            ) {

                totalRain += record.rainfall;

                totalTemp +=
                    record.temperature / record.tempDays;

                count++;
            }
        }

        if (count === 0) {
            throw new Error("Insufficient climate data");
        }

        return {
            rainfall: totalRain / count,
            temperature: totalTemp / count
        };
    }

    const baseline = averagePeriod(2001, 2020);
    const recent = averagePeriod(2021, 2025);

    return {

        baseline: baseline,

        recent: recent,

        rainfallChange:
            baseline.rainfall !== 0
            ? ((recent.rainfall - baseline.rainfall)
            / baseline.rainfall) * 100
            : null,

        temperatureChange:
            recent.temperature - baseline.temperature
    };
}