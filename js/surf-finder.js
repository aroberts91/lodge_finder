const API_KEY = 'AIzaSyDQeCU6fy_7ugLsVfT9jCya1yeQ8OQ3enA'; //Enter your API key here
let map, infoWindow;

function hideLandingCard() {
    $('.landing-container').fadeOut();
    $('.search-container').fadeIn();

    locateUser();
}

function onPageLoad() {
    var map_script = document.createElement( 'script' );

    map_script.type='text/javascript';
    map_script.src = 'https://maps.googleapis.com/maps/api/js?key=' + API_KEY + '&callback=initMap';
    document.body.appendChild( map_script );
}

function initMap() {
    map = new google.maps.Map(document.getElementById('card__map'), {
        center: {lat: -50.000, lng: 50.000},
        zoom: 8
    });
    infoWindow = new google.maps.InfoWindow;

    map.addListener( 'click', ( e ) => getClickedLocation( e ) );
}

function getClickedLocation( e ) {
    //Add an extra character if lat/lng is a minus value
    $( '#lat-input' ).val( e.latLng.lat().toString() );
    $( '#lng-input' ).val( e.latLng.lng().toString() );
}

function requestPlaces() {
    const error_msg = $('#error');

    error_msg.hide();

    let lat =  $( '#lat-input' ).val();
    let lng =  $( '#lng-input' ).val();

    if( isNaN( lat ) || isNaN( lng ) )
    {
        error_msg.text( 'Lat/Long must be a number' ).show();
        return;
    }

    $('#search-btn').text( 'Searching' );

    $.ajax({
        url: 'api/get_places.php',
        type: 'POST',
        data: {
            lat,
            lng
        },
        success: onSearchSuccess,
        error: ajaxFailHandler
    });
}

function locateUser() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        $('#locate-btn').text( 'Searching' );
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            map.setCenter(pos);
            $( '#lat-input' ).val( pos.lat );
            $( '#lng-input' ).val( pos.lng );
            $('#locate-btn').text( 'Find Me' );
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}

function resetSearch() {
    $('.results-container').fadeOut();
    $('#places-container').html('');
    $('.search-container').fadeIn();
    $('#search-btn').text( 'Searching' );
}

function onSearchSuccess( data ) {
    switch( data.status )
    {
        case 'OK':
            generatePlaces( data.results );
            break;
        case 'ZERO_RESULTS':
            $('#error').text( 'No Results Found' ).show();
            $('#search-btn').text( 'Search' );
    }
}

function ajaxFailHandler( error ) {
    alert( error );
    $('#search-btn').text( 'Search' );
}

function generatePlaces( data ) {
    $('.search-container').fadeOut();
    $('.results-container').fadeIn();

    const places_container = $('#places-container');

    let results = '';

    for( let ind = 0; ind < data.length; ind++ )
    {
        let place_data = data[ ind ];

        //Skip result if no name or rating
        if( !place_data.name || !place_data.rating )
            continue;

        results +=  '<div class="place__container">' +
                        '<span class="place-name">' + place_data.name + '</span>' +
                        '<span class="place-rating">Rating: <span>' + place_data.rating + '</span></span>' +
        place_data.open_now ? '<span class="place-opening-hours closed" style="color: red">Closed Now </span>' : '' +

                    '</div>'
    }

    places_container.append( results );
}

