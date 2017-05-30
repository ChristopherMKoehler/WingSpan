function placesRequest() {
  var request = {
    location: pyrmont,
    radius: '500',
    types: ['airport']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
