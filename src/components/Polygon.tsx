import { useState } from 'react';
import { PolygonF, InfoWindowF } from '@react-google-maps/api';
import transformCoordinate from '../utils/transformCoordinate';
import data from '../data.json';

const Polygon = () => {
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonType | null>(
    null,
  );
  const [infoWindowPosition, setInfoWindowPosition] = useState<
    Coordinate | undefined
  >(undefined);
  const geoJSONFeatures = data.features;

  return (
    <div>
      {geoJSONFeatures.map((feature, index) => {
        // Map all of the coordinates from the GeoJSON data
        // and transform the coordinates to a Google Maps compatible form
        const coordinateArray = feature.geometry.coordinates[0][0];
        const coordinates = coordinateArray.map(
          (coordinate: [number, number]) => {
            const transformedCoordinate = transformCoordinate({
              lat: coordinate[1],
              lng: coordinate[0],
            });
            return transformedCoordinate;
          },
        );
        return (
          <PolygonF
            key={index}
            path={coordinates}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: '#FF0000',
              fillOpacity: 0.35,
            }}
            onClick={(e) => {
              feature === selectedPolygon
                ? setSelectedPolygon(null)
                : setSelectedPolygon(feature);
              setInfoWindowPosition({
                lat: e.latLng?.lat() || 0,
                lng: e.latLng?.lng() || 0,
              });
            }}
          />
        );
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
              Arkipäivät:{' '}
              {selectedPolygon.properties.rajoitus_maksullinen_arkena}
            </p>
            <p>
              Lauantai:{' '}
              {selectedPolygon.properties.rajoitus_maksullinen_lauantaina}
            </p>
            <p>
              Sunnuntai:{' '}
              {selectedPolygon.properties.rajoitus_maksullinen_sunnuntaina}
            </p>
          </div>
        </InfoWindowF>
      )}
    </div>
  );
};

export default Polygon;
