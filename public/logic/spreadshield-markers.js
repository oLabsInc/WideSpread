
function loadPlaces(position) {
    console.log('loadPlaces function POSITION: ', position)
    console.log('Latitude: ', position.latitude)
    console.log('Longitude: ', position.longitude)
    const currentLat = position.latitude
    const currentLong = position.longitude
    
    const currentLatString = currentLat.toString()
    const currentLongString = currentLong.toString()
    let ll
    if (currentLongString[0] === '-') {
        console.log('This is a negative: ', currentLongString)
        const newCurrentLatString = currentLatString.substring(0, 5)
        const newCurrentLongString = currentLongString.substring(0, 6)
        console.log(newCurrentLatString)
        console.log(newCurrentLongString)
        ll = newCurrentLatString + '%2C' + newCurrentLongString
    }
    if (currentLatString[0] === '-') {
        console.log('This is a negative: ', currentLatString)
        const newCurrentLatString = currentLatString.substring(0, 6)
        const newCurrentLongString = currentLongString.substring(0, 5)
        console.log(newCurrentLatString)
        console.log(newCurrentLongString)
        ll = newCurrentLatString + '%2C' + newCurrentLongString
    }
    if ((currentLatString[0] === '-') && (currentLongString[0] === '-')) {
        console.log('This is a negative: ', currentLatString)
        console.log('This is a negative: ', currentLongString)
        const newCurrentLatString = currentLatString.substring(0, 6)
        const newCurrentLongString = currentLongString.substring(0, 6)
        console.log(newCurrentLatString)
        console.log(newCurrentLongString)
        ll = newCurrentLatString + '%2C' + newCurrentLongString
    }   
    console.log('ll: ', ll)
    const scene = document.querySelector("a-scene");
     const params = {
        radius: 2000,
        clientId: "BAVW34WNTJEZ2HC1HIB4R5VCGAORU2N0GNGZ1OOPCYWSBD1Y",
        clientSecret: "5AEIKFIMLUVNRTWXDLOVWHE3BVMXIOCQH2DX4BGXLLEIW0H4",
        clientSecret: "fsq3WJl5PYQg1Hie12BgyP7EhQ9hRSdoVo0SWdsD5jJWPUE=",
        version: "20300101"
    };

    // ${position.latitude},${position.longitude}
    const corsProxy = "https://cors-anywhere.herokuapp.com/";
    const endpoint = `${corsProxy}
        https://api.foursquare.com/v3/places/nearby/search
        &ll=${ll}
        &radius=${params.radius}
        &client_id=${params.clientId}
        &client_secret=${params.clientSecret}
        &limit=20 
        &v=${params.version}`;
        return fetch(endpoint)
        .then(res => {
            return res.json().then(resp => {
                return resp.response.venues;
            });
        })
        .catch(err => {
            console.error("Error with places API", err);
        });

    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3JlyvV30Lm9ZN7+HNXFk86n1/iswy59C+VMufKYlV4rc='
        }
    };

    fetch(`https://api.foursquare.com/v3/places/nearby?ll=${ll}&limit=30&radius=3000`, options)
        .then(response => response.json())
        .then(places => {
            console.log(places.results)
            const nearbyPlaces = places.results
            nearbyPlaces.forEach(place => {
                console.log(place)
                const placeName = place.name

                const latitude = place.geocodes.main.latitude
                const longitude = place.geocodes.main.longitude

                let placeContainer = document.createElement('a-entity')
                const latLong = `latitude: ${latitude}; longitude: ${longitude}`
                placeContainer.innerHTML = `
                    <a-entity gps-entity-place='latitude: ${latitude}; longitude: ${longitude}' scale='3 3 3' look-at="#camera">
                            <a-text align='center' value="${placeName}"></a-text>
                            <a-ring scale='1 1 1' color='lightskyblue'></a-ring>
                    </a-entity>
                `;
                 placeContainer.setAttribute('gps-entity-place', latLong)
                placeContainer.setAttribute('data-lat', latitude)
                placeContainer.setAttribute('data-long', longitude)
                placeContainer.setAttribute('scale', '1 1 1')

                
                let placeText = document.createElement('a-text')
                placeText.setAttribute('scale', '0.75 0.75 1')
                placeText.setAttribute('value', placeName)
                placeContainer.appendChild(placeText)

                const placePin = document.createElement('a-ring')
                placePin.setAttribute('color', 'lightskyblue')
                placePin.setAttribute('radius-inner', '1.5')
                placePin.setAttribute('radius-outer', '2')
                placePin.setAttribute('segmentsTheta', '100')
                placeContainer.appendChild(placePin)
                placeContainer.addEventListener("loaded", () => {
                    window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
                });



                scene.appendChild(placeContainer)
            })
            categories = places.results[0].categories[0]
            console.log('Categories: ', categories)
        })
        .catch(err => console.error(err));
    }



    
    window.onload = () => {
        

        // Get current user location
        return navigator.geolocation.getCurrentPosition(
            function (position) {
                console.log('CURRENT USER LATITUDE: ', position.coords.latitude)
                console.log('CURRENT USER LONGITUDE: ', position.coords.longitude)
                // Then use it to load from remote APIs some places nearby
                loadPlaces(position.coords)
                
                 .then(places => {
                    places.forEach(place => {
                        const latitude = place.location.lat;
                        const longitude = place.location.lng;

                        // Place Marker Attributes
                        const placeText = document.createElement("a-entity");
                        placeText.setAttribute(
                            "gps-entity-place",
                            `latitude: ${latitude}; longitude: ${longitude};`,
                            "link", "backgroundColor: #00ffff; borderColor: #ffffff;"
                        );
                        const placeName = document.createElement("a-text");

                        placeName.setAttribute("value", place.name);
                        placeText.appendChild(placeName);

                        const placePin = document.createElement("a-ring");
                        placePin.setAttribute("color", "teal");
                        placePin.setAttribute("radius-inner", "1.5");
                        placePin.setAttribute("radius-outer", "2");
                        placeText.appendChild(placePin);
                        placeText.setAttribute("title", place.name);
                        placeText.setAttribute("scale", "7 7 7");


                        placeText.addEventListener("loaded", () => {
                            window.dispatchEvent(new CustomEvent("gps-entity-place-loaded"));
                        });

                        scene.appendChild(placeText);
                        console.log(places);
                        console.log(placeName);
                        console.log(placePin);
                    });
                });
            },
            err => console.error("I'm sorry, we were unable to retrieve your position", err),
            {
                enableHighAccuracy: true,
                maximumAge: 5000,
                timeout: 30000
            }
        );
    };
