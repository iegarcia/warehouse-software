import { useState } from "react";
import { Alert } from "react-bootstrap";
import Map from "./Map";

const MapContainer = () => {
  const [value, setValue] = useState();

  const handleSubmit = () => {
    setValue(document.getElementById("location").value);
    document.getElementById("mapContainer").style = "display: unset";
  };

  return (
    <div>
      <h3>Nearest warehouse calculation</h3>
      <div>
        <label htmlFor="location">Address</label>
        <br />
        <input type="text" name="location" id="location" className="mb-4" />
        <button type="button" onClick={() => handleSubmit()}>
          Go!
        </button>
        <div id="mapContainer">
          {value !== undefined ? (
            <Map content={value} />
          ) : (
            <Alert variant="info">
              <span className="text-light">
                Insert an address to check nearest warehouses
              </span>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
