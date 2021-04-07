import React,{Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import myActions from '../redux/actions';
import ErrorComponent from './ErrorComponent';
import MapComponent from './MapComponent';
import Loading from './LoadingComponent';

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        reqInfo: state.reqInfo
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReqInfo: (reqId) => dispatch(myActions.fetchReqInfo(reqId)),
        resetReqInfo: () => dispatch(myActions.reqInfoReset())
    };
};

const RenderDonors = (props) => {
    if(props.donors.length===0){
        return (
            <ErrorComponent errMess={"No donors to display."} />
        );
    }
    else{
        var classes=['fas','fa-user-check','fa-3x'];
        if(props.accepted){
            classes.push('text-success');
        }
        else if(props.rejected){
            classes.push('text-danger');
        }
        else if(props.pending){
            classes.push('text-warning');
        }
        var donorsList = props.donors.map(donor => {
            return (
            <li className="media mt-2 mb-2 align-items-center mygrad p-2 rounded" key={donor._id}>
                <div className=" mr-3">
                    <i className={classes.join(" ")}></i>
                </div>
                <div className="media-body">
                    <div className="row">
                        <div className="col-md-6">
                            <strong>Username:</strong> {donor.username}
                        </div>
                        <div className="col-md-6">
                            <strong>Name:</strong> {donor.name}
                        </div>
                    </div>
                    {
                        props.accepted? (
                            <div className="row">
                                <a className="btn btn-success" href={`tel:${props.phone}`}><i className="fas fa-phone"></i> Call</a>
                                <a className="btn btn-danger" href={`mailto:${props.email}`}><i className="fas fa-envelope"></i> Email</a>
                            </div>
                        ):<></>
                    }
                </div>
            </li>
            );
        });
        return (
            <div className="container p-2">
                <ul className="list-unstyled">
                    {donorsList}
                </ul>
            </div>
        );
    }
}

class ReqInfo extends Component{
    constructor(props){
        super(props);
        //console.log("Const");
        this.props.fetchReqInfo(this.props.match.params.reqId);
    }

