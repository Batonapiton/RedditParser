import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Layout } from "antd";
import Redditsettings from "./redditsettings";
import Vkside from "./vkside";
import "./sidebar.css";
import {Route} from "react-router";
class Sidebar extends Component {
  render() {
    return (
      <Layout.Sider theme="light" className='sidebar' width={250}>
        <Route path='/posts' component={Redditsettings}/>
        <Route path='/postqueue' component={Vkside}/>

      </Layout.Sider>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
