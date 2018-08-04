/*global VK*/
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from "antd";
class Login extends Component {
  handleLogin = ()=>{
    VK.Auth.login(response=>(console.log(response)));
  };

  render() {
    return (
      <div >
        <Button onClick={this.handleLogin} >Login</Button>
      </div>

    );
  }
}

Login.propTypes = {};

export default Login;
