
//https://api.foursquare.com/v2/venues/search?near=göteborg&client_id=MWUVZLCCQRKDNGXZRGGLIUVBW04U0ETEPAQPJZBE2X3QV2MR&client_secret=YF4IVTB1ZNP03GHZ2LB5XUIHRERLNYMFW32BNOSEOCZWZJTW&v=20210220

fetch('https://api.openweathermap.org/data/2.5/weather?id=2643743&appid=725df4167c36c97949a6fa606140db86')
.then(res => res.json())
.then(function(data){

  console.log(data)
  drawWeather(data)
  //console.log(celcius + ' degrees in ' + data.name);

}
)

function drawWeather(data) {
var celcius = Math.round(parseFloat(data.main.temp)-273.15);
document.getElementById('weatherTag').innerHTML = data.name + "<br>" + celcius + " &deg";


}