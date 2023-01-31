//LETS THE DOCUMENT LOAD BEFORE RUNNING FUNCTION
$('document').ready(function() {

  $("#btn").click(function(e) {
    e.preventDefault();
      //NEED TO GET THE INFO SUBMISSION 
      let location = $("#searchLocation").val();
      let distance = $("#Distance").val();//for future development
      let schedule = $("#schedule").val();//for future development
      //WHEN ITS EMPTY
      $("#searchLocation").val(" ");
      $("#Distance").val(" ");//for future development
      $("#schedule").val(" ");//for future development

      //GONNA NEED A FUNCTION TO TAKE INFO AND REDIRECT INTO MAP.HTML 
      localStorage.setItem("city", location);
      let storedLocation = localStorage.getItem("city", location);
      console.log(storedLocation);

      let qString = './map.html?q=' + location;
      document.location.assign(qString);

  })

});

$('document').ready(function() {

  let storedLocation = localStorage.getItem("city", location);
  setTimeout(getWeather(storedLocation), 1000);

 $('#btn2').click(function(e){
    e.preventDefault();
    localStorage.clear();
    $("#current-weather1").html("");

    let location = $("#searchLocation2").val();
    localStorage.setItem("city", location);
    let storedLocation = localStorage.getItem("city", location);

    getWeather(storedLocation);

 });

function getWeather(location) {

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
  let date = $("<h2>").addClass("text-xl bold").text("Current Weather Today: " + new Date().toLocaleDateString());
  let imgDiv =$("<div>").addClass("flex justify-center");
  let icon = $("<img>").addClass("w-[100px] h-[100px]").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
  let weatherDiv = $("<div>").addClass("flex flex-col text-center justify-center my-5");
  let temp = $("<p>").addClass("text-lg").text("Temperature: " + fTemp + " F");
  let humidity = $("<p>").addClass("text-lg").text("Humidity: " + data.main.humidity + "%");
  let wind = $("<p>").addClass("text-lg").text("Wind Speed: " + data.wind.speed + " mph");
  let cityName = $("<h1>").addClass("text-2xl bold").text(data.name);
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
  imgDiv.append(icon);
  weatherDiv.append(cityName, date, imgDiv, temp, humidity, wind);
  $("#current-weather1").append(weatherDiv);

  });
}

});




