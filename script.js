document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Fetch data for a given city
document.getElementById('fetch-data').addEventListener('click', () => {
  const city = document.getElementById('city').value.trim();
  const cityDataDiv = document.getElementById('city-data');
  const realTimeDataDiv = document.getElementById('data-display');
  const floodDataDiv = document.getElementById('flood-display');

  if (!city) {
      cityDataDiv.innerHTML = '<p>Please enter a city name.</p>';
      return;
  }

  // Clear previous content and show loading messages
  cityDataDiv.innerHTML = '<p>Loading data...</p>';
  realTimeDataDiv.innerHTML = '<p>Loading real-time data...</p>';
  floodDataDiv.innerHTML = '<p>Analyzing flood data...</p>';

  // Use a weather or disaster API to fetch data (example: OpenWeatherMap API)
  const apiKey = 'your_api_key_here'; // Replace with your actual API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.cod === 200) {
              // Update city data
              cityDataDiv.innerHTML = `
                  <p><strong>City:</strong> ${data.name}</p>
                  <p><strong>Temperature:</strong> ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                  <p><strong>Weather:</strong> ${data.weather[0].description}</p>
              `;

              // Update real-time data
              realTimeDataDiv.innerHTML = `
                  <p><strong>Real-Time Temperature:</strong> ${(data.main.temp - 273.15).toFixed(2)}°C</p>
                  <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
              `;

              // Update flood prediction (mocked for now)
              floodDataDiv.innerHTML = `
                  <p><strong>Flood Risk:</strong> Low</p>
                  <p><strong>Precipitation:</strong> ${(data.rain ? data.rain['1h'] : 0)} mm</p>
              `;
          } else {
              cityDataDiv.innerHTML = `<p>${data.message}</p>`;
              realTimeDataDiv.innerHTML = '';
              floodDataDiv.innerHTML = '';
          }
      })
      .catch(error => {
          cityDataDiv.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
          realTimeDataDiv.innerHTML = '';
          floodDataDiv.innerHTML = '';
      });
});