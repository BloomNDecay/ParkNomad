// var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// document.getElementById("button")

// document.addEventListener("click",function(e) {
  
//   console.log("e");

// })


//LETS THE DOCUMENT LOAD BEFORE RUNNING FUNCTION
$('document').ready(function() {
  $("#btn").click(function(e) {
    e.preventDefault();
      //NEED TO GET THE INFO SUBMISSION 
      let location = $("#searchLocation").val();
      let distance = $("#Distance").val();
      let schedule = $("#schedule").val();
      //WHEN ITS EMPTY
      $("#searchLocation").val(" ");
      $("#Distance").val(" ");
      $("#schedule").val(" ");

      // console.log(location, distance, schedule);
      //GONNA NEED A FUNCTION TO TAKE INFO AND REDIRECT INTO MAP.HTML 
      //displayMap(location, distance, schedule);
      getWeather(location);

  })

  //FUNCTION TO DISPLAY MAP
  // function displayMap(location, distance, schedule) {
  //   let mapPage = "map.html";
  //   document.location.replace(mapPage);

  //   getWeather(location);

  // }



function getWeather(location) {

  // let mapPage = "map.html";
  // document.location.replace(mapPage);
  
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=6b490bf0f6476248bee4dafc71b2b9a1",
    dataType: "json",
  }).then(function(data){
    console.log(data);
  

  //NEED TO GET COORDS FOR LOCATION
  let lon = data.coord.lon;
  let lat = data.coord.lat;

  //GAVE ME TAMP IN KELVIN NEED TO CONVERT TO F
  let kelvinToF= (data.main.temp - 273.15) * 9/5 + 32;
  let fTemp = kelvinToF.toFixed(2);

  //GETTING TODAYS DATE
  let date = $("<h1>").addClass("text-xl bold").text("Current Weather Today: " + new Date().toLocaleDateString());
  let icon = $("<img>").addClass("w-full").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  let weatherDiv = $("<div>").addClass("flex flex-col text-center");
  let temp = $("<p>").addClass("text-lg").text("Temperature: " + fTemp);
  let humidity = $("<p>").addClass("text-lg").text("Humidity: " + data.main.humidity);
  let wind = $("<p>").addClass("text-lg").text("Wind Speed: " + data.wind.speed);
  
  //console.log(lon, lat, date, humidity, wind, fTemp);
  //NEED ANOTHER CALL TO GET WEATHER INFO WITH NAME WITH COORDS I GOT EARLIER
  $.ajax({
    type: "GET",
    url : "https://api.openweathermap.org/data/2.5/uvi?appid=6b490bf0f6476248bee4dafc71b2b9a1&lat=" + lat + "&lon=" + lon,
    dataType : "json",
  }).then(function(response){
    console.log(response);
  });
  //NEED TO APPEND THE NEW ELEMENTS
  date.append(icon);
  weatherDiv.append(date, temp, humidity, wind);
  $("#current-weather1").append(weatherDiv);

  });
}






});