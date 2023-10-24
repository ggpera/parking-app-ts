import { useState } from 'react';
import { PolygonF, InfoWindowF } from '@react-google-maps/api';
import { wktToGeoJSON } from '@terraformer/wkt';
import useApi from '../hooks/useApi';
import transformCoordinate from '../utils/transformCoordinate';

const Polygon = () => {
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonType | null>(null);
  const [infoWindowPosition, setInfoWindowPosition] = useState<Coordinate | undefined>(undefined);
  const { data } = useApi<Root | null>('https://data.tampere.fi/data/api/action/datastore_search');

  return (
    <div>
      {data?.result.records.map((record, index) => {
        // Map all of the coordinates from the GeoJSON data
        // and transform the coordinates to a Google Maps compatible form
        const coordinatesWKT = record.GEOLOC;
        // Parse wkt string type into geoJSON
        const coordinatesGeoJSON = wktToGeoJSON(coordinatesWKT);
        if (coordinatesGeoJSON.type === 'Polygon') {
          const coordinates = coordinatesGeoJSON.coordinates[0].map((coordinate) => {
            const transformedCoordinate = transformCoordinate({
              lat: coordinate[1],
              lng: coordinate[0],
            });
            return transformedCoordinate;
          });

          return (
            <PolygonF
              key={index}
              path={coordinates}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
              }}
              onClick={(e) => {
                record === selectedPolygon ? setSelectedPolygon(null) : setSelectedPolygon(record);
                setInfoWindowPosition({
                  lat: e.latLng?.lat() || 0,
                  lng: e.latLng?.lng() || 0,
                });
              }}
            />
          );
        }
      })}
      {selectedPolygon && (
        <InfoWindowF
          position={infoWindowPosition}
          onCloseClick={() => {
            setInfoWindowPosition(undefined);
            setSelectedPolygon(null);
          }}
        >
          <div>
            <p>
              id: {selectedPolygon._id} <br />
              tyyppi: {selectedPolygon.KOHDETYYPPI}
            </p>
          </div>
        </InfoWindowF>
      )}
    </div>
  );
};

export default Polygon;
