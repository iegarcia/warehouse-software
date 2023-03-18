import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getWarehouses } from "../firebase";
import {
  filterDistances,
  fireModal,
  getDistance,
  getLocationCoords,
} from "../functions";
import ClosestRoute from "./ClosestRoute";
import LoadingModal from "./LoadingModal";

import one from "../assets/one.ico";
import two from "../assets/two.ico";
import three from "../assets/three.ico";

const modalContent = "getting warehouses, obtaining closer locations";
const Marker = ({ data }) => {
  const [whCoords, setWhCoords] = useState([]);
  const [closest, setClosest] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const icons = [one, two, three];

  const getLocation = async (wh) => {
    const coordsData = [];
    let directions = wh.map((l) => {
      return l.address;
    });
    for (let index = 0; index < directions.length; index++) {
      const coords = await getLocationCoords(directions[index]);
      coordsData.push(coords);
    }
    return coordsData;
  };

  const handleShow = () => setModalShow(true);

  const getNearest = async (coords) => {
    let nearest = null;
    const distanceInfo = await getDistance(data, coords);
    // const distanceInfo = "";

    if (distanceInfo !== "") {
      const { destinations, distances } = distanceInfo;
      nearest = filterDistances(destinations, distances);
      delete nearest[0];

      const arrayData = Object.values(nearest);
      arrayData.map((d, idx) => (d.icon = icons[idx]));
      setWhCoords(arrayData);
      const closestWarehouse = arrayData.reduce((min, current) => {
        return current.distance < min.distance ? current : min;
      });
      setClosest(closestWarehouse);
      setModalShow(false);
    } else {
      setModalShow(false);
      fireModal(
        "error",
        "Sorry the server and I had a fight, so he didn't give me the information. Try reloading the page!"
      );
    }
  };

  useEffect(() => {
    async function run() {
      setModalShow(true);
      const warehouses = await getWarehouses();
      const coords = await getLocation(warehouses);
      await getNearest(coords);
    }

    run();
  }, []);

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
