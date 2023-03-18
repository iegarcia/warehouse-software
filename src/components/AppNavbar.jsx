import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const AppNavbar = () => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
    sessionStorage.clear();
  };

  return (
    <Navbar bg="light" expand="lg" id="navbar">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </>
            ) : (
              <Nav.Link href="#" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
