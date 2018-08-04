/*global VK*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { userLogin, userLogout } from "../actions/vkActions";
import { Card,  Button } from "antd";
import "./vkside.css";


class Vkside extends Component {

  componentDidMount() {
    VK.Auth.getLoginStatus(res=>{
      if (res.status!=="connected") {
        this.handleLogout();
      }
    });
  }

  handleLogin = ()=>{
    this.props.userLogin();
  };

  handleLogout = () => {
    this.props.userLogout();
  };
  render() {

    if (this.props.status === "connected") {
      return (
        <Card
          title="Вы вошли как:"
          actions={[
            <Button type="danger" onClick={this.handleLogout}>
              Выйти
            </Button>
          ]}
        >
          <span>
            {this.props.userData.first_name} {this.props.userData.last_name}
          </span>
        </Card>

      );
    } else {
      return <div ><Button type="primary" onClick={this.handleLogin}>
        Войти Вконтакте
      </Button></div>;
    }
  }
}

Vkside.propTypes = {
  status: PropTypes.string.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = state => ({
  status: state.vkData.status,
  userData: state.vkData.userData
});
const mapDispatchToProps = {
  userLogin,
  userLogout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vkside);
