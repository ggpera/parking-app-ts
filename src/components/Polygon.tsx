import { useState } from 'react';
import { PolygonF, InfoWindowF } from '@react-google-maps/api';
import transformCoordinate from '../utils/transformCoordinate';
import data from '../data.json';
type PolygonType = {
  id: string;
};
const Polygon = () => {
  const [selectedPolygon, setSelectedPolygon] = useState<PolygonType | null>(
    null,
  );

  const [selectedPolygonPosition, setSelectedPolygonPosition] =
    useState(undefined);
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
            onClick={() => {
              feature === selectedPolygon
                ? setSelectedPolygon(null)
                : setSelectedPolygon(feature);
              setSelectedPolygonPosition(coordinates[0]);
            }}
          />
        );
      })}
      {selectedPolygon && (
        <InfoWindowF position={selectedPolygonPosition}>
          <div>
            {/* Content for the InfoWindow */}
            <h3>{selectedPolygon.id}</h3>
            {/* Add other content here */}
          </div>
        </InfoWindowF>
      )}
    </div>
  );
};

export default Polygon;
