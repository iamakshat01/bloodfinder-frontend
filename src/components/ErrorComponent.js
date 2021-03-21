import React from 'react';

const Error = (props) => {
    return (
        <div className="container-fluid text-center">
            <h1>{props.errMess?props.errMess:"Oops!!! Something Went Wrong!"}</h1>
        </div>
    )
};

export default Error;