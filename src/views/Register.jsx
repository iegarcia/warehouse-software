import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { errorMessage } from "../errors/error-message";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      navigate("/");
    } catch (error) {
      const message = errorMessage(error.code);
      setError(message);
    }
  };

  return (
    <div>
      <Container>
        <h2>SignUp</h2>
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
            Register
          </Button>
        </Form>
        <br />
        <h4>
          Already have an account? <a href="/login">Sign In</a>
        </h4>
      </Container>
    </div>
  );
};

export default Register;
