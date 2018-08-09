/*global VK*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  userLogin,
  userLogout,
  setCurrentGroup,
  getPhotoServerUrl
} from "../actions/vkActions";
import { Card, Button, Select } from "antd";
import "./vkside.css";

class Vkside extends Component {
  componentDidMount() {
    VK.Auth.getLoginStatus(res => {
      if (res.status !== "connected") {
        this.handleLogout();
      }
    });
  }

  handleLogin = () => {
    this.props.userLogin();
  };

  handleLogout = () => {
    this.props.userLogout();
  };

  handleChange = value => {
    this.props.setCurrentGroup(value);
    this.props.getPhotoServerUrl(value);
  };

  render() {
    if (this.props.status === "connected") {
      return (
        <div>
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
          <Select
            defaultValue={this.props.currentGroup}
            className="clubSelector"
            onChange={this.handleChange}
          >
            {this.props.groups.map(group => (
              <Select.Option key={group.id} value={group.id}>
                {group.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      );
    } else {
      return (
        <div>
          <Button type="primary" onClick={this.handleLogin}>
            Войти Вконтакте
          </Button>
        </div>
      );
    }
  }
}

Vkside.propTypes = {
  userLogin: PropTypes.func,
  userLogout: PropTypes.func,
  setCurrentGroup: PropTypes.func,
  getPhotoServerUrl: PropTypes.func,
  status: PropTypes.string.isRequired,
  userData: PropTypes.object,
  groups: PropTypes.array,
  currentGroup: PropTypes.number
};

const mapStateToProps = state => ({
  status: state.vkData.status,
  userData: state.vkData.userData,
  groups: state.vkData.groups,
  currentGroup: state.vkData.currentGroup
});
const mapDispatchToProps = {
  userLogin,
  userLogout,
  setCurrentGroup,
  getPhotoServerUrl
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Vkside);
