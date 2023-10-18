import proj4 from 'proj4';
import { Coordinate } from '../types/types';

const transformCoordinate = ({ lat, lng }: Coordinate) => {
  // EPSG:3878 ETRS89 / GK24FIN
  const firstProjection =
    '+proj=tmerc +lat_0=0 +lon_0=24 +k=1 +x_0=24500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs';

  // EPSG:4326 WGS 84
  const secondProjection = '+proj=longlat +datum=WGS84 +no_defs +type=crs';

  // Transform coordinate system from EPSG:3878 to EPSG:4326
  const transformedCoordinate = proj4(firstProjection, secondProjection, [
    lng,
    lat,
  ]);
  return {
    lat: transformedCoordinate[1],
    lng: transformedCoordinate[0],
  };
};
export default transformCoordinate;
