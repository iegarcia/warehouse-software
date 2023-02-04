import { useLoadScript } from "@react-google-maps/api";
import Marker from "./Marker";
import { getLocationCoords } from "../functions";
import { useEffect, useState } from "react";

const Map = ({ content }) => {
  const [marker, setMarker] = useState({});
  useEffect(() => {
    async function run() {
      const info = await getLocationCoords(content);
      setMarker(info);
    }

    if (content !== undefined) {
      run();
    }
  }, [content]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (!isLoaded) return <div>Cargando...</div>;
  return <Marker data={marker} />;
};
export default Map;
