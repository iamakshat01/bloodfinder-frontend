import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {withRouter, Switch, Route, Redirect} from 'react-router-dom';
import Nav from './components/NavComponent';
import SignIn from './components/SignInComponent';
import SignUp from './components/SignUpComponent';
import Home from './components/HomeComponent';
import About from './components/AboutComponent';
import ReqGen from './components/ReqGenComponent';
<<<<<<< HEAD
import RequestPanel from './components/RequestPanel';
import Inbox from './components/InboxComponent';
=======
import Requests from './components/RequestsComponent';
import ReqInfo from './components/ReqInfoComponent';
>>>>>>> ec0de0959fb30ac60df63ea47e9be491841d4439

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn : (cred) => dispatch(Actions.logIn(cred)),
    logOut : () => dispatch(Actions.logOut()),
    register: (cred)=> dispatch(Actions.register(cred)),
    fetchRequests: ()=> dispatch(Actions.fetchRequests())
  };
};

class App extends Component{

  constructor(props){
    super(props); 
  }

  componentDidMount(){
  }
  render(){
    return (
      <Switch>
        <Route path='/auth/signin' component={(props) => (<SignIn {...props} logIn={this.props.logIn}/> )} />
        <Route path='/auth/signup' component={SignUp}/>
        <Route path='/' >
          <Nav />
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
<<<<<<< HEAD
            <Route path='/donor/:user_id/inbox' component={Inbox} />
            <Route path='/med/:user_id/generateRequest' component={ReqGen} />
            <Route path='/med/:user_id/generateRequest' component={RequestPanel} />
=======
            <Route path='/med/generateRequest' component={ReqGen} />
            <Route path='/med/requests/:reqId' component={ReqInfo} />
            <Route path='/med/requests' component={Requests} />
>>>>>>> ec0de0959fb30ac60df63ea47e9be491841d4439
            <Redirect to='/home' />
          </Switch>
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
