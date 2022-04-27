let map

function initMap() {
    renderMap()
    getPlaces()
    service()
}

function service() {
    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
        if (
            status === google.maps.places.PlacesServiceStatus.OK &&
            place &&
            place.geometry &&
            place.geometry.location
        ) {
            const marker = new google.maps.Marker({
                map,
                position: place.geometry.location,
            });

            google.maps.event.addListener(marker, "click", () => {
                const content = document.createElement("div");
                const nameElement = document.createElement("h2");

                nameElement.textContent = place.name;
                content.appendChild(nameElement);

                const placeIdElement = document.createElement("p");

                placeIdElement.textContent = place.place_id;
                content.appendChild(placeIdElement);

                const placeAddressElement = document.createElement("p");

                placeAddressElement.textContent = place.formatted_address;
                content.appendChild(placeAddressElement);
                infowindow.setContent(content);
                infowindow.open(map, marker);
            });
        }
    });
}

function renderMap() {
    const { Map, Marker } = google.maps

    map = new Map(
        document.querySelector('#map'), {
            center: { lat: 40.7796, lng: -73.9629 },
            zoom: 12,
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
    let marker
    const { Marker } = google.maps

    places.forEach(place => {
        const position = {
            lat: place.lat,
            lng: place.long,
        }
        new Marker({ position, title: place.name, map })
    })
}