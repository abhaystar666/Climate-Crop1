// Connect to NASA POWER API

export async function fetchNASAData(latitude, longitude, start = "20240101", end = "20241231") {
  const url = new URL("https://power.larc.nasa.gov/api/temporal/daily/point");

  url.search = new URLSearchParams({
    parameters: "T2M,PRECTOTCORR",
    community: "AG",
    longitude: longitude,
    latitude: latitude,
    start,
    end,
    format: "JSON"
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("NASA API error: " + response.status);
  }

  const data = await response.json();
  return data;
}