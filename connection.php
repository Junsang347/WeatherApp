<?php
// telling the browser that we are sending JSON data back
header('Content-Type: application/json');

// database connection details (for xampp)
$server = "localhost";
$username = "if0_42333694";
$password = "45gcP7QTaNrrgJ";
$database = "if0_42333694_weatherapp";

// connect to database
$conn = mysqli_connect($server, $username, $password, $database);

// check if connection worked
if (!$conn) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// get city from the url
$city = isset($_GET['q']) ? mysqli_real_escape_string($conn, $_GET['q']) : "Nottingham";

// api key
$apiKey = "55d048eb52e87b7729121e14a43ccebf";

// call the openweathermap api
$url = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&appid=" . $apiKey . "&units=metric";

$json = @file_get_contents($url);

if (!$json) {
    echo json_encode(["error" => "Could not connect to weather API"]);
    exit;
}

$data = json_decode($json, true);

// check if city was found
if (!isset($data["main"])) {
    echo json_encode(["error" => "City not found"]);
    exit;
}

// get the weather data from api response
$cityName = $data["name"];
$country = $data["sys"]["country"];
$mainWeather = $data["weather"][0]["main"];
$description = $data["weather"][0]["description"];
$icon = $data["weather"][0]["icon"];
$temperature = $data["main"]["temp"];
$humidity = $data["main"]["humidity"];
$pressure = $data["main"]["pressure"];
$windSpeed = $data["wind"]["speed"];
$windDeg = isset($data["wind"]["deg"]) ? $data["wind"]["deg"] : 0;

// save to database
$sql = "INSERT INTO weather (city, country, main_weather, description, icon, temperature, humidity, pressure, wind_speed, wind_deg)
        VALUES ('$cityName', '$country', '$mainWeather', '$description', '$icon', $temperature, $humidity, $pressure, $windSpeed, $windDeg)";

mysqli_query($conn, $sql);

// send data back to javascript as json array
$result = [
    [
        "city" => $cityName,
        "country" => $country,
        "main_weather" => $mainWeather,
        "description" => $description,
        "icon" => $icon,
        "temperature" => $temperature,
        "humidity" => $humidity,
        "pressure" => $pressure,
        "wind_speed" => $windSpeed,
        "wind_deg" => $windDeg
    ]
];

echo json_encode($result);

// close connection
mysqli_close($conn);
?>