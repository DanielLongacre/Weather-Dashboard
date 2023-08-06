var pastCities = document.querySelector('#searched_cities_container');
var cities = [];
var city = '';

//Hide forecast on initial page load
$(document).ready(function() {
    $('.today_weather').hide();
 });

//Function that gets previously searched for cities from local storage
function prevCities() {
    var saved_cities = JSON.parse(localStorage.getItem('cities'));

    if(saved_cities !== null) {
        cities = saved_cities;
    }
    prevCityBtns();
}


//Function to save searched city in local storage
function saveCity() {
    localStorage.setItem('cities', JSON.stringify(cities));
}


//Get previously searched for cities and create buttons for them
function prevCityBtns() {
    pastCities.innerHTML = '';
    if(cities == null) {
        return;
    }
    var diff_cities = [...new Set(cities)];
    for(var i = 0; i < diff_cities.length; i++) {
        var cityName = diff_cities[i];

        var btnEl = document.createElement('button');
        btnEl.textContent = cityName;
        btnEl.setAttribute('class', 'listBtn');

        pastCities.appendChild(btnEl);
        prevCityClick();
    }
}


//Click function for newly created previous city buttons
function prevCityClick() {
    $('.listBtn').on('click', function(event) {
        event.preventDefault();
        console.log("Does this work?");
        city = $(this).text().trim();
        APIcall();
        $('.today_weather').show();
    })
}

//Function to add user city to cities array
function userCity() {
    $('#searchbtn').on('click', function(event) {
        event.preventDefault();
        city = $(this).prev().val().trim();

        //Add city to array
        cities.push(city);

        //Don't let array be larger than 7
        if(cities.length > 7) {
            //Remove first item in array
            cities.shift()
        }

        //Return if blank
        if(city == '') {
            return;
        }

        APIcall();
        saveCity();
        prevCityBtns();
    })
    $('.today_weather').show();
}


//Function to get API data from 2 different URL's
function APIcall() {

    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var currentURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var APIKey = '&appid=6fda8e05fd463ff807e270df95f92c8d&units=imperial';
    var queryURL = url + city + APIKey;
    var current_weather_url = currentURL + city + APIKey;

    $('#name_of_city').text(city);

    //Data for 5 Day Forecast
    fetch(queryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var day_number = 0;

                //Iterate through weather data sets
                for(var i = 0; i < data.list.length; i++) {

                    if(data.list[i].dt_txt.split(" ")[1] == "09:00:00") {
                        let day = data.list[i].dt_txt.split("-")[2].split(" ")[0];
                        let year = data.list[i].dt_txt.split("-")[0];
                        let month = data.list[i].dt_txt.split("-")[1];
                        let temp = data.list[i].main.temp;
                        let wind = data.list[i].wind.speed;
                        $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
                        $("#" + day_number + "five_day_humidity").text("Humidity: " + data.list[i].main.humidity);
                        $("#" + day_number + "five_day_temp").text("Temp: " + temp + "F");
                        $("#" + day_number + "five_day_wind").text("Wind Speed: " + wind);
                        console.log(data.list[i].dt_txt.split("-"));
                        $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
                        console.log(data.list[i].main.temp);
                        console.log(day_number);
                        day_number++;
                    }

                }
            })
        }  
 
    })

    //Data for Current-Day Forecast
    fetch(current_weather_url).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data);
                let temp = data.main.temp;
                console.log("The temperature in " + city + " is: " + temp);
                $("#today_temp").text("Temperature: " + temp + String.fromCharCode(176)+"F");
                $("#today_humidity").text("Humidity: " + data.main.humidity);
                $("#today_wind_speed").text("Wind Speed: " + data.wind.speed);
                $("#today_icon_div").attr({"src": "http://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
                "height": "100px", "width":"100px"});
            })
        
        }

    })
}


// Call functions
prevCities();
prevCityClick();
userCity();