import React from "react";
import { Button, Modal } from "react-bootstrap";

const DirectionsModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <ul>
          {props.details.map((s, idx) => {
            return (
              <li className="mb-3 directions-text" key={idx}>
                {s.instruction}
              </li>
            );
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DirectionsModal;
