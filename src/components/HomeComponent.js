import React from 'react';
import {Carousel} from 'bootstrap';

const Home = () =>{
    return (
        <div className="img-bg">
        <div className="container p-3 mt-4 rounded">
            <div className="row p-2">
                <div className="col-12 p-3 text-center">
                    <div className="container">
                        <h1 className="text-center"><span className="bg-grad-clip"><i className="fas fa-tint"></i>-factor</span></h1>
                        <small  className="bg-grad-clip">Together, towards a good cause</small>
                    </div>
                </div>
            </div>
            <div className="row p-2">
                <div className="card">
                    <div className="card-body">
                        <p>
                            O-factor is a platform which connects medical organizations like the hospitals and blood banks to the credible blood donors near them.
                            Medical organizations can register themselves under the medical organization category and later call for blood donors
                            near them through a request generation mechanism which enables them to generate a call for nearby donors within
                            some range as specified by the organization.<br />
                            Donors may choose to take up or reject a request. Based on which if he/she chooses to accept a request he/she could
                            directly approach the organization for blood donation. Also in this case, his/her contact details are made available to
                            the organization to establish a contact, for any futher assistance.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row p-2 justify-content-around align-items-center">
                <div className="col-md-5 text-center">
                    <h2>Getting Started</h2>
                </div>
                <div className="col-md-7">
                    <div className="container-fluid">
                        <div className="carousel slide" data-pause="hover" data-touch={true} id="gettingStartedCarousel" data-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title text-center">
                                                Blood Donors
                                            </h4>
                                            <ul type="disc">
                                                <li>
                                                    Click on the Register button in the top right corner of the screen.
                                                </li>
                                                <li>
                                                    Registration form window will show up. In the form select 'Register as a donor' option and fill up other details.
                                                </li>
                                                <li>
                                                    Click on submit button.
                                                </li>
                                                <li>
                                                    After registration you will be logged in automatically. Now you can access your inbox to look out for incoming requests.
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <div className="contaier-fluid">
                                                <div className="row justify-content-around">
                                                    <a className="btn btn-primary" href="#gettingStartedCarousel" data-slide="prev">
                                                        Previous
                                                    </a>
                                                    <a className="btn btn-primary" href="#gettingStartedCarousel" data-slide="next">
                                                        Next
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="card">
                                        <div className="card-body">
                                            <h4 className="card-title text-center">
                                                Medical Organization
                                            </h4>
                                            <ul type="disc">
                                                <li>
                                                    Click on the Register button in the top right corner of the screen.
                                                </li>
                                                <li>
                                                    Registration form window will show up. In the form fill up other details.
                                                </li>
                                                <li>
                                                    Click on submit button.
                                                </li>
                                                <li>
                                                    After registration you will be logged in automatically. Now you can generate and view requests.
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="card-footer">
                                            <div className="contaier-fluid">
                                                <div className="row justify-content-around">
                                                    <a className="btn btn-primary" href="#gettingStartedCarousel" data-slide="prev">
                                                        Previous
                                                    </a>
                                                    <a className="btn btn-primary" href="#gettingStartedCarousel" data-slide="next">
                                                        Next
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Home;