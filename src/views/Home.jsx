import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import {
  BsFillPencilFill,
  BsFillTrashFill,
  BsFillBasket2Fill,
} from "react-icons/bs";
import MapContainer from "../components/MapContainer";
import { useAuth } from "../context/AuthContext";

import { fireModal } from "../functions";
import { deleteWarehouse, getDbData, getWarehouses } from "../firebase";

const Home = () => {
  const [gridData, setGridData] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [code, setCode] = useState("");
  const [show, setShow] = useState(false);

  const { user } = useAuth();
  const ADMIN_ROLE = 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerDelete = async () => {
    const btnDelete = document.getElementById("btnDelete");
    const btnSpinner = document.getElementById("deleteLoading");
    btnDelete.style = "display: none";
    btnSpinner.style = "display: unset";
    try {
      await deleteWarehouse(code);
      btnSpinner.style = "display: none";
      btnDelete.style = "display: unset";
      handleClose();
      fireModal("success", "Warehouse remove successfully");
      const newData = await getWarehouses();
      setGridData(newData);
    } catch (error) {
      fireModal("error", "Oops something went wrong :( !");
    }
  };

  const showModal = (id) => {
    handleShow();
    setCode(id);
  };

  useEffect(() => {
    async function run() {
      const whGrid = document.getElementById("whGrid");
      const nearestLocation = document.getElementById("nearest-location");

      const warehouses = await getWarehouses();
      const userData = await getDbData("users", user.uid);

      if (userData.data.role !== ADMIN_ROLE) {
        nearestLocation.style = "display:none";
      } else {
        nearestLocation.style = "display:unset";
      }

      whGrid.style = "display: unset";
      setHidden(false);

      setGridData(warehouses);
    }
    run();
  }, [user.uid]);

  return (
    <div>
      <Spinner
        animation="border"
        role="status"
        style={{ display: hidden ? "inline-block" : "none" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      <div id="whGrid" style={{ display: "none" }}>
        <br />
        <a href="/add">
          <Button variant="success">New</Button>
        </a>
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Address</th>
              <th>State</th>
              <th>Country</th>
              <th>Zip</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {gridData.map((gd, idx) => {
              return (
                <tr key={idx}>
                  <td>{gd.code}</td>
                  <td>{gd.name}</td>
                  <td>{gd.address}</td>
                  <td>{gd.state}</td>
                  <td>{gd.country}</td>
                  <td>{gd.zip}</td>
                  <td>
                    <a
                      href={gd.products}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsFillBasket2Fill color="#0d6efd" />
                    </a>
                  </td>
                  <td>
                    <a href={`/edit/${gd.code}`}>
                      <BsFillPencilFill color="#664d03" />
                    </a>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => showModal(gd.code)}
                    >
                      <BsFillTrashFill color="red" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <br />
        <br />
        <div id="nearest-location">
          <MapContainer />
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete item {code}? <br />
          <strong>This action is irreversible! </strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id="btnDelete" variant="danger" onClick={handlerDelete}>
            Delete
          </Button>
          <Button
            id="deleteLoading"
            variant="danger"
            disabled
            style={{ display: "none" }}
          >
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
