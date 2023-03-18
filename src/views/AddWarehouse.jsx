import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button, Form } from "react-bootstrap";
import { fireModal } from "../functions";
import { getDbData as getWhData, storeData, storeFile } from "../firebase";

const AddWarehouse = ({ editar }) => {
  const initialState = {
    code: "",
    name: "",
    address: "",
    state: "",
    country: "",
    zip: "",
    products: "",
  };

  const [warehouse, setWarehouse] = useState(initialState);
  const [product, setProduct] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const getDetails = async (id) => {
    const whDetails = await getWhData("warehouses", id);
    return whDetails.data;
  };

  useEffect(() => {
    const id = location.pathname.slice(6);
    const prodFile = document.getElementById("products-group");
    const iptCode = document.getElementById("iptCode");

    async function run() {
      if (editar) {
        iptCode.disabled = true;
        prodFile.style = "display: none";
        const wh = await getDetails(id);
        setWarehouse(wh);
      }
    }

    run();
  }, [location.pathname, editar]);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = await storeFile(warehouse["name"], product);
      setWarehouse((warehouse["products"] = url));
      await storeData("warehouses", warehouse);

      fireModal("success", "Warehouse added successfully");
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
      fireModal("error", "Something went wrong");
    }
  };

  const handlerChange = (e) => {
    const { name, value } = e.target;

    setWarehouse({ ...warehouse, [name]: value });
  };
  const handlerFileChange = (e) => {
    setProduct(e.target.files[0]);
  };

  return (
    <div>
      <br />
      <Form onSubmit={handlerSubmit}>
        <div className="row">
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                id="iptCode"
                name="code"
                type="text"
                value={warehouse.code}
                placeholder="XXXX"
                onChange={handlerChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Warehouse Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                value={warehouse.name}
                placeholder="Warehouse ABC"
                onChange={handlerChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                type="text"
                value={warehouse.address}
                placeholder="565 5th Ave"
                onChange={handlerChange}
                required
              />
            </Form.Group>
          </div>
          <div className="col-md-6">
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                name="state"
                type="text"
                value={warehouse.state}
                placeholder="New York"
                onChange={handlerChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                name="country"
                type="text"
                value={warehouse.country}
                placeholder="United States"
                onChange={handlerChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Zip code</Form.Label>
              <Form.Control
                name="zip"
                type="text"
                value={warehouse.zip}
                placeholder="10017"
                onChange={handlerChange}
              />
            </Form.Group>
          </div>
          <Form.Group id="products-group">
            <Form.Label>Products</Form.Label>
            <Form.Control
              id="product-file"
              type="file"
              onChange={handlerFileChange}
            />
          </Form.Group>
        </div>
        <br />
        <a href="/">
          <Button variant="secondary" type="button">
            Back
          </Button>
        </a>{" "}
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default AddWarehouse;
