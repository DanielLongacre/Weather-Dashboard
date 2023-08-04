// Function to ensure that the code isn't run until 
// the browser has finished rendering all the elements
// in the html
$(function() {


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

function displayWeather() {
    
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
    

});