    render(){
        if(!(this.props.user && this.props.user.category==='med')){
            this.props.history.goBack();
        }
        else{
            if(this.props.reqInfo.reqInfo_loading){
                return (
                    <Loading />
                );
            }
            else if(this.props.reqInfo.reqInfo_failed){
                this.props.history.goBack();
                return (
                    <div className="container">
                        <div className="container-fluid align-items-center justify-content center" style={{height: "80vh"}}>
                            <ErrorComponent errMess={this.props.reqInfo.error} />
                        </div>
                    </div>
                );
            }
            else if(Object.keys(this.props.reqInfo.reqInfo).length===0){
                return (
                    <div className="container">
                        <div className="container-fluid align-items-center justify-content center" style={{height: "80vh"}}>
                            <ErrorComponent errMess={"Please wait..."} />
                        </div>
                    </div>
                );
            }
            else{
                var request = this.props.reqInfo.reqInfo.request;
                var responses = this.props.reqInfo.reqInfo.responses;
                var center = {
                    lng: this.props.user.location.coordinates[0],
                    lat: this.props.user.location.coordinates[1],
                    _id: this.props.user._id,
                    username: this.props.user.username,
                };
                var accDon = responses.filter(res => {
                    return res._id==='accepted'
                });
                if(accDon.length>0){
                    accDon=accDon[0].donors;
                }
                var accLocations = [];
                if(accDon.length>0){
                    accLocations = accDon.map(donor => {
                        return(
                            {
                                _id: donor._id,
                                username: donor.username,
                                lng: donor.location.coordinates[0],
                                lat: donor.location.coordinates[1]
                            }
                        );
                    })
                }
                var penDon = responses.filter(res => {
                    return res._id==='pending'
                });
                if(penDon.length>0){
                    penDon=penDon[0].donors;
                }
                var penLocations = [];
                if(penDon.length>0){
                    penLocations = penDon.map(donor => {
                        return(
                            {
                                _id: donor._id,
                                username: donor.username,
                                lng: donor.location.coordinates[0],
                                lat: donor.location.coordinates[1]
                            }
                        );
                    })
                }
                var rejDon = responses.filter(res => {
                    return res._id==='rejected'
                });
                if(rejDon.length>0){
                    rejDon=rejDon[0].donors;
                }
                var rejLocations = [];
                if(rejDon.length>0){
                    rejLocations = rejDon.map(donor => {
                        return(
                            {
                                _id: donor._id,
                                username: donor.username,
                                username: donor.username,
                                lng: donor.location.coordinates[0],
                                lat: donor.location.coordinates[1]
                            }
                        );
                    })
                }
                return (
                    <div className="img-bg">
                    <div className="container mt-2 p-2">
                        <div className="row">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/med/requests">Requests</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{request._id}</li>
                            </ol>
                        </nav>
                        </div>
                        <div className="row bg-white rounded mt-2 p-2 justify-content-around">
                            <div className="col-md-4 justify-content-center d-flex bg-grad-clip text-center align-items-center">
                                <h1 className="rounded-circle border border-2 border-danger p-5">{request.blood_group}</h1>
                            </div>
                            <div className="col-md-7">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="container-fluid">
                                            <dl className="row">
                                                <dt className="col-12 col-md-6">
                                                    Status
                                                </dt>
                                                <dd className="col-12 col-md-6">
                                                    {request.status}
                                                </dd>
                                                <dt className="col-12 col-md-6">
                                                    Requirement:
                                                </dt>
                                                <dd className="col-12 col-md-6">
                                                    {request.units} {request.units>1?"units":"unit"}
                                                </dd>
                                                <dt className="col-12 col-md-6">
                                                    Units&nbsp;Claimed&nbsp;:
                                                </dt>
                                                <dd className="col-12 col-md-6">
                                                    {request.claimed} {request.claimed>1?"units":"unit"}
                                                </dd>
                                                <dt className="col-12 col-md-6">
                                                    Units yet to be claimed:
                                                </dt>
                                                <dd className="col-12 col-md-6">
                                                    {request.units-request.claimed} {(request.units-request.claimed)>1?"units":"unit"}
                                                </dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="row mt-2">
                                            <small className="mr-auto">{new Date(request.createdAt).toLocaleString()}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row bg-white rounded mt-2 mb-2 p-2">
                            <div className="col-md-6">
                                <ul className="nav nav-tabs" id="responsesTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link active" id="accepted-tab" data-toggle="tab" href="#accepted" role="tab" aria-controls="accepted" aria-selected="true">Accepted <span className="rounded-pill border border-secondary">{accDon.length}</span></a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="pending-tab" data-toggle="tab" href="#pending" role="tab" aria-controls="pending" aria-selected="false">Pending <span className="rounded-pill border border-secondary"> {penDon.length} </span></a>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <a className="nav-link" id="rejected-tab" data-toggle="tab" href="#rejected" role="tab" aria-controls="rejected" aria-selected="false">Rejected <span className="rounded-pill border border-secondary"> {rejDon.length} </span></a>
                                    </li>
                                </ul>
                                <div className="tab-content" id="responsesTabContent">
                                    <div className="tab-pane fade show active" id="accepted" role="tabpanel" aria-labelledby="accepted-tab">
                                        <RenderDonors donors={accDon} accepted={true} />
                                    </div>
                                    <div className="tab-pane fade" id="pending" role="tabpanel" aria-labelledby="pending-tab">
                                        <RenderDonors donors={penDon} pending={true} />
                                    </div>
                                    <div className="tab-pane fade" id="rejected" role="tabpanel" aria-labelledby="rejected-tab">
                                        <RenderDonors donors={rejDon} rejected={false} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <MapComponent center={center} accLocations={accLocations} penLocations={penLocations} rejLocations={rejLocations} google={window.google}/>
                            </div>
                        </div>
                    </div>
                    </div>
                );
            }
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ReqInfo));