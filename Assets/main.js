var pastCities = document.querySelector('#searched_cities_container');
var cities = [];
var city = '';
var APIKey = '6fda8e05fd463ff807e270df95f92c8d';
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


//Function that gets previously searched for cities
function pastCities() {
    var saved_cities = JSON.parse(localStorage.getItem('cities'));

    if(saved_cities !== null) {
        cities = saved_cities
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

    }
}


//Click function for newly created previous city buttons
function prevCityClick() {
    $('listBtn').on('click', function(event) {
        event.preventDefault();
        console.log("Does this work?");
        city = $(this).text().trim();

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
        if(citites.length > 7) {
            cities.shift()
        }

        //Return if blank
        if(city == '') {
            return;
        }

        saveCity();
        prevCityBtns()
    })
}





// Call functions


