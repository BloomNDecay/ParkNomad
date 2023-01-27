// First allow map to display markers/Parks
// Allow marker to display parks with workout stations within a radius of 5000 (show in Orlando)
// Click the park for more 
// Initialize and add map
let map;
let service;
let place;

function initMap() {
  // The location of Orlando
  const orlando = new google.maps.LatLng(28.5383, -81.3792);
  map = new google.maps.Map(document.getElementById("map"), {
    center: orlando,
     zoom: 12
    });
    //search parameters
    let request = {
      location: orlando,
      keyword: 'Park with workout equipment',
      radius : '5000',
    };
    //looks for places using place api based on query
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request,
  (results, status) => {
console.log(results, status);
  if (status == google.maps.places.PlacesServiceStatus.OK) { 
    console.log(results, status);
    for (var i  = 0; i < results.length; i++) {
      const marker = new google.maps.Marker({
        position: results[i].geometry.location,
        map: map,
      });
      console.log(marker);
    }
    }
})
}


 
  /*const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: orlando,
  });      */

//window.initMap = initMap;

document.getElementById("button")

document.addEventListener("click",function(e) {
  
  console.log("e");

})

