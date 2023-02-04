import {
  DistanceMatrixService,
  GoogleMap,
  MarkerF,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getWarehouses } from "../firebase";
import { getLocationCoords } from "../functions";

const Marker = ({ data }) => {
  const [whCoords, setWhCoords] = useState([]);
  const [maxDistance, setMaxDistance] = useState(0);
  const [showMarkers, setShowMarkers] = useState(false);

  const getLocation = async (wh) => {
    const coordsData = [];
    let directions = wh.map((l) => {
      return l.address;
    });
    for (let index = 0; index < directions.length; index++) {
      const coords = await getLocationCoords(directions[index]);
      coordsData.push(coords);
    }
    setWhCoords(coordsData);
  };

  useEffect(() => {
    async function run() {
      let warehouses = await getWarehouses();
      await getLocation(warehouses);
    }

    if (Object.values(data).length < 1) {
      run();
    }
  }, [data]);

  return (
    <div>
      <GoogleMap
        zoom={15}
        center={data}
        mapContainerStyle={{ width: "100%", height: "50vh" }}
      >
        <MarkerF position={data} />
        {whCoords.map((c) => {
          return (
            <>
              <DistanceMatrixService
                options={{
                  destinations: [c],
                  origins: [data],
                  travelMode: "DRIVING",
                }}
                callback={(response) => {
                  const { value } = response.rows[0].elements[0].duration;
                  if (value > maxDistance) {
                    setMaxDistance(value);
                    setShowMarkers(true);
                  }
                }}
              />
              {showMarkers ? <MarkerF position={c} /> : null}
            </>
          );
        })}
      </GoogleMap>
    </div>
  );
};

export default Marker;
