import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Actions from '../redux/actions';
import ErrorComponent from './ErrorComponent';

const mapStateToProps = (state) => {
    return {
        reqs: state.requests,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRequests: ()=>dispatch(Actions.fetchRequests()),
    };
};

const RenderReqs = (props) => {
    if(props.reqs.length===0){
        return (
            <div className="container-fluid text-center" style={{height: "80vh"}}>
                <h1>No requests to display.</h1>
            </div>
        );
    }
    else{
        var reqDisplay = props.reqs.map(req=>{
            return (
                <div className="col mb-4" key={req._id}>
                    <div className="card mt-2">
                        <div className="card-img-top align-self-center"><h1 className="text-center p-5 bg-grad-clip">{req.blood_group}</h1></div>
                        <div className="card-body">
                            <div className="container-fluid">
                                <dl className="row">
                                    <dt className="col-12 col-md-6">
                                        Status
                                    </dt>
                                    <dd className="col-12 col-md-6">
                                        {req.status}
                                    </dd>
                                    <dt className="col-12 col-md-6">
                                        Requirement:
                                    </dt>
                                    <dd className="col-12 col-md-6">
                                        {req.units} {req.units>1?"units":"unit"}
                                    </dd>
                                    <dt className="col-12 col-md-6">
                                        Units&nbsp;Claimed&nbsp;:
                                    </dt>
                                    <dd className="col-12 col-md-6">
                                        {req.claimed} {req.claimed>1?"units":"unit"}
                                    </dd>
                                    <dt className="col-12 col-md-6">
                                        Units yet to be claimed:
                                    </dt>
                                    <dd className="col-12 col-md-6">
                                        {req.units-req.claimed} {(req.units-req.claimed)>1?"units":"unit"}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row mt-2">
                                <Link className="btn btn-primary" to={`/med/requests/${req._id}`}>Details</Link>
                                <small className="ml-auto">{new Date(req.createdAt).toLocaleString()}</small>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container justify-content-center">
                <div className="row row-cols-1 row-cols-md-2">
                    {reqDisplay}
                </div>
            </div>
        )
    }
}

class Requests extends Component{
    constructor(props){
        super(props);
        this.props.fetchRequests();
    }
    
    render(){
        if(!(this.props.user && this.props.user.category==='med')){
            this.props.history.goBack();
        }
        else{
            if(this.props.reqs.reqFailed){
                return (
                    <div className="container">
                        <ErrorComponent />
                    </div>
                );
            }
            else{
                    var openReqs=this.props.reqs.reqs.filter(req => {
                        return req.status==='open'
                    });
                    var closedReqs=this.props.reqs.reqs.filter(req => {
                        return req.status==='closed'
                    });
                    return (
                        <div className="container bg-white">
                            <div className="row justify-content-center">
                                <h1>Requests Panel</h1>
                            </div>
                            <div className="container-fluid">
                            <ul className="nav nav-tabs nav-fill" id="reqTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="openReq-tab" data-toggle="tab" href="#openReq" role="tab" aria-controls="Open Requests" aria-selected="true">Open</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="closedReq-tab" data-toggle="tab" href="#closedReq" role="tab" aria-controls="Closed Requests" aria-selected="false">Closed</a>
                                </li>
                            </ul>
                            <div className="tab-content" id="reqTabContent">
                                <div className="tab-pane fade show active" id="openReq" role="tabpanel" aria-labelledby="openReq-tab">
                                    <RenderReqs reqs={openReqs} />
                                </div>
                                <div className="tab-pane fade" id="closedReq" role="tabpanel" aria-labelledby="closedReq-tab">
                                    <RenderReqs reqs={closedReqs} />
                                </div>
                            </div>
                            </div>
                        </div>
                    );
            }
        }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Requests));