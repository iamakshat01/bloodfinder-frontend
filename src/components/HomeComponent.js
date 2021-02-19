import React from 'react';

const Home = () =>{
    return (
        <div className="container p-3 mygrad mt-4 rounded">
            <div className="row p-2">
                <div className="col-12 p-3">
                    <div className="container">
                        <h1 className="text-center"><span className="bg-grad-clip">O-factor</span></h1>
                    </div>
                </div>
            </div>
            <div className="row p2">
                <div className="col-12 col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-center">
                                <h5>What is O-Factor?</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4 mb-2">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-center">
                                <h5>How does O-Factor work?</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title text-center">
                                <h5>How can you contribute?</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;