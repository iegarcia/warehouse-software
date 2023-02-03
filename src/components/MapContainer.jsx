import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import Map from "./Map";

const MapContainer = () => {
  const [value, setValue] = useState();

  const handleSubmit = () => {
    setValue(document.getElementById("test").value);
    document.getElementById("mapContainer").style = "display: unset";
  };

  return (
    <div>
      <h3>Nearest warehouse calculation</h3>
      <div>
        <label htmlFor="location">Address</label>
        <input type="text" name="location" id="test" />
        <button type="button" onClick={() => handleSubmit()}>
          Go!
        </button>
        <div id="mapContainer" style={{ display: "none" }}>
          {/* <Map content={value} /> */}
        </div>
      </div>
    </div>
  );
};

export default MapContainer;
