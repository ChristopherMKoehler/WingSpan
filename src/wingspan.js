var coordinates = {
  "to": null,
  "from": null
};
var currentResults = {};
var service = new google.maps.places.PlacesService(map);

$(document).ready(() => {
  $(`.results-to`).hide();
  $(`.results-from`).hide();
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
