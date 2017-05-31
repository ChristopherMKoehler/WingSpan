## Wingspan

Wingspan is a web application that allows the user to find the distance between any two airports in the United States. It is implemented in HTML5, CSS3, and JavaScript along with libraries such as jQuery, Bootstrap, Google Maps, and Google Places.

### Implementation

### Google Maps/Places

This application uses the Google Places and Google Maps APIs to find the airports in the US and then show them on a map respectively. The results from the Google Places API are used to make an autocomplete feature. I used jQuery to append the airports to a unordered list that exists on the page. Upon clicking one of them, the code will finish what airport the user was looking for in the text input.

```javascript
if(results != null) {
  results = results.filter(res => res.formatted_address.indexOf("United States") >= 0);


  for(let i = 0; i < Math.min(3, results.length); i++) {
    currentResults[results[i].name] = [results[i].geometry.location.lat(), results[i].geometry.location.lng()];
    $(`.results-${input} ul`).append(`<li class="${input}-results">${results[i].name}</li>`);
  }

  if(results.length > 0) $(`.results-${input}`).show();
  else $(`.results-${input}`).hide();
}
```

As you can see, the filtering is done on the client side to only allow airports with the United States as their country. The for loop is set up in such a way that only a maximum of three airports will be shown on the page to keep everything clean and readable.

The autocomplete makes an API request upon the user typing something in to the text input. The request takes a very small amount of time to complete and will only return 20 results, which makes this a viable option over fetching all of the airports and storing them client side.

### Distances

The distances are calculated once the user presses the submit button. When the user is selecting the airports, the coordinates attribute of those airports are saved into an object which will be used upon a submit event. These coordinates are used to add markers to the map on the page.

With the coordinates that were gathered, the distance is calculated using the Haversine formula, which yields the radial distance between any two points on a sphere of a given radius. This was a simple calculation with JS's Math functions.

```javascript
function populateTable(distMeters) {
  $(".km").html(`${~~(distMeters / 1000)} kilometers`);
  $(".mi").html(`${~~(distMeters * 0.000621371)} miles`);
  $(".nm").html(`${~~(distMeters * 0.00053995663640604751)} nautical miles`);
  $(".ly").html(`${(distMeters * 1.057e-16)} light years`);

  $(".table").show();
}
```
Once the distance in meters is solved for, simple arithmetic yields a group of values for the distance in kilometers, miles, nautical miles, and light years (for fun). These values are added to the table on the page and the table is shown if it is not already.
