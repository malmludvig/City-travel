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

function drawWeather(data) {
	var celcius = Math.round(parseFloat(data.main.temp) - 273.15);
	let iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
	document.getElementById('weatherTag').innerHTML = "<img src='" + iconUrl + "'<br><br>" + data.name + "<br>" + celcius + " °";

}

function weatherFunction(searchInput) {

	const url1 = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&appid=725df4167c36c97949a6fa606140db86'

	fetch(url1)
		.then(res => res.json())
		.then(function (data) {
			try {
				drawWeather(data)
			} catch (err) {
				alert("Error, something went wrong! See the console for more info.")
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

	const url2 = `https://api.foursquare.com/v2/venues/search?client_id=MWUVZLCCQRKDNGXZRGGLIUVBW04U0ETEPAQPJZBE2X3QV2MR&client_secret=YF4IVTB1ZNP03GHZ2LB5XUIHRERLNYMFW32BNOSEOCZWZJTW&near=${searchInput}&limit=6&v=20210226`

	fetch(url2)
		.then(res => res.json())
		.then(function (data) {

			console.log(data)
			try {
				drawVenues(data)
			} catch (err) {
				alert("Error, something went wrong! See the console for more info.")
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


		for (i = 0; i < 5; i++) {

			document.getElementById(`venueTag${i}`).innerHTML = "";
		}
		weatherFunction(searchInput);

	} else if (document.getElementById('onlyVenues').checked) {

		document.getElementById('weatherTag').innerHTML = "";
		venuesFunction(searchInput);
	}

});