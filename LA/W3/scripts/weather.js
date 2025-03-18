const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=9807125f14ee86ee4c74155a48d201d6';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const data = await response.json();
    console.log(data);
    displayResults(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

function displayResults(data) {
  currentTemp.textContent = `${data.main.temp.toFixed(1)} ºC`;
  const iconSrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  const desc = data.weather[0].description;

  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

apiFetch();