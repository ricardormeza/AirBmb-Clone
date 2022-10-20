import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


const Map = ({ location }) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.googlePlacesApi
    })

    console.log('location.lat', location.lat)

    const containerStyle = {
        width: '100%',
        height: '400px'
    };
    
    const center = {
        // lat: -3.745,
        // lng: -38.523
        lat: location.lat,
        lng: location.lng
    };

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const image =  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            { /* Child components, such as markers, info windows, etc. */}
            <Marker 
            position={{lat: location.lat, lng: location.lng}}
            icon={{
                url: image,
                anchor: new google.maps.Point(5,58)
            }}
            />
            <></>
        </GoogleMap>
    ) : <></>
}

export default React.memo(Map)