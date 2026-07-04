// api key
var apiKey = "55d048eb52e87b7729121e14a43ccebf";
var city = "Nottingham";

// function to get weather data and display it
async function getAndDisplayWeather(cityName) {
    var data;

    // check if browser is online or offline
    if (navigator.onLine) {
        // online: fetch from php backend
        try {
            var response = await fetch("connection.php?q=" + cityName);
            data = await response.json();

            // check if we got valid data
            if (data && data[0]) {
                // save data to localStorage for offline use
                localStorage.setItem(cityName, JSON.stringify(data));
                console.log("Data saved to localStorage");

                // hide error and show weather
                document.getElementById("errorMsg").style.display = "none";
                displayWeather(data[0]);
            } else {
                document.getElementById("errorMsg").textContent = "City not found!";
                document.getElementById("errorMsg").style.display = "block";
            }
        } catch (error) {
            console.log("Error:", error);
            document.getElementById("errorMsg").textContent = "Error fetching weather data";
            document.getElementById("errorMsg").style.display = "block";
        }
    } else {
        // offline: get data from localStorage
        var savedData = localStorage.getItem(cityName);

        if (savedData) {
            data = JSON.parse(savedData);
            console.log("Using cached data from localStorage");

            document.getElementById("errorMsg").style.display = "none";
            displayWeather(data[0]);
        } else {
            document.getElementById("errorMsg").textContent = "No cached data available. Please go online.";
            document.getElementById("errorMsg").style.display = "block";
        }
    }
}

// function to display weather on the page
function displayWeather(data) {
    console.log("Displaying weather for:", data);

    // show city name and country
    document.getElementById("cityName").innerHTML = data.city + ", " + data.country;

    // show todays date
    var currentDate = new Date();
    document.getElementById("date").innerHTML = currentDate.toLocaleString();

    // show weather description
    document.getElementById("descText").innerHTML = data.main_weather;
    document.getElementById("condtition").innerHTML = data.description;

    // show weather icon from openweathermap
    var iconCode = data.icon;
    console.log("Icon code:", iconCode);

    if (iconCode) {
        var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        console.log("Icon URL:", iconUrl);

        var iconElement = document.getElementById("weatherIcon");
        iconElement.src = iconUrl;
        iconElement.style.display = "block";
    }

    // show temperature
    var temp = Math.round(data.temperature);
    document.getElementById("tempText").innerHTML = temp + "°C";

    // show extra info
    document.getElementById("humidityText").innerHTML = data.humidity;
    document.getElementById("windText").innerHTML = data.wind_speed;
    document.getElementById("windDirText").innerHTML = data.wind_deg;
    document.getElementById("pressureText").innerHTML = data.pressure;
}

// search button click event
document.getElementById("searchBtn").addEventListener("click", function() {
    var cityInput = document.getElementById("cityInput").value;
    if (cityInput != "") {
        getAndDisplayWeather(cityInput);
        document.getElementById("cityInput").value = "";
    }
});

// press enter to search
document.getElementById("cityInput").addEventListener("keypress", function(event) {
    if (event.key == "Enter") {
        var cityInput = document.getElementById("cityInput").value;
        if (cityInput != "") {
            getAndDisplayWeather(cityInput);
            document.getElementById("cityInput").value = "";
        }
    }
});

// load default city when page opens
getAndDisplayWeather(city);
