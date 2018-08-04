import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/redditActions";
import {
  savePostToStorage,
  deletePostFromStorage
} from "../actions/postsStorageActions";
import "./posts.css";
import { Spin, Card, Button } from "antd";

const { Meta } = Card;

class Posts extends Component {
  componentDidMount() {
    this.props.fetchPosts(this.props.queryInfo);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.queryInfo.subreddit !== this.props.queryInfo.subreddit ||
      prevProps.queryInfo.postsToLoad !== this.props.queryInfo.postsToLoad
    ) {
      this.props.fetchPosts(this.props.queryInfo);
    }
  }
  handleSavePost = item => {
    this.props.savePostToStorage(item);
  };

  handleDeletePost = item => {
    this.props.deletePostFromStorage(item);
  };

  render() {
    if (this.props.error) {
      return <div>{this.props.error}</div>;
    }
    if (this.props.isLoading) {
      return (
        <div className="loader">
          <Spin size="large" />
        </div>
      );
    } else {
      const postsItems = this.props.data.map(post => ({
        key: post.name,
        image: post.url.replace("gifv", "gif"),
        header: post.title,
        author: post.author,
        extra: post.url,
        permalink: `https://reddit.com${post.permalink}`
      }));
      return (
        <div className="cards">
          {postsItems.map(item => (
            <Card
              key={item.key}
              cover={<img alt="image" src={item.image} />}
              actions={[
                <div>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.handleSavePost(item); //TODO сделать проверку на повторы в очереди
                    }}
                  >
                    Add to queue
                  </Button>
                  <Button
                    type="danger"
                    onClick={() => {
                      this.handleDeletePost(item);
                    }}
                  >
                    Remove from queue
                  </Button>
                </div>
              ]}
              className="card"
            >
              <Meta
                title={<a href={item.extra}>{item.header}</a>}
                description={[
                  <a href={item.permalink}>Link to post</a>,
                  <div>Author: {item.author}</div>
                ]}
              />
            </Card>
          ))}
        </div>
      );
    }
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  savePostToStorage: PropTypes.func.isRequired,
  deletePostFromStorage: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  queryInfo: PropTypes.object,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  storedPosts: PropTypes.array
};

const mapStateToProps = state => ({
  data: state.redditData.storedPosts,
  queryInfo: {
    subreddit: state.redditData.selectedSubreddit,
    postsToLoad: state.redditData.postsToLoad
  },
  isLoading: state.redditData.isLoading,
  error: state.redditData.error,
  storedPosts: state.postsStorage.posts
});

const mapDispatchToProps = {
  fetchPosts,
  savePostToStorage,
  deletePostFromStorage
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
