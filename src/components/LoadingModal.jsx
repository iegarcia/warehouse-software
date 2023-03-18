import { Modal, Spinner } from "react-bootstrap";

const LoadingModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="d-flex text-light justify-content-center align-items-center flex-column"
        style={{
          height: "30vh",
        }}
      >
        <Spinner
          animation="border"
          role="status"
          variant="info"
          style={{ width: "100px", height: "100px" }}
        />
        <br />
        <h4 className="mt-4">{props.text}</h4>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingModal;
