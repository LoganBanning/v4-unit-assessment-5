import React, { Component, useState } from 'react';
import axios from 'axios';
import homeLogo from './../../assets/home_logo.png';
import newLogo from './../../assets/new_logo.png';
import logoutLogo from './../../assets/shut_down.png';
import './Nav.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateUser, logout } from '../../ducks/reducer';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser()
  }

  getUser() {
    axios.get('/api/auth/me')
    .then(res => this.props.updateUser(res.data))
    .catch(e => console.log(e));
  }
  
  logout() {
    axios.post('/api/auth/logout')
      .then(() => this.props.updateUser({}))
      .catch(e => console.log(e));
  }
  
  render() {
    console.log("Redux props?", this.props);
      return this.props.location.pathname !== '/' &&
        <div className='nav'>
          <div className='nav-profile-container'>
            <div className='nav-profile-pic'>
              {/* {style={backgroundImage: URL(`${REDUX_STATE_PIC}`)}}*/}
              </div>
            <p>{this.props.username}</p>
          </div>
          <div className='nav-links'>
            <Link to='/dash'>
            <img className='nav-img' src={homeLogo} alt='home' />
            </Link>
            <Link to='/form'>
            <img className='nav-img' src={newLogo} alt='new post' />
            </Link>
          </div>
          <Link to='/' onclick={this.logout}>
          <img className='nav-img logout' src={logoutLogo} alt='logout' />
          </Link>
        </div>
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
  }
};

export default withRouter(connect(mapStateToProps, {updateUser, logout}))(Nav);