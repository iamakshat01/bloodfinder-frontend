import React, {Component} from 'react';
import {Form, Control,actions, Errors} from 'react-redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import myActions from '../redux/actions';
import config from '../config';
import moment from 'moment'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col, Alert } from 'reactstrap';
import classnames from 'classnames';
import MapContainer from './MapInboxComponent'

function distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1[0] * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2[0] * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2[1]-mk1[1]) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return `${Math.trunc(d)} km`;
}

const RenderPendingInbox = (props) => {
        console.log(props);
        if(!props.inbox)
        {
            return(
                <h6>No Pending Requests</h6>
            )
        }
        const all = props.inbox.requests.map(inbox => {
            console.log(inbox.createdAt)
            return (
                <>
                <div className="card w-100 mt-2 ml-2 mr-2" key={inbox._id}>
                <div style={{height:"300px"}}><MapContainer point={inbox.medOrg[0].location.coordinates} /></div>
                    <div className="card-body">
                        <h5 className="card-title"><i class="fa fa-ambulance"></i> {inbox.medOrg[0].name} <h6 className="col-5 float-right"><i class="fa fa-clock"></i> {moment(moment(inbox.createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</h6></h5>
                        <p className="card-text">
                            <p><i class="fa fa-road" aria-hidden="true"></i> {distance(inbox.medOrg[0].location.coordinates,JSON.parse(localStorage.getItem('oUser')).location.coordinates)}</p>
                        </p>
                        <div className="btn-group">
                            <button onClick={props.handleAcceptClick.bind(this,inbox._id)} className="btn btn-primary ml-2">Accept</button>
                            <button onClick={props.handleRejectClick.bind(this,inbox._id)} className="btn btn-danger ml-2">Reject</button>
                        </div>
                    </div>
                </div>
                </>
            );
        })

        return (
            <div className="container-fluid">
                 {props.msg && <div className="accmsg alert alert-primary">{props.msg}</div>}
                <div className="row justify-content-center">
                {all}
                </div>
            </div>
        );
}

const RenderRejectedInbox = (props) => {
   
   if(!props.inbox)
   {
       return(
           <h6>No Rejected Requests</h6>
       )
   }
    const all = props.inbox.requests.map(inbox => {
        
        return (
            <>
            
            <div className="card w-100 mt-2 ml-2 mr-2" key={inbox._id}>
                <div style={{height:"250px"}}><MapContainer point={inbox.medOrg[0].location.coordinates} /></div>
                <div className="card-body">
                    <h5 className="card-title"><i class="fa fa-ambulance"></i> {inbox.medOrg[0].name} <h6 className="col-5 float-right"><i class="fa fa-clock"></i> {moment(moment(inbox.createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</h6></h5>
                    <p><i class="fa fa-road" aria-hidden="true"></i> {distance(inbox.medOrg[0].location.coordinates,JSON.parse(localStorage.getItem('oUser')).location.coordinates)}</p>
                    <div className="btn-group">
                        <button onClick={props.handleAcceptClick.bind(this,inbox._id)} className="btn btn-primary">Accept</button>
                    </div>
                </div>
            </div>
            </>
        );
    })

    return (
        <div className="container-fluid">
            {props.msg && <div className="accmsg alert alert-primary">{props.msg}</div>}
            <div className="row justify-content-center">
            {all}
            </div>
        </div>
    );
}

const RenderAcceptedInbox = (props) => {
    
    if(!props.inbox)
    {
        return(
            <h6>No Accepted Requests</h6>
        )
    }
    const all = props.inbox.requests.map(inbox => {
       
        return (
            <>
           
            <div className="card w-100 mt-2 ml-2 mr-2" key={inbox._id}>
                <div style={{height:"300px"}}><MapContainer point={inbox.medOrg[0].location.coordinates} /></div>
                <div className="card-body">
                    <h5 className="card-title"><i class="fa fa-ambulance"></i> {inbox.medOrg[0].name} <h6 className="col-5 float-right"><i class="fa fa-clock"></i> {moment(moment(inbox.createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</h6></h5>
                    <p className="card-text">
                        <p><i class="fa fa-road" aria-hidden="true"></i> {distance(inbox.medOrg[0].location.coordinates,JSON.parse(localStorage.getItem('oUser')).location.coordinates)}</p>
                        <p><i class="fa fa-phone-square" aria-hidden="true"></i><a href={`tel:+91-${inbox.medOrg[0].phone}`}> +91-{inbox.medOrg[0].phone}</a></p>
                    </p>
                    
                </div>
            </div>
           </>
        );
    })

    return (
        <div className="container-fluid">
             {props.msg && <div className=" accmsg alert alert-primary">{props.msg}</div>}
            <div className="row justify-content-center">
            {all}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        inbox: state.inbox,
        user: state.auth.user
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchInbox : (props) => dispatch(myActions.fetchInbox(props))
    };
}


class Inbox extends Component{

    constructor(props){
        super(props);
        this.state={
            activeTab:'1',
        }
        this.handleAcceptClick=this.handleAcceptClick.bind(this);
        this.handleRejectClick=this.handleRejectClick.bind(this);
    }

    toggle (tab) {

      if(this.state.activeTab !== tab) 
      {
          this.setState({
              activeTab:tab
          })
      }
    }
    handleAcceptClick (reqId) {
        
        fetch(config.serverUrl+`donor/accept/${reqId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.oToken}`
            }
        }).then(res=>{
            if(res.ok){
                this.props.fetchInbox();
                this.setState({
                    activeTab:'2'
                })
            }
            else{
                var err=new Error(res.statusText);
                err.status=res.status;
                throw err;
            }
        }).catch(err=>{
            alert(err.message);
        });
    }
    handleRejectClick (reqId) {
        
        fetch(config.serverUrl+`donor/reject/${reqId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.oToken}`
            }
        }).then(res=>{
            if(res.ok){
                this.props.fetchInbox();
                this.setState({
                    activeTab:'3'
                })
                alert("Request has been rejected.");
            }
            else{
                var err=new Error(res.statusText);
                err.status=res.status;
                throw err;
            }
        }).catch(err=>{
            alert(err.message);
        });
    }
    componentWillMount()
    {
        this.props.fetchInbox();
    }
    render(){
        const style = {
            color: 'rgb(102, 0, 0)',
            fontSize: 17
        };
        if(this.props.inbox.inbox.fetching_inbox)
        {
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                    <i className="fas fa-spinner fa-pulse"></i><br/>
                    Loading
                    </div>
                </div>
            );
        }
        else
        {
            if(this.props.inbox.inbox.length === 0){
                return (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <div className="text-center">
                            No Requests to display.
                        </div>
                    </div>
                );
            }
            else{
                var pend=this.props.inbox.inbox.find(inbox => inbox.status==="pending")
                if(pend)
                pend=pend.requests.length
                else
                pend=0
                return (
                    
                    <div>
                            <Nav tabs className="mt-5 justify-content-center" >
                            <NavItem >
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                style={style}
                                >
                                Pending ({pend})
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                style={style}
                                >
                                Accepted 
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                style={style}
                                >
                                Rejected
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                <Col md="4" className="mx-auto">
                                    <RenderPendingInbox msg={this.state.msg} inbox={this.props.inbox.inbox.find(inbox => inbox.status==="pending")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>  
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                <Col md="4" className="mx-auto">
                                    <RenderAcceptedInbox msg={this.state.msg} inbox={this.props.inbox.inbox.find(inbox => inbox.status==="accepted")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                <Col md="4" className="mx-auto">
                                    <RenderRejectedInbox msg={this.state.msg} inbox={this.props.inbox.inbox.find(inbox => inbox.status==="rejected")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>
                                </Col>
                                </Row>
                            </TabPane>
                            </TabContent>
                    </div>

                   
                );
            }
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Inbox));