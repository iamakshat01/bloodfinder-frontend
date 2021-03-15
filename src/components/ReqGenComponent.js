import React, {Component} from 'react';
import {Form, Control,actions, Errors} from 'react-redux-form';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import myActions from '../redux/actions';
import config from '../config';

const chkChange =(model,value) => (dispatch) =>{
    return dispatch(actions.xor(model,value));
};

const RenderDonors = (props) => {
    if(props.donors.fetching_donors){
        return (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                <div className="text-center">
                <i className="fas fa-spinner fa-pulse"></i><br/>
                Loading
                </div>
            </div>
        );
    }
    else{
        if(props.donors.donors.length === 0){
            return (
                <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="text-center">
                        No donors to display.
                    </div>
                </div>
            );
        }
        else{
            const checks = props.donors.donors.map(donor => {
                return (
                    <div className="form-check col-12 col-md-6 mt-2 mb-2 col-lg-4 align-items-center justify-content-center" key={`donor${donor._id}`}>
                        <div className="mybg-dark">
                        <Control type="checkbox" changeAction={chkChange} className="form-check-input" value={donor._id} id={donor._id} model=".donors_list[]" />
                        <label htmlFor={donor._id} className="form-check-label d-flex justify-content-center">{donor.username}</label>
                        <label htmlFor={donor._id} className="form-check-label d-flex justify-content-center">{parseFloat(donor.dist).toFixed(2)}m away</label>
                        </div>
                    </div>
                );
            })

            return (
                <div className="container-fluid">
                    <div className="form-group row bg-white">
                        {checks}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        donors: state.donors,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDonors : (props) => dispatch(myActions.fetchDonors(props)),
        resetDonors : () => {dispatch(myActions.donorReset()); dispatch(actions.setInitial("reqgen.donors_list"));}
    };
}


class ReqGen extends Component{

    constructor(props){
        super(props);
        if(!(this.props.user && this.props.user.category==='med')){
            this.props.history.goBack();
        }
        this.blood_type="A+";
        this.range=1000;
        this.handleDonors=this.handleDonors.bind(this);
        this.editable=true;
        this.editRef=React.createRef();
        this.setEditable=this.setEditable.bind(this);
        this.findRef=React.createRef();
        this.handleSubmit=this.handleSubmit.bind(this);
        this.props.resetDonors();
    }

    handleDonors(){
        var opts= {
            blood_type: this.blood_type,
            range: this.range
        }
        this.editable=false;
        this.editRef.current.classList.remove("d-none");
        this.findRef.current.classList.add("d-none");
        this.props.fetchDonors(opts);
    }

    handleSubmit(reqgen,e){
        var creds = {
            blood_group : reqgen.blood_type,
            units : reqgen.units,
            donors_list : reqgen.donors_list
        }

        fetch(config.serverUrl+"med/requests/generate", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.oToken}`
            },
            body: JSON.stringify(creds)
        }).then(res=>{
            if(res.ok){
                alert("Request has been generated.");
            }
            else{
                var err=new Error(res.statusText);
                err.status=res.status;
                throw err;
            }
        }).catch(err=>{
            alert(err.message);
        });
        this.editRef.current.click();
        e.preventDefault();
    }

    setEditable(){
        this.editable=true;
        this.editRef.current.classList.add("d-none");
        this.findRef.current.classList.remove("d-none");
        this.props.resetDonors();
    }

    componentDidMount(){
        this.props.resetDonors();
    }
    render(){
        return (
            <div className="container">
                <div className="col-12">
                    <h1>Request Generation</h1>
                </div>
                <div className="container-fluid rounded mygrad p-3">
                    <Form model="reqgen" onSubmit={this.handleSubmit} validators={{donors_list: {arrLen: (value) => value.length>=5 || value.length===this.props.donors.donors.length}}}>
                        <div className="form-group row">
                            <label htmlFor="blood_type" className="col-md-3 offset-md-2 col-form-label">
                                Blood Type:
                            </label>
                            <div className="col-md-4">
                                <Control.select model=".blood_type" onChange={(e)=> this.blood_type=e.target.value} className="custom-select" defaultValue="A+" id="blood_type" disabled={!this.editable}>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </Control.select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="units" className="col-md-3 offset-md-2 col-form-label">
                                Units Required:
                            </label>
                            <div className="col-md-4">
                                <Control type="number" model=".units" parser={(value)=> parseInt(value)} min={1} max={10} className="form-control" defaultValue={1} id="units" disabled={!this.editable}>
                                </Control>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="range" className="col-md-3 offset-md-2 col-form-label">
                                Range:
                            </label>
                            <div className="col-md-4">
                                <Control.select model=".range" onChange={(e)=> this.range=parseInt(e.target.value)} parser={(val)=> parseInt(val)} className="custom-select" defaultValue={1000} id="range" disabled={!this.editable}>
                                    <option value="1000">Within 1Km</option>
                                    <option value="2000">Within 2Km</option>
                                    <option value="5000">Within 5Km</option>
                                    <option value="10000">Within 10Km</option>
                                </Control.select>
                            </div>
                        </div>
                        <div className="form-group row justify-content-around">
                            <button type="button" onClick={()=>this.handleDonors()} ref={this.findRef} className="btn btn-primary">Find Donors</button>
                            <button type="reset" onClick={()=> this.setEditable()} ref={this.editRef} className="btn d-none btn-primary">Edit Fields</button>
                        </div>
                        <div className="form-group row p-2">
                                <RenderDonors donors={this.props.donors}></RenderDonors>
                        </div>
                        <Errors model=".donors_list[]" messages={ {arrLen : "Select atleast 5 donors." }} show={(!this.editable && this.props.donors.donors.length>5)} />
                        <div className="form-group row p-2 justify-content-center">
                                <button type="submit" className="btn btn-primary" disabled={this.editable}>Submit</button>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ReqGen));