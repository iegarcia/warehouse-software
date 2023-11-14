import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import Map from "./Map/Map";

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
        <label htmlFor="location" className="form-label">
          Address (fake street 1234, district, country)
        </label>
        <input
          type="text"
          name="location"
          id="location"
          className="form-control mb-4"
          placeholder="Fake Street 123"
        />
        <span>
          <strong>
            If the map shows you the wrong location, please be specific (check
            the example)
          </strong>
        </span>{" "}
        <br />
        <br />
        <Button variant="success" onClick={() => handleSubmit()}>
          Go!
        </Button>
      </div>

      <div id="mapContainer">
        {value !== undefined ? (
          <Map content={value} />
        ) : (
          <Alert variant="info" className="mt-4">
            <span className="text-light">
              Insert an address to check nearest warehouses
            </span>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default MapContainer;
