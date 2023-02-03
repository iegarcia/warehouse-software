import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      className="d-flex text-light justify-content-center"
      style={{
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#141622",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        variant="light"
        style={{ width: "100px", height: "100px" }}
      />
      <h2>Loading. Please wait.</h2>
    </div>
  );
};

export default Loading;
