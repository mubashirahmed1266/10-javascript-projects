// Weather Data
const weatherData = {

    Lahore: {
        temperature: 28,
        condition: "Sunny",
        icon: "☀️",
        humidity: 45,
        windSpeed: 12,
        feelsLike: 30,

        forecast: [
            { day: "Monday", icon: "☀️", temp: 29, condition: "Sunny" },
            { day: "Tuesday", icon: "🌤️", temp: 27, condition: "Partly Cloudy" },
            { day: "Wednesday", icon: "🌧️", temp: 24, condition: "Rainy" },
            { day: "Thursday", icon: "⛅", temp: 26, condition: "Cloudy" },
            { day: "Friday", icon: "☀️", temp: 30, condition: "Sunny" }
        ]
    },

    Karachi: {
        temperature: 32,
        condition: "Cloudy",
        icon: "☁️",
        humidity: 65,
        windSpeed: 18,
        feelsLike: 35,

        forecast: [
            { day: "Monday", icon: "☁️", temp: 32, condition: "Cloudy" },
            { day: "Tuesday", icon: "☀️", temp: 33, condition: "Sunny" },
            { day: "Wednesday", icon: "🌤️", temp: 31, condition: "Partly Cloudy" },
            { day: "Thursday", icon: "🌧️", temp: 29, condition: "Rainy" },
            { day: "Friday", icon: "☀️", temp: 34, condition: "Sunny" }
        ]
    },

    Islamabad: {
        temperature: 25,
        condition: "Rainy",
        icon: "🌧️",
        humidity: 70,
        windSpeed: 10,
        feelsLike: 24,

        forecast: [
            { day: "Monday", icon: "🌧️", temp: 24, condition: "Rainy" },
            { day: "Tuesday", icon: "☁️", temp: 25, condition: "Cloudy" },
            { day: "Wednesday", icon: "☀️", temp: 28, condition: "Sunny" },
            { day: "Thursday", icon: "🌤️", temp: 26, condition: "Partly Cloudy" },
            { day: "Friday", icon: "🌧️", temp: 23, condition: "Rainy" }
        ]
    },

    Peshawar: {
        temperature: 29,
        condition: "Sunny",
        icon: "☀️",
        humidity: 75,
        windSpeed: 15,
        feelsLike: 17,

        forecast: [
            { day: "Monday", icon: "☁️", temp: 24, condition: "Cloudy" },
            { day: "Tuesday", icon: "🌧️", temp: 21, condition: "Rainy" },
            { day: "Wednesday", icon: "🌤️", temp: 23, condition: "Partly Cloudy" },
            { day: "Thursday", icon: "☀️", temp: 28, condition: "Sunny" },
            { day: "Friday", icon: "☁️", temp: 24, condition: "Cloudy" }
        ]
    }

};


// DOM Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");

const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");

const forecastContainer = document.getElementById("forecastContainer");

// Display Current Weather

function displayWeather(city) {

    const weather = weatherData[city];

    if (!weather) {
        alert("City not found! Please enter a valid city.");
        return;
    }

    // Update City Name
    cityName.textContent = city;

    // Update Temperature
    temperature.textContent = `${weather.temperature}°C`;

    // Update Weather Icon
    weatherIcon.textContent = weather.icon;

    // Update Weather Condition
    weatherCondition.textContent = weather.condition;

    // Update Humidity
    humidity.textContent = `${weather.humidity}%`;

    // Update Wind Speed
    windSpeed.textContent = `${weather.windSpeed} km/h`;

    // Update Feels Like
    feelsLike.textContent = `${weather.feelsLike}°C`;

}


// Search City Functionality

function searchCity() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    // Find City Without Case Sensitivity
    const matchedCity = Object.keys(weatherData).find(
        name => name.toLowerCase() === city.toLowerCase()
    );

    if (matchedCity) {
        displayWeather(matchedCity);
        cityInput.value = "";
    } else {
        alert("City not found! Please try another city.");
    }

}


// Search Button Event
searchBtn.addEventListener("click", searchCity);


// Enter Key Event
cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchCity();
    }

});


// Default Weather
displayWeather("Lahore");


// Display 5-Day Weather Forecast

function displayForecast(city) {

    // Get Selected City's Forecast
    const forecastData = weatherData[city].forecast;

    // Clear Previous Forecast
    forecastContainer.innerHTML = "";

    // Generate Forecast Cards
    forecastData.forEach(function(day) {

        const forecastCard = document.createElement("div");

        forecastCard.classList.add("forecast-card");

        forecastCard.innerHTML = `
            <h3>${day.day}</h3>

            <div class="forecast-icon">
                ${day.icon}
            </div>

            <p class="forecast-temp">
                ${day.temp}°C
            </p>

            <p class="forecast-condition">
                ${day.condition}
            </p>
        `;

        forecastContainer.appendChild(forecastCard);

    });

}


// Update your existing displayWeather() function:


function displayWeather(city) {

    const weather = weatherData[city];

    if (!weather) {
        alert("City not found!");
        return;
    }

    cityName.textContent = city;
    temperature.textContent = `${weather.temperature}°C`;
    weatherIcon.textContent = weather.icon;
    weatherCondition.textContent = weather.condition;

    humidity.textContent = `${weather.humidity}%`;
    windSpeed.textContent = `${weather.windSpeed} km/h`;
    feelsLike.textContent = `${weather.feelsLike}°C`;

    // Display 5-Day Forecast
    displayForecast(city);

}


// Improved Search City Function

function searchCity() {

    const city = cityInput.value.trim();

    // Empty Input Validation
    if (city === "") {
        alert("Please enter a city name!");
        cityInput.focus();
        return;
    }

    // Find Matching City
    const matchedCity = Object.keys(weatherData).find(
        name => name.toLowerCase() === city.toLowerCase()
    );

    // Check City Availability
    if (!matchedCity) {
        alert("City not found! Please try Lahore, Karachi, Islamabad or London.");
        cityInput.focus();
        return;
    }

    // Display Selected City Weather
    displayWeather(matchedCity);

    // Clear Input
    cityInput.value = "";

}


// Search Button Event
searchBtn.addEventListener("click", searchCity);


// Enter Key Event
cityInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchCity();
    }

});


// Load Default Weather
displayWeather("Lahore");

