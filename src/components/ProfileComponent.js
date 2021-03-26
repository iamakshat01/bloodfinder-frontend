import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SimpleMap from './SimpleMapComponent';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

class Profile extends Component{

    constructor(props){
        super(props);
    }

    render(){
        if(!this.props.user){
            this.props.history.goBack();
        }
        else{
            var user=this.props.user;
            var center={
                username: user.username,
                lat: user.location[1],
                lng: user.location[0]
            }
            return (
                <div className="container" style={{minHeight: "80vh"}}>
                    <div className="row mt-2 justify-content-center">
                        <h1>Profile</h1>
                    </div>
                    <div className="row mt-2 align-items-center">
                        <div className="col-12 col-md-6 text-center order-2 order-md-1">
                            <SimpleMap center={center} />
                        </div>
                        <div className="col-12 col-md-6 order-1 order-md-2">
                            <h3>
                                User Information:
                            </h3>
                            <div className="card myBgSide">
                                <div className="card-body">
                                    <div className="container-fluid">
                                        <dl className="row">
                                            <dt className="col-12 col-md-6">
                                                Username:
                                            </dt>
                                            <dd className="col-12 col-md-6">
                                                {user.username}
                                            </dd>
                                            <dt className="col-12 col-md-6">
                                                Name:
                                            </dt>
                                            <dd className="col-12 col-md-6">
                                                {user.name}
                                            </dd>
                                            <dt className="col-12 col-md-6">
                                                Phone:
                                            </dt>
                                            <dd className="col-12 col-md-6">
                                                    <i className="fas fa-phone"></i> {user.phone}
                                            </dd>
                                            <dt className="col-12 col-md-6">
                                                Email:
                                            </dt>
                                            <dd className="col-12 col-md-6">
                                                    <i className="fas fa-envelope"></i> {user.email}
                                            </dd>
                                            <dt className="col-12 col-md-6">
                                                Category:
                                            </dt>
                                            <dd className="col-12 col-md-6">
                                                {user.category === 'med' ? "Medical Organization": "Donor"}
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            {   user.category === 'donor'? (
                                <>
                                    <h3>
                                        Personal Information:
                                    </h3>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="container-fluid">
                                                <dl className="row">
                                                    <dt className="col-12 col-md-6">
                                                        Blood Group:
                                                    </dt>
                                                    <dd className="col-12 col-md-6">
                                                        {user.blood_group}
                                                    </dd>
                                                    <dt className="col-12 col-md-6">
                                                        Date of Birth:
                                                    </dt>
                                                    <dd className="col-12 col-md-6">
                                                        {new Date(user.birth_date).toLocaleDateString()}
                                                    </dd>
                                                </dl>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ): <></>
                            }
                        </div>
                    </div>
                    <div className="row">
                    
                    </div>
                </div>
            )
        }
    }
};

export default withRouter(connect(mapStateToProps)(Profile));