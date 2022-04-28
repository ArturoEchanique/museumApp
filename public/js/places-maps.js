let map
let initialCords = [0, 0]

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

    axios
        .get('/API/places')
        .then(({ data }) => {
            const gallery = [Math.floor(Math.random() * data.length)]
            initialCords[0] = data[gallery].lat
            initialCords[1] = data[gallery].long
            console.log(initialCords)
        })
        .then(() =>{
            map = new Map(
                document.querySelector('#map'), {
                center: { lat: initialCords[0], lng: initialCords[1] },
                zoom: 12,
            })
        })
        .catch(err => console.log(err))
    
}

function getPlaces() {

    axios
        .get('/API/places')
        .then(({ data }) => placeMarkers(data))
        .catch(err => console.log(err))
}

function placeMarkers(places) {
    const { Marker } = google.maps

    places.forEach(place => {
        const position = {
            lat: place.lat,
            lng: place.long,
        }
        new Marker({ position, title: place.name, map })
    })
}