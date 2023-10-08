// Define constants for API URL, API key, and references to HTML elements.
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const apiKey = 'bdb2b758ac96a293335d7309880217a2';
const weatherIcon = document.querySelector('.weather-icon');
const searchBtn = document.querySelector('.search');
const searchBox = document.querySelector('.city-input');

// Add an event listener to the search button to call the getWeather function when clicked.
searchBtn.addEventListener('click', () => {
    getWeather(searchBox.value);
})

// Async function to fetch and display weather data based on user input.
async function getWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Parse the JSON response.
    let data = await response.json();
    // console.log(data);

    // Check for invalid city (status code 404).
    if (response.status == 404) {
        alert('Invalid City Name! Returned Back to Default City');
        defaultCity();
    }

    // Update HTML elements with weather data.
    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp);
    document.querySelector('#humidity').innerHTML = data.main.humidity;
    document.querySelector('#speed').innerHTML = data.wind.speed;

    // Update weather icon based on weather condition.
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = './images/clouds.png';
            break;
        case 'Clear':
            weatherIcon.src = './images/clear.png';
            break;
        case 'Mist':
            weatherIcon.src = './images/mist.png';
            break;
        case 'Drizzle':
            weatherIcon.src = './images/drizzle.png';
            break;
        case 'Rain':
            weatherIcon.src = './images/rain.png';
            break;

        default:
            break;
    }
}

// Function to fetch and display weather data for the default city (Mumbai).
async function defaultCity() {
    const response = await fetch(apiUrl + 'Mumbai' + `&appid=${apiKey}`);

    // Parse the JSON response.
    let data = await response.json();

    // Update HTML elements with weather data.
    document.querySelector('#city').innerHTML = data.name;
    document.querySelector('#temp').innerHTML = Math.round(data.main.temp);
    document.querySelector('#humidity').innerHTML = data.main.humidity;
    document.querySelector('#speed').innerHTML = data.wind.speed;

    // Update weather icon based on weather condition.
    switch (data.weather[0].main) {
        case 'Clouds':
            weatherIcon.src = './images/clouds.png';
            break;
        case 'Clear':
            weatherIcon.src = './images/clear.png';
            break;
        case 'Mist':
            weatherIcon.src = './images/mist.png';
            break;
        case 'Drizzle':
            weatherIcon.src = './images/drizzle.png';
            break;
        case 'Rain':
            weatherIcon.src = './images/rain.png';
            break;

        default:
            break;
    }
}

// Call the defaultCity function to display weather data for the default city when the page loads.
defaultCity();
