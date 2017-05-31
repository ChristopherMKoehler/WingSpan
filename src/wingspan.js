var coordinates = {
  "to": null,
  "from": null
};
var currentResults = {};
var service = new google.maps.places.PlacesService(map);
var markers = [];
var flightPath = null;

$(document).ready(() => {
  $(`.results-to`).hide();
  $(`.results-from`).hide();

  $(".distance-form").submit(e => {
    e.preventDefault();
    markers.map(mark => mark.setMap(null));
    markers = [];

    if(flightPath != null) {
      flightPath.setMap(null);
    }

    if(coordinates["to"] != null && coordinates["from"] != null) {
      markers.push(new google.maps.Marker({
        position: {lat: coordinates["to"][0], lng: coordinates["to"][1]},
        map: map
      }));

      markers.push(new google.maps.Marker({
        position: {lat: coordinates["from"][0], lng: coordinates["from"][1]},
        map: map
      }));

      flightPath = new google.maps.Polyline({
        path: markers.map(mrk => mrk.getPosition()),
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      flightPath.setMap(map);
      getDistance(coordinates["to"], coordinates["from"]);
    }
  })
})

function placesRequest(input) {
  currentResults = {};
  let keyword = document.getElementById(input + "Airport");

  var request = {
    type: 'airport',
    query: keyword.value
  };



  service.textSearch(request, (results, status) => {
    $(`.results-${input} ul`).html("");

    for(let i = 0; i < 3; i++) {
      if(results[i] === undefined) break;
      currentResults[results[i].name] = [results[i].geometry.location.lat(), results[i].geometry.location.lng()];
      $(`.results-${input} ul`).append(`<li class="${input}-results">${results[i].name}</li>`);
    }

    if(results.length > 0) $(`.results-${input}`).show();
    else $(`.results-${input}`).hide();

    $(`.results-${input} ul`).css("list-style", "none");
    $(`.results-${input} ul`).css("padding", "0");
    $(`.results-${input} ul`).css("margin", "0");

    $(`.results-${input} li`).on("click", e => {
      $(`.results-${input}`).hide();
      $(`#${input}Airport`)[0].value = e.target.innerHTML;
      coordinates[input] = currentResults[e.target.innerHTML];
    });
  });
}


function getDistance(to, from) {
  const earthRadius = 6371e3;
  let toLat = to[0];
  let fromLat = from[0];
  let toLon = to[1];
  let fromLon = from[1];

  let psiOne = toRadians(toLat);
  let psiTwo = toRadians(fromLat);
  let psiDifference = toRadians(fromLat - toLat);
  let lambdaDifference = toRadians(fromLon - toLon);

  var a = Math.sin(psiDifference/2) * Math.sin(psiDifference/2) +
         Math.cos(psiOne) * Math.cos(psiTwo) *
         Math.sin(lambdaDifference/2) * Math.sin(lambdaDifference/2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

console.log(earthRadius * c);
 return earthRadius * c;

}

function toRadians(deg) {
  return (Math.PI * deg) / 180;
}
