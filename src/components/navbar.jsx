import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu } from 'antd';
import {Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (

          <Menu mode="horizontal"
                theme="dark">

              <Menu.Item >
                <Link to="/">Parser</Link>
              </Menu.Item>

              <Menu.Item>
                <Link to="/posts">Posts</Link>
              </Menu.Item>

          </Menu>

    );
  }
}

Navbar.propTypes = {};

export default Navbar;
