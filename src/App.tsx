import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo } from 'react';
import './App.css';

const App = () => {
  const API_KEY: string = import.meta.env.VITE_APP_GOOGLE_API_KEY || '';
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  const center = useMemo(() => ({ lat: 61.4981, lng: 23.7608 }), []);

  return (
    <div className='App'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={15}
        />
      )}
    </div>
  );
};

export default App;
