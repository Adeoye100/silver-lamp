document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "64a4704b26d8e08d3a10e60bafccea2e";
  const weatherContainer = document.getElementById("weather-container");

  const searchBtn = document.getElementById("search-btn");
  const cityInput = document.getElementById("city-input");

  // Default cities to display (modified as requested)
  const defaultCities = ["Lagos,NG", "Ilorin,NG", "Abuja,NG", "London,GB"];

  // Fetch weather for default city (Lagos)
  fetchWeather("Lagos,NG", apiKey);

  // Fetch weather for multiple cities
  fetchMultipleCities(apiKey);

  searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city, apiKey);
    }
  });

  cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeather(city, apiKey);
      }
    }
  });
});

// Fetch weather for multiple cities
function fetchMultipleCities(apiKey) {
  const container = document.getElementById("multi-city-container");
  const cities = ["Lagos,NG", "Ilorin,NG", "Abuja,NG", "London,GB"];

  cities.forEach((city) => {
    fetchWeatherForMultiCity(city, apiKey, container);
  });
}

// Function to fetch weather for individual city in multi-city display
function fetchWeatherForMultiCity(city, apiKey, container) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not fetch data for ${city}`);
      }
      return response.json();
    })
    .then((data) => {
      const cityCard = document.createElement("div");
      cityCard.className = "col-md-6 col-lg-3 mb-3";
      cityCard.innerHTML = `
        <div class="city-card">
          <div class="h5">${data.name}, ${data.sys.country}</div>
          <div class="h4">${Math.round(data.main.temp)}°C</div>
          <div>${data.weather[0].description}</div>
          <img src="https://openweathermap.org/img/wn/${
            data.weather[0].icon
          }.png" 
               alt="${data.weather[0].description}">
        </div>
      `;
      container.appendChild(cityCard);
    })
    .catch((error) => {
      console.error(`Error fetching weather for ${city}:`, error);
      // Optionally show error message in the UI
    });
}

// Existing functions (keep these unchanged)
function fetchWeather(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert(
        "Error fetching weather data. Please check the city name and try again."
      );
    });
}

function displayWeather(data) {
  document.getElementById(
    "location"
  ).textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").textContent = `${Math.round(
    data.main.temp
  )}°C`;
  document.getElementById("desc").textContent = data.weather[0].description;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `Wind: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weather-icon").src = iconUrl;

  changeBackground(data.weather[0].main);
}

function changeBackground(weatherCondition) {
  const backgrounds = {
    Clear: "img/bg.jpg",
    Clouds: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5",
    Rain: "https://images.unsplash.com/photo-1534274988757-a28bf1cb57ef",
    Snow: "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    Thunderstorm: "https://images.unsplash.com/photo-1562155618-e1a8bc2eb04f",
  };

  const defaultBg = "img/sky.jpg";
  const bgUrl = backgrounds[weatherCondition] || defaultBg;

  document.body.style.backgroundImage = `url(${bgUrl})`;
}
