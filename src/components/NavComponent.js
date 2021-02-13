import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Collapse} from 'bootstrap';
import Actions from '../redux/actions';
import {connect} from 'react-redux';

function NavItems(props){
    let items = [];
    items.push([
        <li className='nav-item' key='home'>
            <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/home'> <i className='fas fa-home' /> Home</NavLink>
        </li>
    ]);

    if(!props.user){
        items.push(
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item' key='signin'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/auth/signin'> <i className='fas fa-sign-in-alt' /> SignIn</NavLink>
            </li>);
    }
    else if(props.user && props.category==='med'){
        items.push([
            <li className='nav-item' key='medReqGen'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to={`/med/${props.user._id}/generateRequest`} > <i class="fab fa-creative-commons-sampling"></i> Generate Request</NavLink>
            </li>,
            <li className='nav-item' key='medReqs'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to={`/med/${props.user._id}/requests`} > <i className='far fa-paper-plane' /> Requests</NavLink>
            </li>,
            <li className='nav-item' key='medProfile'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to={`/med/${props.user._id}/profile`} > <i className='far fa-user-circle' /> Profile</NavLink>
            </li>,
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item' key='medSignOut'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} onClick={props.logOut} className='nav-link' to='/auth/signout' > SignOut</NavLink>
            </li>
        ]);
    }
    else if(props.user && props.category==='donor'){
        items.push([
            <li className='nav-item' key='donorInbox'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to={`/donor/${props.user._id}/inbox`} > <i className='fas fa-inbox' /> Inbox</NavLink>
            </li>,
            <li className='nav-item' key='donorProfile'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to={`/donor/${props.user._id}/profile`} > <i className='far fa-user-circle' /> Profile</NavLink>
            </li>,
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item' key='donorSignOut'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' onClick={props.logOut} to='/auth/signout' > <i className='fas fa-sign-out-alt' /> SignOut</NavLink>
            </li>
        ]);
    }
    return (
        <>
            {items}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        category: state.category.category,
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(Actions.logOut()),
        resetCategory: () => dispatch(Actions.resetCategory())
    };
};

class Navbar extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <nav className='navbar container-fluid navbar-expand-md navbar-dark mybg-dark'>
                <Link className='navbar-brand' to='/home'>Logo</Link>
                <button type="button" className='navbar-toggler' data-target='#navbar' data-toggle='collapse'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='navbar-collapse collapse' id='navbar'>
                    <ul className='navbar-nav ml-auto'>
                        <NavItems user={this.props.user} category={this.props.category} logOut={this.props.logOut} />
                    </ul>
                </div>
            </nav>
        );
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));