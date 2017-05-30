function placesRequest(input) {
  let keyword = document.getElementById(input + "Airport");

  var request = {
    // location: start,
    // radius: '5000',
    type: 'airport',
    query: keyword.value
  };


  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, (results, status) => {
    console.log(results);
    console.log(status);
  });
}
