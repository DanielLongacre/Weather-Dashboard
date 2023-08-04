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
    previousCities.push(value);
    localStorage.setItem('Cities', previousCities);

    var buttonItem = document.createElement('button');
    $('#searched_cities_container').append(buttonItem);
    buttonItem.textContent = localStorage.getItem('Cities');
    
    
})
    

});