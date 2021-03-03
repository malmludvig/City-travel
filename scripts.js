const searchButton = document.querySelector(".submit");

function sortAlphabetically(a, b) {

	a.name.toLowerCase(), b.name.toLowerCase();

	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

function dateOfToday() {

	let todaysDate = new Date();
	let dd = String(todaysDate.getDate()).padStart(2, '0');
	let mm = String(todaysDate.getMonth() + 1).padStart(2, '0');
	let yyyy = todaysDate.getFullYear();
	todaysDate = yyyy + mm + dd;
	return todaysDate
}

function drawWeather(data) {
	var celcius = Math.round(parseFloat(data.main.temp) - 273.15);
	let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
	document.getElementById('weatherTag').innerHTML = "<img src='" + iconUrl + "'<br><br>" + data.name + "<br>" + celcius + " °<br><span class='weatherDescriptionFont'>Condition: "+data.weather[0].description+"</span>";

}

function weatherFunction(searchInput) {

	let apiKey = "725df4167c36c97949a6fa606140db86"
	const apiURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}`

	fetch(apiURLWeather)
		.then(res => res.json())
		.then(function (data) {
			try {
				drawWeather(data)
			} catch (err) {
				alert("Error, something went wrong with the Openweather API! See the console for more info.")
				console.log(err)
			}
		})
}

function drawVenues(data) {

	let venuesArray = data.response.venues.map(function (venue) {
		return {
			key: venue,
			name: venue.name,
			address: venue.location.address,
			iconPrefix: venue.categories[0].icon.prefix,
			iconSuffix: venue.categories[0].icon.suffix
		}
	});


	if (document.getElementById('sortCheck').checked) {

		venuesArray.sort(sortAlphabetically);
	}


	for (i = 0; i < venuesArray.length; i++) {

		iconUrl = venuesArray[i].iconPrefix + "64" + venuesArray[i].iconSuffix;
		document.getElementById(`venueTag${i}`).innerHTML = "<img src='" + iconUrl + "'<br><br>" + venuesArray[i].name + " <br> <span class='venueAddressFont'>" + venuesArray[i].address + "</span>";
	}
}

function venuesFunction(searchInput) {

	let todaysDate = dateOfToday()
			   
	let apiKey = "MWUVZLCCQRKDNGXZRGGLIUVBW04U0ETEPAQPJZBE2X3QV2MR"
	let apiSecret = "YF4IVTB1ZNP03GHZ2LB5XUIHRERLNYMFW32BNOSEOCZWZJTW"
	const apiURLVenues = `https://api.foursquare.com/v2/venues/search?client_id=${apiKey}&client_secret=${apiSecret}&near=${searchInput}&limit=6&v=${todaysDate}`

	fetch(apiURLVenues)
		.then(res => res.json())
		.then(function (data) {

			try {
				drawVenues(data)
			} catch (err) {
				alert("Error, something went wrong with the FourSquare API! See the console for more info.")
				console.log(err)
			}
		})
}

searchButton.addEventListener('click', function () {

	let searchInput = document.querySelector(".input_text").value;
	console.log(searchInput);

	if (!document.getElementById('onlyWeather').checked && !document.getElementById('onlyVenues').checked) {
		weatherFunction(searchInput);
		venuesFunction(searchInput);

	} else if (document.getElementById('onlyWeather').checked) {

		for (i = 0; i < 6; i++) {

			document.getElementById(`venueTag${i}`).innerHTML = "";
		}
		weatherFunction(searchInput);

	} else if (document.getElementById('onlyVenues').checked) {

		document.getElementById('weatherTag').innerHTML = "";
		venuesFunction(searchInput);
	}

});