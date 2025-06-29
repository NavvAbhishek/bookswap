import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places']; // Define libraries to load

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem',
};

// A default center for the map - using your location in Sri Lanka
const defaultCenter = {
  lat: 6.8411, // Maharagama, Sri Lanka
  lng: 79.923,
};

const LocationPicker = ({ onLocationChange, initialPosition }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(initialPosition || defaultCenter);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onMarkerDragEnd = (e) => {
    const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setMarkerPosition(newPos);
    onLocationChange(newPos);
  };
  
  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };
  
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const place = places[0];
    if (place && place.geometry) {
        const location = place.geometry.location;
        const newPos = { lat: location.lat(), lng: location.lng() };
        setMarkerPosition(newPos);
        onLocationChange(newPos);
        map.panTo(newPos);
        map.setZoom(15);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <div>
      <StandaloneSearchBox
        onLoad={onSearchBoxLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search for a location and drop the pin"
          className="w-full p-2 mb-4 border rounded"
        />
      </StandaloneSearchBox>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={markerPosition}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={onMarkerDragEnd}
        />
      </GoogleMap>
      <div className="mt-2 text-sm text-gray-600">
        <p>Current Lat: {markerPosition.lat.toFixed(4)}</p>
        <p>Current Lng: {markerPosition.lng.toFixed(4)}</p>
      </div>
    </div>
  );
};

export default LocationPicker;