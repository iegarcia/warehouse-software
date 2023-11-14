import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useEffect, useState } from "react";
import { getWarehouses } from "../../firebase";
import {
  filterDistances,
  fireModal,
  getDistance,
  getLocationCoords,
} from "../../functions";
import ClosestRoute from "./ClosestRoute";
import LoadingModal from "../LoadingModal";

import one from "../../assets/one.ico";
import two from "../../assets/two.ico";
import three from "../../assets/three.ico";

const modalContent = "getting warehouses, obtaining closer locations";
const icons = [one, two, three];
const Marker = ({ data }) => {
  const [whCoords, setWhCoords] = useState([]);
  const [closest, setClosest] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const getLocation = async (wh) => {
    const coordsData = [];
    let directions = wh.map((l) => {
      return `${l.address}, ${l.state}`;
    });

    for (let index = 0; index < directions.length; index++) {
      try {
        const coords = await getLocationCoords(directions[index]);
        coordsData.push(coords);
      } catch (error) {
        console.error(error.message);
        // coordsData.push(null); // O maneja el error de alguna otra manera
      }

      // Agrega un retraso de 2 segundos entre las solicitudes
      await new Promise((resolve) => setTimeout(resolve, 2500));
    }

    return coordsData;
  };

  const handleShow = () => setModalShow(true);

  const getNearest = useCallback(
    async (coords) => {
      try {
        const distanceInfo = await getDistance(data, coords);

        if (distanceInfo) {
          const { destinations, distances } = distanceInfo;

          const nearest = filterDistances(destinations, distances);
          const arrayData = Object.values(nearest);
          if (arrayData.length > 1) {
            arrayData.shift();
            arrayData.forEach((d, idx) => (d.icon = icons[idx]));

            const closestWarehouse = arrayData.reduce((min, current) =>
              current.distance < min.distance ? current : min
            );

            setWhCoords(arrayData);
            setClosest(closestWarehouse);
            setModalShow(false);
          } else {
            fireModal("info", "No warehouse nearest address provided");
            setModalShow(false);
          }
        } else {
          setModalShow(false);
          fireModal(
            "error",
            "Sorry the server and I had a fight, so he didn't give me the information. Try reloading the page!"
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    [data, setWhCoords, setClosest, setModalShow]
  );

  useEffect(() => {
    async function run() {
      setModalShow(true);
      const warehouses = await getWarehouses();
      const coords = await getLocation(warehouses);
      await getNearest(coords);
    }

    run();
  }, [getNearest]);

  return (
    <div>
      <GoogleMap
        zoom={15}
        center={data}
        mapContainerStyle={{ width: "100%", height: "50vh" }}
      >
        <MarkerF position={data} />

        {whCoords.map((wh, idx) => {
          return (
            <MarkerF
              key={idx}
              position={wh.coords}
              icon={{
                url: wh.icon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          );
        })}
        {Object.values(closest).length > 0 ? (
          <ClosestRoute start={data} end={closest} />
        ) : (
          handleShow
        )}
      </GoogleMap>

      <LoadingModal show={modalShow} text={modalContent} />
    </div>
  );
};

export default Marker;
