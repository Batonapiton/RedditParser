import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, InputNumber, Input, Button } from "antd";
import {
  saveSubreddit,
  savePostsToLoad

} from "../actions/redditActions";

class Redditsettings extends Component {
  state = {
    subreddit: this.props.subreddit,
    postsToLoad: this.props.postsToLoad,
    postsToShow: this.props.postsToShow
  };
  handleSaveSubreddit = e => {

    this.setState({ subreddit: e.target.value });
  };
  handleSavePostsToLoad = value => {
    this.setState({ postsToLoad: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveSubreddit(this.state.subreddit); //TODO сделать проверку на предыдущие значения
    this.props.savePostsToLoad(this.state.postsToLoad);
  };

  render() {
    return (
      //TODO Сделать проверки на значения и запретить нажатие в случае ввода неверных значений
      <Form layout="inline" onSubmit={this.handleSubmit}>

        <Form.Item label="Subreddit">
          <Input
            name="subreddit"
            type="text"
            placeholder="Subreddit"
            value={this.state.subreddit}
            onChange={this.handleSaveSubreddit}
          />
        </Form.Item>
        <Form.Item label="Posts to load">
          <InputNumber
            name="postsToLoad"
            min={5}
            max={100}
            placeholder="Posts to load"
            onChange={this.handleSavePostsToLoad}
            value={this.state.postsToLoad}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
            Save and refresh
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

Redditsettings.propTypes = {
  subreddit: PropTypes.string,
  postsToLoad: PropTypes.number,
  postsToShow:  PropTypes.number,
  saveSubreddit: PropTypes.func,
  savePostsToLoad: PropTypes.func,
};
const mapStateToProps = state => ({
  subreddit: state.redditData.selectedSubreddit,
  postsToLoad: state.redditData.postsToLoad
});
const mapDispatchToProps = {
  saveSubreddit,
  savePostsToLoad

};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Redditsettings);
