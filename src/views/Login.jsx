import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../errors/error-message";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      navigate("/");
    } catch (error) {
      const message = errorMessage(error.code);
      console.log(error.code);
      setError(message);
    }
  };

  return (
    <div className="login">
      <Container>
        <h2>Login</h2>
        <br />
        {error && <Alert variant={"danger"}>{error} </Alert>}
        <Form className="d-flex login-form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Control
              type="email"
              name="email"
              placeholder="cosme-fulanito@gmail.com"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Control
              type="password"
              name="password"
              placeholder="******"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <br />
        <h4>
          Don't have an account <a href="/register">Signup free</a>
        </h4>
      </Container>
    </div>
  );
};

export default Login;
