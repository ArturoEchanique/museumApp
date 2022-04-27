let map

function initMap() {
    renderMap()
    getPlaces()
    marker.addListener("click", toggleBounce);
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

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

function placeMarkers(places) {
    let marker
    const { Marker } = google.maps


    places.forEach(place => {

        const position = {
            lat: place.lat,
            lng: place.long,
        }
        const animation = google.maps.Animation.DROP

        new Marker({ position, title: place.name, description: place.description, animation, map })
    })
}
window.initMap = initMap;