'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
console.log(`this is some stuff`, )

// create the XML request
const request = new XMLHttpRequest()

// open it with the intended URL
request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal')
request.send()  // note this will SEND the request, this will fetch in the background and emit the LOAD event when it is done

// add an event listener to the request and listen for the 'load' event
request.addEventListener('load', () => {
	console.log(`res: `, request.responseText)
})
