import React, { useState, useCallback } from 'react';
import { Box, Paper, ToggleButton, Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import PinDropIcon from '@mui/icons-material/PinDrop';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { getMarkers, addMarker, updateMarker, deleteMarker } from '../services/markerService';

const googleMapsApiKey = (process.env.REACT_APP_GOOGLE_MAPS_API_KEY ?? '').trim();

const containerStyle = {
  width: '100vw',
  height: 'calc(100vh - 64px)', // Subtract AppBar height (64px)
  margin: 0,
  padding: 0
};

const center = {
  lat: 59.9139,
  lng: 10.7522
};

interface MarkerData {
  position: {
    lat: number;
    lng: number;
  };
  label: string;
  id: string; // Add this for better tracking
}
  
// NOTE: If you see a 404 error from getMarkers/addMarker, ensure your backend API is running
// and that the frontend is correctly proxying requests to /api/WeatherMarkers.
// For Create React App, check 'proxy' in package.json. For Vite/Next, check your dev server config.
// Also verify the backend exposes the /api/WeatherMarkers endpoint.

const MapComponent: React.FC = () => {
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [isPlacingMarker, setIsPlacingMarker] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tempMarker, setTempMarker] = useState<{lat: number, lng: number} | null>(null);
  const [newLabel, setNewLabel] = useState('');
  const [showMyLocation, setShowMyLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = React.useRef<google.maps.Map | null>(null);
  const [mapCenter, setMapCenter] = useState(center);
  const watchId = React.useRef<number | null>(null);

  const getCustomMarkerIcon = () => ({
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    fillColor: "#4ed97c",
    fillOpacity: 0.4,
    strokeWeight: 1,
    strokeColor: "#b4bfb7 ",
    scale: 2,
    anchor: new google.maps.Point(12, 24),
    labelOrigin: new google.maps.Point(12, 9)
  });

  const getUserLocation = () => {
    if (!navigator.geolocation) return;

    // Get initial position immediately
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newLocation);
        setMapCenter(newLocation);
      },
      (error) => console.error('Error getting location:', error)
    );

    // Then start watching for updates
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(newLocation);
        setMapCenter(newLocation);
      },
      (error) => console.error('Error watching location:', error)
    );
  };

  const toggleMyLocation = () => {
    const newShowMyLocation = !showMyLocation;
    setShowMyLocation(newShowMyLocation);
    
    if (newShowMyLocation) {
      getUserLocation();
    } else {
      // Cleanup location watching
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    }
  };

  // Cleanup on unmount
  React.useEffect(() => {
    // Fetch markers from API on mount
    getMarkers().then(apiMarkers => {
      setMarkers(apiMarkers.map(m => ({
        id: m.id!,
        label: m.label,
        position: { lat: m.latitude, lng: m.longitude }
      })));
    });
    return () => {
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (!isPlacingMarker || !event.latLng) return;
    
    setTempMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    setDialogOpen(true);
  };

  const handleAddMarker = async () => {
    if (tempMarker) {
      const markerToAdd = {
        label: newLabel || `Location ${markers.length + 1}`,
        latitude: tempMarker.lat,
        longitude: tempMarker.lng
      };
      try {
        const saved = await addMarker(markerToAdd);
        setMarkers([...markers, {
          id: saved.id!,
          label: saved.label,
          position: { lat: saved.latitude, lng: saved.longitude }
        }]);
      } catch (e) {
        alert('Failed to save marker ' + e);
      }
      setDialogOpen(false);
      setNewLabel('');
      setTempMarker(null);
    }
  };

  const handleMarkerRightClick = (index: number) => {

    const markerToDelete = markers.at(index) as MarkerData;
    deleteMarker(markerToDelete.id).catch(e => {
      console.error('Failed to delete marker:', e);
    })

    const newMarkers = markers.filter((_, i) => i !== index);
    setMarkers(newMarkers);
  };

  const handleMarkerDragEnd = async (index: number, event: google.maps.MapMouseEvent) => {
    if (!event.latLng) return;

    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    const marker = markers[index];

    // Update local state
    const newMarkers = [...markers];
    newMarkers[index] = {
      ...marker,
      position: {
        lat: newLat,
        lng: newLng
      }
    };
    setMarkers(newMarkers);

    // Persist update to backend
    try {
      await updateMarker(
        marker.id,
        {
          label: marker.label,
          latitude: newLat,
          longitude: newLng
        }
      );
    } catch (e) {
      // Optionally revert state or show error
      alert('Failed to update marker location: ' + e);
    }
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  return (
    <Box sx={{ width: '100vw', height: 'calc(100vh - 64px)', position: 'relative' }}>
      <Paper sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
        padding: 2,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 1 }}>
          <ToggleButton
            value="check"
            selected={isPlacingMarker}
            onChange={() => setIsPlacingMarker(!isPlacingMarker)}
            sx={{ justifyContent: 'flex-start' }}
          >
            <PinDropIcon />
            <Typography sx={{ ml: 1 }}>Place Marker</Typography>
          </ToggleButton>
          <ToggleButton
            value="check"
            selected={isPlacingMarker}
            onChange={() => setIsPlacingMarker(!isPlacingMarker)}
            sx={{ justifyContent: 'flex-start' }}
          >
            <PinDropIcon sx={{ mr: 1 }} />
            <Typography>Place Marker Again</Typography>
          </ToggleButton>
          <ToggleButton
            value="location"
            selected={showMyLocation}
            onChange={toggleMyLocation}
            sx={{ justifyContent: 'flex-start' }}
          >
            <MyLocationIcon sx={{ mr: 1 }} />
            <Typography>My Location</Typography>
          </ToggleButton>
        </Box>
      </Paper>
      
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={showMyLocation ? 15 : 11}
          onClick={handleMapClick}
          onLoad={onLoad}
        >
          {markers.map((marker, index) => (
            <Marker
              key={marker.id}
              position={marker.position}
              label={{
                text: marker.label,
                fontWeight: 'bold',
                color: 'black'
              }}
              icon={getCustomMarkerIcon()}
              onRightClick={() => handleMarkerRightClick(index)}
              draggable={true}
              onDragEnd={(e) => handleMarkerDragEnd(index, e)}
            />
          ))}
          {showMyLocation && userLocation && (
            <Marker
              position={userLocation}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 14,
                fillColor: "#ffffff",
                fillOpacity: 1,
                strokeColor: "#fffff",
                strokeWeight: 2,
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Marker Label</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Label"
            fullWidth
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder={`Location ${markers.length + 1}`}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddMarker}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MapComponent;
