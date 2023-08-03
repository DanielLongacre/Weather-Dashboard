// Function to ensure that the code isn't run until 
// the browser has finished rendering all the elements
// in the html
$(function() {


//Global Variables
var userInput = document.querySelector('#userInput');
// var ulEl = document.querySelector('#searchedCities');


//Array of searched cities
var previousCities = [];


$('.btn-primary').on('click', function() {
    var value = $('#userInput').val();
    console.log(previousCities);
    previousCities.push(value);
    localStorage.setItem('Cities', previousCities);
    console.log(previousCities)

    for(var i = 0; i < previousCities.length; i++) {
        var buttonItem = document.createElement('button');
        $('#searched_cities_container').append(buttonItem);
        buttonItem.textContent = previousCities[i];
    }
    
    
})
    

});