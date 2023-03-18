import { useLoadScript } from "@react-google-maps/api";
import Marker from "./Marker";
import { getLocationCoords } from "../functions";
import { useEffect, useState } from "react";
import { Alert, Spinner } from "react-bootstrap";

const Map = ({ content }) => {
  const [marker, setMarker] = useState({});
  useEffect(() => {
    async function run() {
      const info = await getLocationCoords(content);
      setMarker(info);
    }

    run();
  }, [content]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  });
  if (!isLoaded)
    return (
      <div>
        <Spinner animation="border" role="status" />
      </div>
    );
  return Object.values(marker).length > 0 ? (
    <Marker data={marker} />
  ) : (
    <>
      <br />
      <Alert variant="primary">
        <Spinner animation="border" role="status" variant="light" />
        <span className="text-light">Bulding map!</span>
      </Alert>
    </>
  );
};
export default Map;
