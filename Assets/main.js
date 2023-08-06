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




var getCityData = function (city) {
    var city = $('#userInput').val();
    var APIKey = '6fda8e05fd463ff807e270df95f92c8d';
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


    fetch(queryURL)
        .then(function (response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayWeather(data, city);
                });
            } else {
                alert.apply('Error: ' + response.statusText);
            }
        })
        .catch(function(error) {
            alert('Unable to connect to Weather Geocoding API');
        });
};

var displayWeather = function(cityName, searchTerm) {
    if(cityName.length === 0) {
        city
    }
}

var userInput = document.querySelector('#userInput');

//Get the current date
var dateToday = dayjs();
$('#today').text(dateToday.format('D/MM/YYYY'));


//Array of searched cities
var previousCities = [];


$('.btn-primary').on('click', function() {
    var value = $('#userInput').val();

    getCityData(value);
    console.log(getCityData(value));

    previousCities.push(value);
    localStorage.setItem('Cities', previousCities);

    var buttonItem = document.createElement('button');
    $('#searched_cities_container').append(buttonItem);
    buttonItem.textContent = localStorage.getItem('Cities');
    
    
})
    

// Call functions


