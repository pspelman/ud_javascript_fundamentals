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

const countryData = data => {
	return `
	        <article class="country">
          <img class="country__img" src=${data.flag} />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages}</p>
            <p class="country__row"><span>💰</span>${data.currency}</p>
          </div>
        </article>`
}
// add an event listener to the request and listen for the 'load' event
request.addEventListener('load', () => {
	const [data] = JSON.parse(request.responseText)
	console.log(`data: `, data)
	const html = countryData(data)
	countriesContainer.insertAdjacentHTML('beforeend', html)
	countriesContainer.style.opacity = 1
})
