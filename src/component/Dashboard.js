import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {
  Grid,
  Segment,
  Image,
  Divider,
  Form,
  Button,
  Modal,
  Header,
} from "semantic-ui-react";
import { useAuth } from "./Context/AuthContext";
import styled from "styled-components";
function Dashboard() {
  let [task, setTask] = useState("");
  let [edit, setEdit] = useState(false);
  let [temp, setTemp] = useState("");

  const {
    sendData,
    currentUser,
    todo,
    deleteData,
    newTask,
    setNewTask,
    updateForm,
    mesg,
    setMesg,
  } = useAuth();

  //handle modal button

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendData(task);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setMesg("");
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, []);
  const handleEdit = (e, id) => {
    setEdit(!edit);
    // console.log(id);
    updateForm(id);
  };

  console.log("name", currentUser);

  return (
    <>
      <Wrapper>
        <Container>
          {mesg !== "" ? (
            <div class="ui black message">
              <h4>{mesg}</h4>
            </div>
          ) : (
            ""
          )}

          <Segment>
            <Grid columns={2} relaxed="very">
              <Grid.Column>
                {currentUser ? (
                  <Header as="h3" color="green">
                    Welcome {currentUser.displayName}
                  </Header>
                ) : (
                  `Login Again`
                )}
                <h4>Fill out the tasks you need to do here</h4>

                <Form>
                  <Form.TextArea
                    label="Type Here"
                    placeholder="Your Task..."
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                  />
                  <Button primary onClick={handleSubmit}>
                    Save
                  </Button>
                </Form>
              </Grid.Column>
              <Grid.Column>
                <h4>Your Tasks</h4>
                <div className="ui divided items">
                  {todo !== ""
                    ? todo
                        .filter((item) => item.userId === currentUser.uid)
                        .map((item, k) => {
                          return (
                            <div className="item" key={k}>
                              <div className="info">
                                {console.log(item.task)}
                                <div className="middle aligned content">
                                  <input
                                    type="text"
                                    disabled={edit === false}
                                    value={edit ? newTask : item.task}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    className={
                                      edit
                                        ? "input_field"
                                        : "input_field active"
                                    }
                                  />
                                </div>
                                <div className="buttons">
                                  <Button
                                    color="green"
                                    onClick={(e) => {
                                      handleEdit(e, item.id);
                                    }}
                                  >
                                    {edit ? "Submit" : "Edit"}
                                  </Button>
                                  <Button
                                    color="red"
                                    onClick={() => {
                                      deleteData(item.id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                    : "Empty or Write Something"}
                </div>
              </Grid.Column>
            </Grid>

            <Divider vertical></Divider>
          </Segment>
        </Container>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 30vh 0;
  background: lightcyan;
  .info {
    display: flex;
    justify-content: space-between;
    width: 400px;
  }
  .input_field {
    color: black;
  }
  .input_field.active {
    border: none;
  }
`;

export default Dashboard;
