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
import { Link, withRouter } from "react-router-dom";
import Actions from '../redux/actions';
import {connect} from 'react-redux';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const validBgroup = val => /^(A|B|AB|O)[+-]$/i.test(val);



const mapDispatchToProps = (dispatch) => {
  return {
      register: (cred)=> dispatch(Actions.register(cred))
  };
};

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude:'',
      longitude:'',
      category:'med'
    };
    console.log(props);
    this.getLocation = this.getLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.locfunc = this.locfunc.bind(this);
    this.showError = this.showError.bind(this);
    this.displayLocation = this.displayLocation.bind(this);
    this.categorychange = this.categorychange.bind(this);
  }
  getLocation () {
    
    const options = {
      enableHighAccuracy: true
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocation, this.showError, options);
    } else {
      //M.toast({ html: "Sorry, your browser does not support this feature... Please Update your Browser to enjoy it", classes: "rounded" });
    }
  }
  locfunc(e) {
    // actionBtn.style.display = "none";
    // call Materialize toast to update user 
    //M.toast({ html: 'fetching your current location', classes: 'rounded' });
    // get the user's position
    this.getLocation();
  }
  
  showError(error){
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("You denied the request for your location.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Your Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("Your request timed out. Please try again");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred please try again after some time.");
        break;
      default:
        alert("An unknown error occurred please try again after some time.");
        break;
    }
  }
  displayLocation(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    this.setState({
      latitude: lat,
      longitude: lng
    })
    console.log( `Current Latitude is ${lat} and your longitude is ${lng}` );
  }
  categorychange(e){
    //console.log('aa',this.props.category);
    if(this.state.category==="med")
      {
        this.setState({
          category:"donor"
        })
      }
    else
      {
        this.setState({
          category:"med"
        })
      }
  }
  handleSubmit(values) {

    const medOrg={
        name:values.name,
        username:values.username,
        email:values.email,
        phone:values.phone,
        password:values.password,
        location: 
        {
            type: "Point",
            coordinates: [this.state.latitude,this.state.longitude]
        },
        cat:"med"
    }
    const donor={
        name:values.name,
        username:values.username,
        email:values.email,
        phone:values.phone,
        password:values.password,
        location: 
        {
            type: "Point",
            coordinates: [this.state.latitude,this.state.longitude]
        },
        blood_group:values.blood,
        birth_date:values.dob,
        cat:"donor"
      }
      if(this.state.category==="med")
      {
        this.props.register(medOrg);
      }
      else
      {
        this.props.register(donor);
      }
  }

  render() {
    return (
      <div className="img-bg">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3>SignUp</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-9">
            <Form model="signup" onSubmit={values => this.handleSubmit(values)}>
              <Row className="form-group">
                <Label htmlFor="name" md={2}>
                  Name
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".name"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
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
                <Label htmlFor="phone" md={2}>
                  Contact No.
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".phone"
                    id="phone"
                    name="phone"
                    placeholder="Phone Number"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(10),
                      maxLength: maxLength(10),
                      isNumber
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".phone"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be containing 10 digits",
                      maxLength: "Must be containing 10 digits",
                      isNumber: "Must be a number"
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Control.text
                    model=".email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    validators={{
                      required,
                      validEmail
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: "Required",
                      validEmail: "Invalid Email Address"
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
                <Label  md={2}>
                  Address
                </Label>
                <Col md={10}>
                  <Button className="btn" color="primary" onClick={this.locfunc}>
                    Use My Location
                  </Button>
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 6, offset: 2 }}>
                  <div className="form-check">
                  <Label check>
                  <Input
                      type="checkbox"
                      onChange={this.categorychange}
                      checked={this.state.category==="donor"}
                  />{" "}
                    <strong>Register as a donor?</strong>
                    </Label>
                  </div>
                </Col>
              </Row>
              {this.state.category==="donor" && 
                <Row className="form-group">
                  <Label htmlFor="blood" md={2}>
                    Blood Group
                  </Label>
                  <Col md={10}>
                    <Control.text
                      model=".blood"
                      id="blood"
                      name="blood"
                      placeholder="Blood Group"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(2),
                        maxLength: maxLength(3),
                        validBgroup
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".blood"
                      show="touched"
                      messages={{
                        required: "Required",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 3 characters or less",
                        validBgroup:"Please write a valid blood group"
                      }}
                    />
                  </Col>
                </Row>
              }
              {this.state.category==="donor" && 
                <Row className="form-group">
                  <Label htmlFor="dob" md={2}>
                    Date of Birth
                  </Label>
                  <Col md={10}>
                    <Control type="date"
                      model=".dob"
                      id="dob"
                      name="dob"
                      placeholder="Date of Birth"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".dob"
                      show="touched"
                      messages={{
                        required: "Required",
                       
                      }}
                    />
                  </Col>
                </Row>
              }
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
      </div>
    );
  }
}

export default withRouter(connect(null,mapDispatchToProps)(SignUp));
