import { useLoadScript } from "@react-google-maps/api";
import Marker from "./Marker";
import { getLocationData } from "../functions";
import { useEffect, useState } from "react";

const Map = ({ content }) => {
  const [marker, setMarker] = useState({});

  useEffect(() => {
    async function run() {
      const info = await getLocationData(content);

      const { data } = info;

      let markerData = {
        lat: data[0].latitude,
        lng: data[0].longitude,
      };

      setMarker(markerData);
    }

    if (content !== undefined) {
      run();
    }
  }, [content]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_KEY,
  });
  if (!isLoaded) return <div>Cargando...</div>;
  return <Marker data={marker} />;
};
export default Map;
