const cities = [
    "Manila", "Quezon City", "Caloocan", "Davao City", "Cebu City", "Zamboanga City", 
    "Taguig", "Antipolo", "Pasig", "Cagayan de Oro", "Parañaque", "Dasmariñas", 
    "Valenzuela", "Las Piñas", "Bacolod", "Makati", "General Santos", "Bacoor", 
    "Muntinlupa", "San Juan", "Iloilo City", "Malabon", "Mandaluyong", 
    "Navotas", "Marikina", "Pasay", "Angeles", "Lapu-Lapu", "Imus", "Olongapo", 
    "Biñan", "Santa Rosa", "Butuan", "Tagum", "Calamba", "San Pablo", "Tarlac City", 
    "Meycauayan", "Cabanatuan", "San Fernando", "Lucena", "Baybay", "Ormoc", 
    "Tacloban", "Cotabato City", "Kidapawan", "Koronadal", "Dipolog", "Pagadian", 
    "Iligan", "Ozamis", "Roxas", "Dagupan", "Santiago", "Tuguegarao", "Vigan", 
    "Laoag", "Baguio", "San Carlos", "Silay", "Talisay", "Cadiz", "Escalante", 
    "Himamaylan", "Kabankalan", "La Carlota", "Sagay", "Sipalay", "Victorias"
];

document.getElementById('cityInput').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestions = cities.filter(city => city.toLowerCase().startsWith(input));
    updateCityList(suggestions);
});

function updateCityList(suggestions) {
    const dataList = document.getElementById('cityList');
    dataList.innerHTML = '';  // Clear previous suggestions
    suggestions.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        dataList.appendChild(option);
    });
}

// Fetch and display weather data when a city is selected
document.getElementById('weatherForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    const apiKey = 'fe7e04a4baf149bdefb3939ada5b8e94';  // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather data for: ${city}`);
    console.log(`URL: ${url}`);

    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').textContent = '';
    document.getElementById('weatherDisplay').innerHTML = '';

    try {
        const response = await fetch(url);
        console.log(`Response status: ${response.status}`);
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized: Invalid API key');
            } else if (response.status === 404) {
                throw new Error('City not found');
            } else {
                throw new Error('An error occurred while fetching the weather data');
            }
        }
        const data = await response.json();
        console.log('Weather data:', data);
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('error').textContent = 'Error: ' + error.message;
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    const temp = data.main.temp;
    const weatherCondition = data.weather[0].description;
    const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDisplay.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${icon}" alt="${weatherCondition}">
        <p>${weatherCondition}</p>
        <p>Temperature: ${temp}°C</p>
    `;
}