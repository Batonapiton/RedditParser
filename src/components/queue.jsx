import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePostFromStorage } from "../actions/postsStorageActions";

import { Card, Button } from "antd";
const { Meta } = Card;

class Queue extends Component {
  handleDeletePost = item => {
    this.props.deletePostFromStorage(item);
  };
  render() {
    const { posts } = this.props;
    if (posts.length === 0) {
      return <div>Posts not found</div>;
    } else {
      return (
        <div className="cards">
          {posts.map(item => (
            <Card
              key={item.key}
              cover={<img alt="example" src={item.image} />}
              actions={[
                <Button
                  type="danger"
                  onClick={() => {
                    this.handleDeletePost(item);
                  }}
                >
                  Remove from queue
                </Button>
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

Queue.propTypes = {
  posts: PropTypes.array,
  deletePostFromStorage: PropTypes.func
};

const mapStateToProps = state => ({
  posts: state.postsStorage.posts
});
const mapDispatchToProps = {
  deletePostFromStorage
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
