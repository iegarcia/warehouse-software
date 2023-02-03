import { Container } from "react-bootstrap";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import AppNavbar from "./components/AppNavbar";
import AddWarehouse from "./views/AddWarehouse";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import "./App.css";
import AuthProvider from "./context/AuthContext";
import { ProtectedRoutes } from "./components/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <AppNavbar />
          <Container>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/add"
                element={
                  <ProtectedRoutes>
                    <AddWarehouse editar={false} />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoutes>
                    <AddWarehouse editar={true} />
                  </ProtectedRoutes>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Container>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
