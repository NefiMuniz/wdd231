const weatherInfo = document.getElementById('weather-info');
// SSA coords
const lat = -12.98;
const lon = -38.50;
const apiKey = ProcessingInstruction.env.WEATHER_API_KEY;
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayWeather(data) {
  const temperature = Math.round(data.main.temp);
  const weatherEvents = data.weather.map(event => {
    return event.description
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  }).join(', ');

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherInfo.innerHTML = `
  <div class="weather-card">
    <img src="${iconUrl}" alt="${weatherEvents}">
    <p><strong>Current Temperature:</strong> ${temperature}ºC</p>
    <p><strong>Weather:</strong> ${weatherEvents}</p>
  </div>
  `;
}

fetchWeather();