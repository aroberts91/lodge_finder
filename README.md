# Lodge Finder

A simple web application which allows the user to search for surf lodges within a given area.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

```
XAMPP or a similar LAMP environment
```

### Installing

```
Install XAMPP (or LAMP environment) and clone repository into root projects folder:

cd /c/xampp/htdocs
git clone 

Update api/get_places.php and js/surf-finder.js API_KEY with your google API key
```

## Testing

To test Geolocation

```
- Once page has loaded, press get started
- Accept browser request for geolocation
- Wait until 'Searching' button changes to 'Find Me'
-> Maps should now be centered to your location
- Move maps away from location and press 'Find Me'
-> Maps should re-center to your location
```

To test Search

```
- If you are aware of lat/long which will provide results, enter these in the correct
input boxes or select the area on the map (this will pre-fill the inputs)
- Otherwise, enter lat: 50.41337213508103 / long: -5.105306980850514 and press 'Search'
-> Search should succesfully return results
- Press back to go back to search screen.
```

## Built With

* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [XAMPP](https://www.apachefriends.org/index.html)
* [PHP](https://secure.php.net/)

## Authors

* **Adam Roberts**