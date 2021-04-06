import React from 'react';

const About = () =>{
    return (
        <div className="img-bg">
        <div className="container p-3 mt-4 rounded">
            <div className="row p-2">
                <div className="col-12 p-3">
                    <div className="container">
                        <h1 className="text-center"><span className="bg-grad-clip">About Us</span></h1>
                    </div>
                </div>
            </div>
            <div className="row align-items-center p-2">
                <div className="col-md-7 col-l-8 p-2 order-1 order-md-0">
                    <div className="card w-75 ml-auto mr-auto mb-2">
                        <div className="card-body">                                
                            <blockquote className="blockquote">
                                <i className="fas fa-quote-left float-left fa-3x"></i>
                                <p className="p-2" style={{clear:"both"}}> Hi, I am in urgent need of B+ blood units. Spent whole night searching in so many blood banks but got no success. Please help us in arranging the units.</p>
                            </blockquote>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">                                    
                                    <p>
                                        Every now and then, we come across messages like the one displayed here, over internet and other social media platforms, seeking blood donors urgently.
                                        So, we thought of creating a platform to connect the hospitals or the blood banks to the blood donors who can be reached out to in case of an emergency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                    
                <div className="col-md-5 col-l-4 order-0 order-md-1 align-items-center">
                    <h1 className="text-center">Motivation for <span className="bg-grad-clip"><i className="fas fa-tint"></i>-factor</span></h1>
                </div>
            </div>
            <div className="row align-items-center p-2">
                <div className="col-md-7 col-l-8 p-2 order-1">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">                                    
                                    <p>
                                        O-factor is a platform where the hospitals (or blood banks) can connect to a large number of registered blood donors
                                        which they can then reach out to in case of an emergency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                    
                <div className="col-md-5 col-l-4 order-0 align-items-center">
                    <h1 className="text-center">What is <span className="bg-grad-clip"><i className="fas fa-tint"></i>-factor</span>?</h1>
                </div>
            </div>
            <div className="row align-items-center p-2">
                <div className="col-md-7 col-l-8 p-2 order-1 order-md-0">
                    <div className="card">
                        <div className="card-body">
                            <div className="container-fluid">
                                <div className="row">                                    
                                    <p>
                                        O-factor is designed in such a way so as to avoid the problems faced by people in searching for blood donors urgently.
                                        Here, finding blood donors is as easy as a child's play. All that is needed for a hospital is to be registered on the
                                        site and then generate a simple request which is then posted to the donors handpicked by the hospital from the list of 
                                        nearby donors provided during the request genration process, based on the range input.<br />
                                        Then, if a donor accepts that request, he/she could directly approact the hospital and his/her contact details are also made available to the hospital to contact him/her.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                    
                <div className="col-md-5 col-l-4 order-0 order-md-1 align-items-center">
                    <h1 className="text-center">How <span className="bg-grad-clip"><i className="fas fa-tint"></i>-factor</span> works?</h1>
                </div>
            </div>
        </div>
        </div>
    );
};

export default About;