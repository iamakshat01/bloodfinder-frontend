import React, {Component} from 'react';
import {connect} from 'react-redux';
import Actions from './redux/actions';
import logo from './logo.svg';
import './App.css';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    category: state.category.category
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setMedCategory: () => dispatch(Actions.setMedCategory()),
    setDonorCategory: () => dispatch(Actions.setDonorCategory()),
    resetCategory: () => dispatch(Actions.resetCategory()),
    logIn : () => dispatch(Actions.logIn()),
    logOut : () => dispatch(Actions.logOut())
  }
};

class App extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setMedCategory();
    this.props.logIn();
    setTimeout(this.props.logOut, 5000);
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
