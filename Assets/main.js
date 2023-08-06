var pastCities = document.querySelector('#searched_cities_container');
var userCity = document.querySelector('#userInput');
var forecastContainerEl = document.querySelector('#forecast-container');
var citySearchTerm = document.querySelector('#city-search-term');
var cities = [];



//Function that gets previously searched for cities
function pastCities() {
    var saved_cities = JSON.parse(localStorage.getItem('cities'));

    if(saved_cities !== null) {
        cities = saved_cities;
    }

    
}



//Function to save searched city
function saveCity() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

var city = $('#userInput').val();
var APIKey = '6fda8e05fd463ff807e270df95f92c8d';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;



// Call functions


