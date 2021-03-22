import React from 'react';

const Loading = () => {
    return (
        <div className="container align-items-center justify-content-center" style={{height: "80vh"}}>
            <div className="row justify-content-center align-items-center h-100">
                <div className="col-12 text-center">
                    <i className="fas fa-spinner fa-pulse fa-5x"></i><br/>
                    <h3>Loading...</h3>
                </div>
            </div>
        </div>
    );
};

export default Loading;