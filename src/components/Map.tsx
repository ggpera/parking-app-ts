import { PolygonF, GoogleMap, useLoadScript } from '@react-google-maps/api';

const Map = () => {
  const API_KEY: string = import.meta.env.VITE_APP_GOOGLE_API_KEY || '';
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
  });
  const center = { lat: 61.4981, lng: 23.7608 };
  const coords = [
    { lat: 61.4919503, lng: 23.7555267 },
    { lat: 61.4919321, lng: 23.7555316 },
    { lat: 61.4919878, lng: 23.7563182 },
    { lat: 61.4920046, lng: 23.7563106 },
    { lat: 61.4919502, lng: 23.7555266 },
  ];

  return (
    <div className='map'>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName='map-container'
          center={center}
          zoom={15}
        >
          <PolygonF
            path={coords}
            key={1}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default Map;
