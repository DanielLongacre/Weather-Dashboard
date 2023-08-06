var pastCities = document.querySelector('#searched_cities_container');
var cities = [];
var city = '';


//Function that gets previously searched for cities
function prevCities() {
    var saved_cities = JSON.parse(localStorage.getItem('cities'));

    if(saved_cities !== null) {
        cities = saved_cities;
    }
    prevCityBtns();
}


//Function to save searched city
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
    $('listBtn').on('click', function(event) {
        event.preventDefault();
        console.log("Does this work?");
        city = $(this).text().trim();
        APIcall();
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
            cities.shift()
        }

        //Return if blank
        if(city == '') {
            return;
        }

        APIcall();
        saveCity();
        prevCityBtns()
    })
}


//Function to get API data
function APIcall() {

    var url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    var currentURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var APIKey = '&appid=6fda8e05fd463ff807e270df95f92c8d';
    var queryURL = url + city + APIKey;
    current_weather_url = currentURL + city + APIKey;

    $('#name_of_city').text(city);

    fetch(queryURL).then(function(response) {
        var day_number = 0;

        //Iterate through weather data sets
        for(var i = 0; i < response.list.length; i++) {
            let day = response.list[i].dt_txt.split("-")[2].split(" ")[0];
            let month = response.list[i].dt_txt.split("-")[1];
            let year = response.list[i].dt_txt.split("-")[0];
            $("#" + day_number + "date").text(month + "/" + day + "/" + year); 
            let temp = Math.round(((response.list[i].main.temp - 273.15) *9/5+32));
            $("#" + day_number + "five_day_temp").text("Temp: " + temp + String.fromCharCode(176)+"F");
            $("#" + day_number + "five_day_humidity").text("Humidity: " + response.list[i].main.humidity);
            $("#" + day_number + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
            console.log(response.list[i].dt_txt.split("-"));
            console.log(day_number);
            console.log(response.list[i].main.temp);
            day_number++; 
        }

    })


}


// Call functions
prevCities();
prevCityClick();
userCity();