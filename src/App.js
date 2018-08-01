import React, { Component } from "react";
//import "./App.css";

import Posts from "./components/posts";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import Login from "./components/login";
import { Route } from "react-router-dom";
import { Layout } from "antd";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout theme="light">
          <div>
            <Layout.Header className="header">
              <Navbar />
            </Layout.Header>
            <Layout theme="light">
              <Sidebar/>
              <Layout.Content>
                <Route exact path="/" component={Login} />
                <Route path="/posts" component={Posts} />
                <Route path="/signup" component={Posts} />
              </Layout.Content>
            </Layout>
            <Layout.Footer>Footer</Layout.Footer>
          </div>
        </Layout>

      </div>
    );
  }
}

export default App;
