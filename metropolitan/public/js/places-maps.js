let map

function initMap() {
    renderMap()
    getPlaces()
}

function renderMap() {

    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#map'), {
            center: { lat: 40.7796, lng: -73.9629 },
            zoom: 10,
        }
    )
}

function getPlaces() {

    axios
        .get('/API/places')
        .then(({ data }) => placeMarkers(data))
        .catch(err => consoel.log(err))
}

function placeMarkers(places) {

    const { Marker } = google.maps

    places.forEach(place => {

        const position = {
            lat: place.lat,
            lng: place.long,
        }
        console.log(position)
        new Marker({ position, title: place.name, map })
    })
}