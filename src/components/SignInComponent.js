import React, { Component } from "react";
import {
  Button,
  Row,
  Col,
  Label,
} from "reactstrap";
import {Link} from 'react-router-dom';
import { Control, Form, Errors } from "react-redux-form";
import Error from './ErrorComponent'

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values,e) {
    const user={
        username:values.username,
        password:values.password,
        category:values.category,
        history: this.props.history
    };
    //console.log(this.props);
    this.props.logIn(user);
    e.preventDefault();
  }

  render() {
    const style = {
      color: 'rgb(102, 0, 0)',
      fontSize: 27
    };
    return (
      <div className="img-bg">
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h3 style={style}>Sign In</h3>
            <hr />
          </div>
        </div>
        
        <div className="row row-content">
          
          <div className="col-12 col-md-9">
            <Form model="signin" onSubmit={(values,e) => this.handleSubmit(values,e)}>
             
            <Row className="form-group">
                <Col md={6}>
                  <div className="form-check">
                  <Label check>
                  <Control.radio
                      model=".category"
                      value="donor"
                      checked
                  />{" "}
                    <strong>Sign In as a Donor</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={6} className="justify-content-center">
                  <div className="form-check">
                  <Label check>
                  <Control.radio
                      model=".category"
                      value="med"
                  />{" "}
                    <strong>Sign In as a Medical Organization</strong>
                    </Label>
                  </div>
                </Col>
              </Row>
              <Error/>
              <Row className="form-group mt-3">
                <Label htmlFor="username" md={2}>
                   Username
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".username"
                    id="username"
                    name="username"
                    placeholder="Username"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Col>
              </Row>
             
             
              <Row className="form-group">
                <Label htmlFor="password" md={2}>
                  Password
                </Label>
                <Col md={10}>
                  <Control type="password"
                    model=".password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".password"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 12 }} className="text-center">
                  <Button type="submit" color="primary">
                    SignIn
                  </Button>
                </Col>
              </Row>
            </Form>
            <div className="col-12 text-center">
                    New User? <Link to="/auth/signup">Register Here</Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default SignIn;
