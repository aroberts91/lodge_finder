<?php
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
require_once $DOCUMENT_ROOT . '/lodge_finder/include/base.inc';

$lat = strParam( 'lat' );
$long = strParam( 'lng' );

if( !$lat || !$long )
{
    header( 'Content-Type: application/json' );
    echo json_encode( [ 'status' => 400, 'message' => 'Missing lat/long' ] );
}

$location = $lat . ',' . $long;

$curl = curl_init();
curl_setopt_array( $curl, [
    CURLOPT_URL             => 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='
                                . $location . '&radius=1000&fields=contact&type=lodging&keyword=surf&key=AIzaSyCjg4eZiH1RXlPbiw6dlni3pb7rKh4kabo',
    CURLOPT_RETURNTRANSFER  => true, //Return contents as var
    CURLOPT_FOLLOWLOCATION  => true, //Follow redirects
] );

$res = curl_exec( $curl ); //Make request
curl_close( $curl ); //Close curl handle

if( !$res )
{
    header( 'Content-Type: application/json' );
    echo json_encode( [ 'status' => 400, 'message' => 'Error: Request to Google Places failed' ] );
}

header( 'Content-Type: application/json' );
echo $res;
