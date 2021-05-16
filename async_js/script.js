'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


function renderCountry(data, className = '') {
	const html = `
	        <article class="country ${className}">
          <img class="country__img" src=${data.flag} />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${data.population}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
	`
	countriesContainer.insertAdjacentHTML('beforeend', html)
	// countriesContainer.style.opacity = 1
}

const countries = {}

function renderError(msg) {
	countriesContainer.insertAdjacentText('beforeend', msg)
	// countriesContainer.style.opacity = 1
}

function newCountryRequest(country) {
	const request = new XMLHttpRequest()
	// open it with the intended URL
	request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
	request.send()  // note this will SEND the request, this will fetch in the background and emit the LOAD event when it is done
	return request;
}

function newCountryRequestByAlpha(neighbor) {
	const request = new XMLHttpRequest()
	// open it with the intended URL
	let url = `https://restcountries.eu/rest/v2/alpha/${neighbor}`;
	request.open('GET', url)
	console.log(`making request for `, url)
	request.send()  // note this will SEND the request, this will fetch in the background and emit the LOAD event when it is done
	return request;
}

function getCountryData(country) {
	// create the XML request
	const request = newCountryRequest(country);

	// add an event listener to the request and listen for the 'load' event
	request.addEventListener('load', () => {
		const [data] = JSON.parse(request.responseText)  // now we have the data --> we want to look up the neighboring countries
		renderCountry(data);  // render the country

		const neighbors = data.borders
		console.log(`bordering countries: `, neighbors)
		if (neighbors) {
			for (let neighbor of neighbors) {
				if (neighbor in countries) continue  // skip neighbors that were already fetched
				const neighborRequest = newCountryRequestByAlpha(neighbor)
				neighborRequest.addEventListener('load', () => {
					let neighborData = JSON.parse(neighborRequest.responseText)
					console.log(`request is done | data: `, neighborData)
					renderCountry(neighborData, 'neighbour')
				})
			}
		}
	})
}

// getCountryData('usa');
// getCountryData('portugal');

// const request = fetch(`https://restcountries.eu/rest/v2/name/${country}`)
// const request = fetch(`https://restcountries.eu/rest/v2/name/france`)
// console.log(`request: `, request)


const doCountries = function (country) {
	fetchCountryData(country)
		.then(data => {
			if (data) {
				renderCountry(data)
				if (data.borders.length) {
					for (let neighbor of data.borders) {
						console.log(`getting `, neighbor)
						fetchCountryData(neighbor, 'neighbour')
							.then(data => renderCountry(data, 'neighbour'))
					}
				}
			}
		})
		.catch(err => {
			renderError(`Error when getting country data: ${err.message}`)
		})
}

// todo: add the promises to the global countries variable
const getJSON = function (url, errorMsg='Something went wrong') {
	return fetch(url)
		.then(res => {
			if (!res.ok) throw new Error(`${errorMsg} (${res.status})`)
			return res.json()  // when the response is successful it will have a json() method (async)
		})
}

const fetchCountryData = async function (country, role) {
	let url = `https://restcountries.eu/rest/v2/name/${country}`
	if (role === 'neighbour') url = `https://restcountries.eu/rest/v2/alpha/${country}`
	return getJSON(url, `The country '${country}' was not found`)
		.then(function (res) {
			let data = role === 'neighbour' ? res : res[0];
			return data
		})
		.catch(err => {
			console.log(`err: `, err)
			renderError(`Error when getting country data: ${err.message}`)
		})
		.finally(() => {
			countriesContainer.style.opacity = 1
		})
};

// fetchCountryData('france')
// fetchCountryData('usa')
// function listenAndDisableOnClick (btn) {
// }

const disableAndReEnable = el => {
	console.log(`disabling element`,)
	el.setAttribute('disabled', '')
	setTimeout(() => {
		console.log(`re-enabling button`,)
		el.removeAttribute('disabled')
	}, 3000)
}

// listenAndDisableOnClick(btn)
btn.addEventListener('click', function () {
	// document.removeEventListener('click', this)
	disableAndReEnable(btn)
	doCountries('nosuchcountry')
})
