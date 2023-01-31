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
     zoom: 11
    });
    //search parameters
    let request = {
      location: orlando,
      keyword: 'Park with workout equipment',
      radius : '5000',
    };
    //looks for places using place api based on query
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }
  function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
  let infowindow = new google.maps.InfoWindow();
    for (let i  = 0; i < results.length; i++) {
      let pinPoint = results[i];
      const marker = new google.maps.Marker({
        position: pinPoint.geometry.location,
        map: map,
      }
      );
      marker.addListener("click", (event) => {
        console.log(pinPoint);
        infowindow.setContent(
         `
         <div>
         <p>${pinPoint.name}</p>
         </div>
         `
       )
       infowindow.open(map, marker);
     })
  }
}
  }
  /*const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: orlando,
  });      */
  // window.initMap()