import { PolylineF } from "@react-google-maps/api";
import { useEffect, useState } from "react";

import { buildRoute } from "../functions";
import DirectionsModal from "./DirectionsModal";
import LoadingModal from "./LoadingModal";

const modalContent = "Routing...";
const ClosestRoute = ({ start, end }) => {
  const [route, setRoute] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [steps, setSteps] = useState([]);

  const { lat, lng } = end.coords;
  const origin = Object.values(start);
  const destiny = [lng, lat];

  const handleShow = () => setModalShow(true);

  useEffect(() => {
    async function run() {
      setModalShow(true);
      const directions = await buildRoute(origin, destiny);

      const { coordinates, steps } = directions;

      setRoute(coordinates.map((d) => ({ lng: d[0], lat: d[1] })));
      setSteps(steps);
      setModalShow(false);
    }

    run();
  }, []);

  return (
    <>
      {route.length > 0 ? (
        <PolylineF
          path={route}
          options={{
            strokeColor: "black",
            strokeOpacity: 1.0,
            strokeWeight: 4,
            geodesic: true,
          }}
        />
      ) : (
        handleShow
      )}
      <DirectionsModal details={steps} />
      <LoadingModal show={modalShow} text={modalContent} />
    </>
  );
};

export default ClosestRoute;
