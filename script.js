// Smooth scroll for navbar links
document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
      }
  });
});

// Hamburger Menu Toggle (if exists)
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
if (hamburger) {
  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
  });
}

// Fetch city weather and update UI
document.getElementById('fetch-data').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  const cityDataDiv = document.getElementById('city-data');
  const realTimeDataDiv = document.getElementById('data-display');
  const floodDataDiv = document.getElementById('flood-display');
  const weatherDisplayDiv = document.getElementById('weather-display');

  if (!city) {
      cityDataDiv.innerHTML = '<p>Please enter a city name.</p>';
      return;
  }

  // Show loading placeholders
  cityDataDiv.innerHTML = '<p>Loading city data...</p>';
  realTimeDataDiv.innerHTML = '<p>Loading real-time data...</p>';
  floodDataDiv.innerHTML = '<p>Analyzing flood risk...</p>';
  weatherDisplayDiv.innerHTML = '<p>Fetching weather prediction...</p>';

  const apiKey = 'f00c38e0279b7bc85480c3fe775d518c'; // 🔁 Replace this with your actual OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
      .then(response => {
          if (!response.ok) throw new Error('City not found');
          return response.json();
      })
      .then(data => {
          const { name, main, weather, wind, rain } = data;

          // City Data
          cityDataDiv.innerHTML = `
              <h3>📍 ${name}</h3>
              <p><strong>Temperature:</strong> ${main.temp.toFixed(1)}°C</p>
              <p><strong>Weather:</strong> ${weather[0].description}</p>
          `;

          // Real-Time Data
          realTimeDataDiv.innerHTML = `
              <p><strong>Temperature:</strong> ${main.temp.toFixed(1)}°C</p>
              <p><strong>Humidity:</strong> ${main.humidity}%</p>
              <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
          `;

          // Weather Prediction (Simple Summary)
          weatherDisplayDiv.innerHTML = `
              <p><strong>Forecast:</strong> ${weather[0].main}</p>
              <p><strong>Description:</strong> ${weather[0].description}</p>
          `;

          // Flood Prediction (Mocked Based on Rainfall)
          const precipitation = rain && rain['1h'] ? rain['1h'] : 0;
          let floodRisk = 'Low';
          if (precipitation > 5) floodRisk = 'Moderate';
          if (precipitation > 15) floodRisk = 'High';

          floodDataDiv.innerHTML = `
              <p><strong>Flood Risk:</strong> ${floodRisk}</p>
              <p><strong>Precipitation (last 1h):</strong> ${precipitation} mm</p>
          `;
      })
      .catch(err => {
          console.error(err);
          cityDataDiv.innerHTML = `<p>Error: Could not fetch data for "${city}".</p>`;
          realTimeDataDiv.innerHTML = '';
          weatherDisplayDiv.innerHTML = '';
          floodDataDiv.innerHTML = '';
      });
});