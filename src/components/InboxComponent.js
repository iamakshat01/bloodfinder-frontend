import React, {Component} from 'react';
import {Form, Control,actions, Errors} from 'react-redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import myActions from '../redux/actions';
import config from '../config';
import moment from 'moment'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
const RenderPendingInbox = (props) => {
        console.log(props.inbox);
        const all = props.inbox.requests.map(inbox => {
            console.log(inbox);
            return (
                <div className="card w-50 mt-2 ml-2" key={inbox._id}>
                <img className="card-img-top" src="https://docs.microsoft.com/en-us/azure/azure-maps/media/migrate-google-maps-web-app/google-maps-marker.png" alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{inbox.medOrg[0].name}</h5>
                        <p className="card-text">{moment(moment(inbox.medOrg[0].createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</p>
                        <button onClick={props.handleAcceptClick.bind(this,inbox._id)} className="btn btn-primary">Accept</button>
                        <button onClick={props.handleRejectClick.bind(this,inbox._id)} className="btn btn-danger ml-2">Reject</button>
                    </div>
                </div>
            );
        })

        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                {all}
                </div>
            </div>
        );
}

const RenderRejectedInbox = (props) => {
    console.log(props.inbox);
    const all = props.inbox.requests.map(inbox => {
        console.log(inbox);
        return (
            <div className="card w-50 mt-2 ml-2" key={inbox._id}>
            <img className="card-img-top" src="https://docs.microsoft.com/en-us/azure/azure-maps/media/migrate-google-maps-web-app/google-maps-marker.png" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{inbox.medOrg[0].name}</h5>
                    <p className="card-text">{moment(moment(inbox.medOrg[0].createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</p>
                    <button onClick={props.handleAcceptClick.bind(this,inbox._id)} className="btn btn-primary">Accept</button>
                    <button onClick={props.handleRejectClick.bind(this,inbox._id)} className="btn btn-danger ml-2">Reject</button>
                </div>
            </div>
        );
    })

    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
            {all}
            </div>
        </div>
    );
}

const RenderAcceptedInbox = (props) => {
    console.log(props.inbox);
    const all = props.inbox.requests.map(inbox => {
        console.log(inbox);
        return (
            <div className="card w-50 mt-2 ml-2" key={inbox._id}>
            <img className="card-img-top" src="https://docs.microsoft.com/en-us/azure/azure-maps/media/migrate-google-maps-web-app/google-maps-marker.png" alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{inbox.medOrg[0].name}</h5>
                    <p className="card-text">{moment(moment(inbox.medOrg[0].createdAt).format('YYYYMMDD'), "YYYYMMDD").fromNow()}</p>
                    <button onClick={props.handleAcceptClick.bind(this,inbox._id)} className="btn btn-primary">Accept</button>
                    <button onClick={props.handleRejectClick.bind(this,inbox._id)} className="btn btn-danger ml-2">Reject</button>
                </div>
            </div>
        );
    })

    return (
        <div className="container-fluid">
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
            activeTab:'1'
        }
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
        console.log(reqId);
        fetch(config.serverUrl+`donor/accept/:${reqId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.oToken}`
            }
        }).then(res=>{
            if(res.ok){
                alert("Request has been accepted.");
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
        console.log(reqId);
        fetch(config.serverUrl+`donor/reject/${reqId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.oToken}`
            }
        }).then(res=>{
            if(res.ok){
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
                return (
                    
                    <div>
                            <Nav tabs className="mt-5 justify-content-center" >
                            <NavItem >
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Pending
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Accepted
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                >
                                Rejected
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                <Col sm="6" className="mx-auto">
                                    <RenderPendingInbox inbox={this.props.inbox.inbox.find(inbox => inbox.status==="pending")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>  
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                <Col sm="6" className="mx-auto">
                                    <RenderAcceptedInbox inbox={this.props.inbox.inbox.find(inbox => inbox.status==="accepted")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                <Col sm="6" className="mx-auto">
                                    <RenderRejectedInbox inbox={this.props.inbox.inbox.find(inbox => inbox.status==="rejected")} handleAcceptClick={this.handleAcceptClick} handleRejectClick={this.handleRejectClick}/>
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