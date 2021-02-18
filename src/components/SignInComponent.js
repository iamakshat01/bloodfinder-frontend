import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Label,
  Input
} from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.categorychange = this.categorychange.bind(this);
  }
  categorychange(e){
    if(this.props.category=="med")
      this.props.categorydonor();
    else
      this.props.categorymed();
  }
  handleSubmit(values) {

    const medOrg={
        username:values.username,
        password:values.password
    }
    const donor={
        username:values.username,
        password:values.password
      }
      if(this.props.category=="med")
      {
        this.props.logIn(medOrg);
      }
      else
      {
        this.props.logIn(donor);
      }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>SignIn</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-9">
            <Form model="signin" onSubmit={values => this.handleSubmit(values)}>
             
            <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                  <Label check>
                  <Input
                      type="checkbox"
                      onChange={this.categorychange}
                      checked={this.props.category=="donor"}
                  />{" "}
                    <strong>SignIn as a donor?</strong>
                    </Label>
                  </div>
                </Col>
              </Row>
              <Row className="form-group">
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
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
