<?php
define( 'API_KEY', 'AIzaSyDQeCU6fy_7ugLsVfT9jCya1yeQ8OQ3enA', true ); //Enter Google API key here

function err_res( $message )
{
    header( 'Content-Type: application/json' );
    echo json_encode( [ 'status' => 400, 'message' => $message ] );
    exit;
}

if( empty( $_REQUEST[ 'lat' ] ) || empty( $_REQUEST[ 'lng' ] ) )
    err_res( 'Missing lat/long' );

$curl = curl_init();
curl_setopt_array( $curl, [
    CURLOPT_URL             => 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' . $_REQUEST[ 'lat' ] . ',' . $_REQUEST[ 'lng' ] .
                                '&radius=1000&fields=contact&type=lodging&keyword=surf&key=' . API_KEY,
    CURLOPT_RETURNTRANSFER  => true, //Return contents as var
    CURLOPT_FOLLOWLOCATION  => true, //Follow redirects
] );

$res = curl_exec( $curl ); //Make request
curl_close( $curl ); //Close curl handle

if( !$res )
    err_res( 'Error: Request to Google Places failed' );

header( 'Content-Type: application/json' );
echo $res;
