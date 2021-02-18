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

const mapStateToProps = (state) => {
  return {
    category: state.category.category
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMedCategory: () => dispatch(Actions.setMedCategory()),
    setDonorCategory: () => dispatch(Actions.setDonorCategory()),
    resetCategory: () => dispatch(Actions.resetCategory()),
    logIn : (cred) => dispatch(Actions.logIn(cred)),
    logOut : () => dispatch(Actions.logOut()),
    register: (cred)=> dispatch(Actions.register(cred))
  };
};

class App extends Component{

  constructor(props){
    super(props); 
  }

  componentDidMount(){
    this.props.setMedCategory();
    //this.props.logIn();
  }
  render(){
    return (
      <Switch>
        <Route path='/auth/signin' component={() => (<SignIn logIn={this.props.logIn} categorymed={this.props.setMedCategory} categorydonor={this.props.setDonorCategory} category={this.props.category}/> )} />
        <Route path='/auth/signup' component={() => (<SignUp register={this.props.register} categorymed={this.props.setMedCategory} categorydonor={this.props.setDonorCategory} category={this.props.category}/> )}/>
        <Route path='/' >
          <Nav />
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/about' component={About} />
            <Redirect to='/home' />
          </Switch>
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
