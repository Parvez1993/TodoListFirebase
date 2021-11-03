import React from "react";
import { Container } from "react-bootstrap";
import { Header, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
function Homepage() {
  return (
    <Wrapper>
      <Container>
        <div className="header">
          <Header as="h2" icon textAlign="center">
            <Icon name="sticky note outline" />
            Todo List
            <Header.Subheader>
              This is a todo list. You need to register to save your list.
            </Header.Subheader>
          </Header>
        </div>
        <div className="buttons">
          <Button.Group>
            <Link to="/signup">
              <Button>Create Account</Button>
            </Link>
            <Button.Or />

            <Link to="/signin">
              <Button positive>Login</Button>
            </Link>
          </Button.Group>
        </div>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  .header {
    margin-top: 200px;
  }
  .buttons {
    display: flex;
    justify-content: center;
  }
`;
export default Homepage;
