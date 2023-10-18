import { PolygonF } from '@react-google-maps/api';
import transformCoordinate from '../utils/transformCoordinate';
import data from '../data.json';

const Polygon = () => {
  const geoJSONFeatures = data.features;

  return (
    <div>
      {geoJSONFeatures.map((feature, index) => {
        // Map the all of the coordinates from the GeoJSON data
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
          />
        );
      })}
    </div>
  );
};

export default Polygon;
