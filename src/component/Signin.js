import React, { useRef, useState } from "react";
import {
  Button,
  Container,
  Form,
  Header,
  Icon,
  Message,
} from "semantic-ui-react";
import { useAuth } from "./Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

function Signin() {
  const { login, setMesg } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      setMesg("Logged in Succesfull");
      setLoading(true);
      history.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="login" style={{ marginTop: "50px" }}>
      {error && <Message color="red">{error}</Message>}
      <Container>
        <Header as="h2" icon textAlign="center">
          <Icon name="sign-in" circular />
          <Header.Content>Login</Header.Content>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Email</label>
            <input type="email" placeholder="Email" ref={emailRef} required />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Password" ref={passwordRef} />
          </Form.Field>
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
        <p>
          Forgot Password? <Link to="/forget-password">Click me</Link>
        </p>
        <h4>
          Got an Accout Sign here <Link to="/signup">Sign In</Link>
        </h4>
      </Container>
    </div>
  );
}

export default Signin;
