import React, { Component } from "react";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { notification } from "antd";
import Axios from "axios";
import { API_URL } from "../../../Helpers/api";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleSubmit = () => {
    Axios.post(API_URL + "login", this.state)
      .then(response => {
        if (response.data && response.data.success) {
          window.localStorage.setItem("isLogin", true);
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify(response.data.message)
          );
          this.props.history.push("/dashboard");
          notification.success({
            message: "Success",
            description: "You have been logged in successfully"
          });
        } else {
          notification.error({
            message: "Error",
            description: response.data.message
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    return (
      <div
        className="app flex-row align-items-center"
        style={{
          backgroundImage: `url(${require("./BG.jpg")})`,
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          overflow: "hidden"
        }}
      >
        <Container style={{ opacity: 0.9 }}>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          value={this.state.email}
                          placeholder="Email"
                          autoComplete="email"
                          onChange={event =>
                            this.setState({ email: event.target.value })
                          }
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          value={this.state.password}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          onChange={event =>
                            this.setState({ password: event.target.value })
                          }
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={() => this.handleSubmit()}
                          >
                            Login
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
