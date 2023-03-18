import { useEffect, useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

import MapContainer from "../components/MapContainer";
import { useAuth } from "../context/AuthContext";

import { fireModal } from "../functions";
import {
  deleteWarehouse,
  getDbData as getUserData,
  getWarehouses,
} from "../firebase";

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
      const userData = await getUserData("users", user.uid);

      if (userData.data.role !== ADMIN_ROLE) {
        nearestLocation.style = "display: none";
      } else {
        nearestLocation.style = "display: block";
      }

      whGrid.style = "display: unset";
      setHidden(false);

      setGridData(warehouses);
    }
    run();
  }, [user]);

  return (
    <div>
      <div className="d-flex text-light spinner-container mt-4">
        <Spinner
          className="mt-4 spinner-size"
          animation="border"
          role="status"
          variant="light"
          style={{
            display: hidden ? "inline-block" : "none",
          }}
        />
        <h3 style={{ display: hidden ? "inline-block" : "none" }}>
          Loading data, please wait.
        </h3>
      </div>

      <div id="whGrid" style={{ display: "none" }}>
        <a href="/add">
          <Button variant="success" className="mb-4">
            New
          </Button>
        </a>

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
                      <svg
                        stroke="currentColor"
                        fill="#0d6efd"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5.929 1.757a.5.5 0 1 0-.858-.514L2.217 6H.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.623l1.844 6.456A.75.75 0 0 0 3.69 15h8.622a.75.75 0 0 0 .722-.544L14.877 8h.623a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1.717L10.93 1.243a.5.5 0 1 0-.858.514L12.617 6H3.383L5.93 1.757zM4 10a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 1 1-2 0v-2zm4-1a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1z"></path>
                      </svg>
                    </a>
                  </td>
                  <td>
                    <a href={`/edit/${gd.code}`}>
                      <svg
                        stroke="currentColor"
                        fill="#664d03"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"></path>
                      </svg>
                    </a>{" "}
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => showModal(gd.code)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="red"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
                      </svg>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <div id="nearest-location" className="mb-5">
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
