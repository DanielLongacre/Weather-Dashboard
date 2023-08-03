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
    var key = 'City';
    var value = $(this).parent().prev().children().val();
    localStorage.setItem(key, value);

    var listItem = document.createElement('li');
    $('#City').append(listItem);
    listItem.textContent = value;
    
})
    

});