/*global VK*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePostFromStorage } from "../actions/postsStorageActions";

import { Card, Button, Input } from "antd";

const { Meta } = Card;

class Queue extends Component {
  handleDeletePost = item => {
    this.props.deletePostFromStorage(item);
  };
  handlePublish = item => {
    const toDataURL = url =>
      fetch(url)
        .then(response => response.blob())
        .then(
          blob =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );
    const dataURLtoMultipart = (dataurl, filename, fieldName) => {
      const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(","),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      };

      let file = dataURLtoFile(dataurl, "testFile.png");

      const form = new FormData();

      form.append(fieldName, file);
      return form;
    };

    toDataURL(item.image)
      .then(dataUrl => {
        fetch(this.props.photoServerUrl, {
          method: "POST",
          body: dataURLtoMultipart(dataUrl, "testFile.jpg", "photo")
        })
          .then(response => response.json())
          .then(response => {
            if (response.photo !== "[]") {
              console.log(this.props.currentGroup);
              console.log(response);

              VK.Api.call(
                "photos.saveWallPhoto",
                {
                  group_id: this.props.currentGroup,
                  photo: response.photo,
                  server: response.server,
                  hash: response.hash,
                  v: "5.80"
                },
                r => {
                  console.log(r.response);
                  VK.Api.call(
                    "wall.post",
                    {
                      owner_id: -this.props.currentGroup,
                      from_group: 1,
                      message: item.header,
                      attachments:
                        "photo" +
                        r.response[0].owner_id +
                        "_" +
                        r.response[0].id,
                      v: "5.80"
                    },
                    r => {
                      console.log(r.response);
                    }
                  );
                }
              );
            }
          });
      })
      .catch(error => {
        console.error(error);
      });
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
                <div>
                  <Button
                    onClick={() => {
                      this.handlePublish(item);
                    }}
                  >
                    Publish
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
                title={<Input defaultValue={item.header} />} //TODO сделать изменяемый заголовок
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
  photoServerUrl: PropTypes.string,
  docsServerUrl: PropTypes.string,
  currentGroup: PropTypes.number,
  deletePostFromStorage: PropTypes.func
};

const mapStateToProps = state => ({
  posts: state.postsStorage.posts,
  photoServerUrl: state.vkData.photoServerUrl,
  docsServerUrl: state.vkData.docsServerUrl,
  currentGroup: state.vkData.currentGroup
});
const mapDispatchToProps = {
  deletePostFromStorage
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Queue);
