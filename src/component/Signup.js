import React, { useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Form, Header, Icon, Button, Message } from "semantic-ui-react";
import { useAuth } from "./Context/AuthContext";

import { updateProfile } from "@firebase/auth";

function Signup() {
  const { signup, setMesg } = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const passwordConfirmRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password Do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      setMesg("Account is created Successfully");
      history.push("/dashboard");
    } catch (err) {
      if (err.message.includes("auth/weak-password")) {
        return setError("Weak Password ");
      } else if (err.message.includes("auth/email-already-in-use")) {
        return setError("Email in use mate");
      } else {
        return setError("Email could not be created");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="signup" style={{ marginTop: "50px" }}>
        <Container>
          {error && <Message color="red">{error}</Message>}
          <Header as="h2" icon textAlign="center">
            <Icon name="signup" circular />
            <Header.Content>Signup</Header.Content>
          </Header>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                type="text"
                placeholder="User Name"
                ref={nameRef}
                required
              />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <input type="email" placeholder="Email" ref={emailRef} required />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input type="password" placeholder="Password" ref={passwordRef} />
            </Form.Field>
            <Form.Field>
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Pass"
                ref={passwordConfirmRef}
              />
            </Form.Field>
            <Form.Field></Form.Field>
            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </Form>
          <div class="ui icon message">
            <i class="question icon"></i>
            <div class="content">
              <div class="header">Already have an account?</div>
              <p>
                <Link to="/signin">Sign here</Link>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Signup;
