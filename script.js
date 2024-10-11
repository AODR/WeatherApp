const cities = [
    // Philippines
    "Manila, PH", "Quezon City, PH", "Caloocan, PH", "Davao City, PH", "Cebu City, PH", "Zamboanga City, PH",
    "Taguig, PH", "Antipolo, PH", "Pasig, PH", "Cagayan de Oro, PH",
    
    // United States
    "New York, US", "Los Angeles, US", "Chicago, US", "Houston, US", "Phoenix, US", "Philadelphia, US",
    "San Antonio, US", "San Diego, US", "Dallas, US", "San Jose, US",
    
    // France
    "Paris, FR", "Marseille, FR", "Lyon, FR", "Toulouse, FR", "Nice, FR", "Nantes, FR", "Strasbourg, FR",
    "Montpellier, FR", "Bordeaux, FR", "Lille, FR",
    
    // United Kingdom
    "London, GB", "Birmingham, GB", "Leeds, GB", "Glasgow, GB", "Sheffield, GB", "Bradford, GB",
    "Liverpool, GB", "Edinburgh, GB", "Manchester, GB", "Bristol, GB",
    
    // Australia
    "Sydney, AU", "Melbourne, AU", "Brisbane, AU", "Perth, AU", "Adelaide, AU", "Gold Coast, AU", 
    "Canberra, AU", "Newcastle, AU", "Wollongong, AU", "Hobart, AU",
    
    // Canada
    "Toronto, CA", "Montreal, CA", "Vancouver, CA", "Calgary, CA", "Edmonton, CA", "Ottawa, CA",
    "Winnipeg, CA", "Quebec City, CA", "Hamilton, CA", "Kitchener, CA",
    
    // Japan
    "Tokyo, JP", "Yokohama, JP", "Osaka, JP", "Nagoya, JP", "Sapporo, JP", "Fukuoka, JP", 
    "Kawasaki, JP", "Kyoto, JP", "Kobe, JP", "Saitama, JP",
    
    // Brazil
    "São Paulo, BR", "Rio de Janeiro, BR", "Brasília, BR", "Salvador, BR", "Fortaleza, BR", 
    "Belo Horizonte, BR", "Manaus, BR", "Curitiba, BR", "Recife, BR", "Porto Alegre, BR",
    
    // India
    "Mumbai, IN", "Delhi, IN", "Bangalore, IN", "Hyderabad, IN", "Ahmedabad, IN", "Chennai, IN",
    "Kolkata, IN", "Surat, IN", "Pune, IN", "Jaipur, IN",
    
    // South Africa
    "Johannesburg, ZA", "Cape Town, ZA", "Durban, ZA", "Pretoria, ZA", "Port Elizabeth, ZA",
    "Bloemfontein, ZA", "East London, ZA", "Soweto, ZA", "Pietermaritzburg, ZA", "Kimberley, ZA"
];

document.getElementById('cityInput').addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const suggestions = cities.filter(city => city.toLowerCase().includes(input));
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
    const cityCountry = document.getElementById('cityInput').value;
    getWeatherData(cityCountry);
});

async function getWeatherData(cityCountry) {
    const apiKey = 'fe7e04a4baf149bdefb3939ada5b8e94';  // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityCountry}&appid=${apiKey}&units=metric`;

    console.log(`Fetching weather data for: ${cityCountry}`);
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
        <h2>${data.name}, ${data.sys.country}</h2>
        <img src="${icon}" alt="${weatherCondition}">
        <p>${weatherCondition}</p>
        <p>Temperature: ${temp}°C</p>
    `;
}