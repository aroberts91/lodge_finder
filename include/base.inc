<?php
//Some helper functions
function strParam( $name, $default=false )
{
    if( isset( $_REQUEST[ $name ] ) )
        return $_REQUEST[ $name ];
    return $default;
}
function intParam( $name, $default=false )
{
    if( isset( $_REQUEST[ $name ] ) && is_numeric( $_REQUEST[ $name ] ) )
        return ( int )$_REQUEST[ $name ];
    return $default;
}
function boolParam( $name, $default=false )
{
    if( isset( $_REQUEST[ $name ] ) )
        return filter_var($_REQUEST[ $name ], FILTER_VALIDATE_BOOLEAN);
    return $default;
}