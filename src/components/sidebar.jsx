import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Layout } from "antd";
import Settings from "./settings";
import "./sidebar.css";
class Sidebar extends Component {
  render() {
    return (
      <Layout.Sider theme="light" className='sidebar'>
        <Settings />
      </Layout.Sider>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
