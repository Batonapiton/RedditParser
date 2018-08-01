import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Form, Sidebar, Segment,Menu } from "semantic-ui-react";
import { Form, InputNumber, Input, Button } from "antd";
import {
  saveSubreddit,
  savePostsToLoad,
  savePostsToShow
} from "../actions/redditActions";

class Settings extends Component {
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
  handleSavePostsToShow = value => {
    this.setState({ postsToShow: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.saveSubreddit(this.state.subreddit); //TODO сделать проверку на предыдущие значения
    this.props.savePostsToLoad(this.state.postsToLoad);
    this.props.savePostsToShow(this.state.postsToShow);
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
        <Form.Item label="Posts to show">
          <InputNumber
            name="postsToShow"
            min={1}
            max={100}
            placeholder="Posts to show"
            onChange={this.handleSavePostsToShow}
            value={this.state.postsToShow}
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

Settings.propTypes = {};
const mapStateToProps = state => ({
  subreddit: state.redditData.selectedSubreddit,
  postsToLoad: state.redditData.postsToLoad,
  postsToShow: state.redditData.postsToShow
});
const mapDispatchToProps = {
  saveSubreddit,
  savePostsToLoad,
  savePostsToShow
};
// mapDispatchToProps = dispatch => {
//   return { saveSubreddit: (subreddit)=> dispatch(saveSubreddit(subreddit)),
//     savePostsToLoad:(num)=> dispatch(savePostsToLoad(num)),
//     savePostsToShow: (num)=> dispatch(savePostsToShow(num))};
// };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
