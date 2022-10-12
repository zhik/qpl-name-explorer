import React, { useEffect, useState, useContext } from 'react';
import { useParams } from "react-router-dom";
import { MapContext } from './App';
import { resultFactory } from '../models/location';
import { DEFAULT_PADDING } from '../ui/Map';
import { extractlocationIdentifier } from '../models/location';
import TourView from '../features/Tour';
import LocationView from '../features/Location';
import CloseButton from '../ui/CloseButton';

export const DEFAULT_DETAIL_ZOOM = {
  ...DEFAULT_PADDING,
  zoom: 14,
}

function Detail({ locations }) {
  const map = useContext(MapContext);
  const [location, setlocation] = useState({});
  const { slug } = useParams();
  const id = extractlocationIdentifier(slug);

  useEffect(() => {
    if (locations.features) {
      const location = locations.features.find(m => m.properties.id === id);

      setlocation(resultFactory(location));
    }
  }, [id, locations]);

  if (!location) return;

  return <main>
    <CloseButton />
    {location?.properties?.LOCATION_TYPE === 'ASSET' && <LocationView location={location} map={map}/>}
    {location?.properties?.LOCATION_TYPE === 'TOUR' && <TourView location={location} locations={locations} map={map} />}
  </main>;
}

export default Detail;
