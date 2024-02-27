import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AddWarehouse from "./views/AddWarehouse";
import Home from "./views/Home";
import "./App.css";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          {/* <AppNavbar /> */}
          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddWarehouse editar={false} />} />
              <Route
                path="/edit/:id"
                element={<AddWarehouse editar={true} />}
              />
            </Routes>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
