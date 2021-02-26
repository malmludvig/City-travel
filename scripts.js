const searchButton = document.querySelector(".submit");

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

			console.log(data)
			drawWeather(data)

		})
}

function drawVenues(data) {

	//let venuesArray = [data.response.venues[0].name, data.response.venues[1].name, data.response.venues[2].name];

  var numbers = [0, 1, 2, 3, 4, 5];
  var x = numbers.map(myFunction)

  function myFunction(func){

  }


	let venuesArray = [{
		name: data.response.venues[0].name,
		address: data.response.venues[0].location.address
	}, {
		name: data.response.venues[1].name,
		address: data.response.venues[1].location.address
	}, {
		name: data.response.venues[2].name,
		address: data.response.venues[2].location.address,
	}, {
		name: data.response.venues[3].name,
		address: data.response.venues[3].location.address,
	}, {
		name: data.response.venues[4].name,
		address: data.response.venues[4].location.address,
	}, {
		name: data.response.venues[5].name,
		address: data.response.venues[5].location.address,
	}]
	console.log(venuesArray)


	if (document.getElementById('sortCheck').checked) {

		function sortAlphabetically(a, b) {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			return 0;
		}

		venuesArray.sort(sortAlphabetically);


	}

	document.getElementById('venueTag1').innerHTML = venuesArray[0].name + " <br>" + venuesArray[0].address;
	document.getElementById('venueTag2').innerHTML = venuesArray[1].name + " <br>" + venuesArray[1].address;
	document.getElementById('venueTag3').innerHTML = venuesArray[2].name + " <br>" + venuesArray[2].address;
	document.getElementById('venueTag4').innerHTML = venuesArray[3].name + " <br>" + venuesArray[3].address;
	document.getElementById('venueTag5').innerHTML = venuesArray[4].name + " <br>" + venuesArray[4].address;
	document.getElementById('venueTag6').innerHTML = venuesArray[5].name + " <br>" + venuesArray[5].address

}

function venuesFunction(searchInput) {

	const url2 = 'https://api.foursquare.com/v2/venues/search?near=' + searchInput + '&limit=10&client_id=MWUVZLCCQRKDNGXZRGGLIUVBW04U0ETEPAQPJZBE2X3QV2MR&client_secret=YF4IVTB1ZNP03GHZ2LB5XUIHRERLNYMFW32BNOSEOCZWZJTW&v=20210226'

	fetch(url2)
		.then(res => res.json())
		.then(function (data) {

			drawVenues(data)
			console.log(data)

		})
}

searchButton.addEventListener('click', function () {

	let searchInput = document.querySelector(".input_text").value;
	console.log(searchInput);

	if (!document.getElementById('onlyWeather').checked && !document.getElementById('onlyVenues').checked) {
		weatherFunction(searchInput);
		venuesFunction(searchInput);

	} else if (document.getElementById('onlyWeather').checked) {

		document.getElementById('venueTag1').innerHTML = "";
		document.getElementById('venueTag2').innerHTML = "";
		document.getElementById('venueTag3').innerHTML = "";
		weatherFunction(searchInput);

	} else if (document.getElementById('onlyVenues').checked) {

		document.getElementById('weatherTag').innerHTML = "";
		venuesFunction(searchInput);
	}

});

