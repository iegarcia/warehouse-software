import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "./firebaseConfig";
import "bootswatch/dist/morph/bootstrap.min.css";
import Loading from "./components/Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>
);

setTimeout(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 1000);
