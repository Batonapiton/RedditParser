import React, { Component } from "react";
import { Menu } from 'antd';
import {Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return <Menu mode="horizontal" theme="dark">
        <Menu.Item>
          <Link to="/">Parser</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/posts">Load posts</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/postqueue">Queue</Link>
        </Menu.Item>
      </Menu>;
  }
}


export default Navbar;
