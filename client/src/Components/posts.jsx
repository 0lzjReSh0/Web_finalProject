import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import selfie from "../selfie.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "http://localhost:1234/api";

export default function Posts({ post }) {
  const [editing, setEditing] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [post, setPost] = useState("");
  const [page, setPage] = useState(1);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [activePostId, setActivePostId] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [language, setLanguage] = useState("");
  const [content, setContent] = useState("");
  const [title, setTitle] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [votes, setVotes] = useState(1);
  const [editComment, setEditComment] = useState(false);
  const [editCo, setEditCo] = useState("");
  // const [name, setName] = useState("");
  useEffect(() => {
    axios.get(`${API_BASE_URL}/post?page=${page}`).then((result) => {
      setPosts(result.data);
    });
  }, [page]);

  useEffect(() => {
    hljs.highlightAll();
  }, [posts]);

  /*The function for submiting posts*/
  const handlePostSubmit = async (event) => {
    event.preventDefault();
    const auth_token = localStorage.getItem("auth_token");
    console.log(`Bearer ${auth_token}`);
    try {
      const result = await axios.post(
        `${API_BASE_URL}/posts`,
        {
          title: postTitle,
          content: postContent,
          language: language,
        },
        { headers: { Authorization: `Bearer ${auth_token}` } }
      );
      console.log(11123456);
      setPosts([...posts, result.data]);
      setPostTitle("");
      setPostContent("");
      setLanguage("");

      // setName("")
      console.log();
    } catch (error) {
      console.log(error);
    }
  };
  //Used to edit the post contents
  const handleTitleChange = (event) => {
    setPosts({ ...posts, title: event.target.value });
  };

  const handleContentChange = (event) => {
    setPosts({ ...posts, content: event.target.value });
  };
  const handleEdit = () => {
    setEditing(true);
  };
  const handleCancel = () => {
    setEditing(false);
    // setTitle()
  };
  const handleCancelComment = () => {
    setEditComment(false);
    // setTitle()
  };

  // handle the vote
  const handleVote = async (postId) => {
    const auth_token = localStorage.getItem("auth_token");
    console.log(auth_token);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/posts/postId/vote`,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data.message);
      setVotes(response.data.votes.length);
      toast.success("You have voted on this post!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.log();
    }
  };

  //Update the post
  async function handleUpdatePost(postId) {
    const auth_token = localStorage.getItem("auth_token");
    setActivePostId(postId);
    const response = await axios.get(`${API_BASE_URL}/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json",
      },
    });
    setTitle(response.data.title);
    setContent(response.data.content);
    // alert(response.data.message)
    // setName(response.data.name);
    setEditing(true);
  }
  const handleSavePost = async (postId) => {
    const auth_token = localStorage.getItem("auth_token");
    setActivePostId(postId);
    console.log(postId);
    console.log(activePostId);

    // allow editing only if the user is the author of the post
    // navigate to the edit post page with the post data
    try {
      const updatedPost = {
        title: title,
        content: content,
      };
      const result = await axios.put(
        `${API_BASE_URL}/posts/${postId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setActivePostId(null);
      setTitle("");
      setContent("");
      // const response = await axios.get(`${API_BASE_URL}/post`);
      setPosts(...posts, result.data);
      setEditing(false);
      // Do something with the updated post data
    } catch (error) {
      console.error(error);
    }

    // show an error message to the user
  };

  const handleCommentSubmit = async (event) => {
    // event.preventDefault();
    const auth_token = localStorage.getItem("auth_token");
    try {
      const result = await axios.post(
        `${API_BASE_URL}/comments`,
        {
          postId: activePostId,
          content: comment,
          email: email,
        },
        { headers: { Authorization: `Bearer ${auth_token}` } }
      );
      setComments([...comments, result.data]);
      setComment("");
      console.log(comment);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowComments = async (postId) => {
    setActivePostId(postId);
    console.log(postId);

    const result = await axios.post(
      `${API_BASE_URL}/posts/comments`,
      { postId: postId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(result.data);
    setComments(result.data);
  };

  //Delete the post
  async function handleDeletePost(postId) {
    const auth_token = localStorage.getItem("auth_token");

    const info = await axios.delete(`${API_BASE_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${auth_token}` },
    });
    alert(info.data.message)


    
  }
  /**DELETE the comment */
  async function handleDeleteComment(commentId) {
    const auth_token = localStorage.getItem("auth_token");

    await axios.delete(`${API_BASE_URL}/${commentId}`, {
      headers: { Authorization: `Bearer ${auth_token}` },
    });
    alert("Delete successfully!");
  }

  /**UPDATE the comment */

  async function handleUpdateComment(commentId) {
    const auth_token = localStorage.getItem("auth_token");

    const response = await axios.get(`${API_BASE_URL}/${commentId}`, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    setEditCo(response.data.content);
    // setName(response.data.name);
    setEditComment(true);
  }

  const handleSaveComment = async (commentId) => {
    const auth_token = localStorage.getItem("auth_token");

    console.log(commentId);

    // allow editing only if the user is the author of the post
    // navigate to the edit post page with the post data
    try {
      const updatedPost = {
        content: editCo,
      };
      const result = await axios.put(
        `${API_BASE_URL}/${commentId}`,
        updatedPost,
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
            "Content-Type": "application/json",
          },
        }
        );
        alert(result.data.message)

      setEditCo("");
      // const response = await axios.get(`${API_BASE_URL}/post`);

      setEditComment(false);
      // Do something with the updated post data
    } catch (error) {
      console.error(error);
    }

    // show an error message to the user
  };

  //Upload the author information
  const renderAuthorInfo = (post) => {
    console.log(post.email);

    if (post.email) {
      return (
        <div className="d-flex align-items-center">
          <img
            src={selfie}
            alt="author avatar"
            className="rounded-circle mr-2"
            width="50"
            height="50"
          />
          <br />
          <span>{post.email}   </span>
          <br />
          <br />
          <small className="text-muted">
          ..........last edited at: {post.updateAt}
          </small>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Post what you want</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <form onSubmit={handlePostSubmit}>
            <div className="form-group">
              <label htmlFor="postTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="postTitle"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postContent">Content</label>
              <textarea
                type="postContent"
                className="form-control"
                id="postContent"
                rows="5"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="language">Language:</label>
              <select
                className="form-control"
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">-- Select a language --</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="ruby">Ruby</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>

      <hr />

      <h2 className="text-center mb-4">Posts</h2>
      {posts.map((post) => (
        <div className="card mb-3" key={post._id}>
          <div className="card-body">
            {renderAuthorInfo(post)}
            <h3 className="card-title">{post.title}</h3>
            <div className="pre-scrollable bg-light rounded mb-3">
              <pre>
                <code className={`language-${post.language}`}>
                  {post.content}
                </code>
              </pre>
            </div>
            <button
            id="comment"
              type="button"
              className="btn btn-link"
              onClick={() => handleShowComments(post._id)}
            >
              Show Comments
            </button>
            <div className="post-footer">
              <button id="vote" onClick={() => handleVote(post._id)}>
                vote
                <p>Votes: {post.votes.length}</p>
              </button>
            </div>

            <div className="mt-3">
              {post._id === activePostId && editing ? (
                <form onSubmit={() => handleSavePost(post._id)}>
                  <div className="form-group">
                    <label htmlFor="postTitle">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="editPostTitle"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postContent">Content</label>
                    <textarea
                      className="form-control"
                      id="editPostContent"
                      rows="5"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                  </div>

                  <button id="SavePost" type="submit" className="btn btn-primary mr-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <button
                id="updatePost"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleUpdatePost(post._id)}
                >
                  Update Post
                </button>
              )}
            </div>
          </div>

          {post._id === activePostId && (
            <button
              type="button"
              className="btn btn-link"
              onClick={() => handleDeletePost(post._id)}
            >
              Delete Post
            </button>
          )}
          {post._id === activePostId && (
            <div className="mt-4">
              <hr className="mb-4" />
              <form onSubmit={handleCommentSubmit}>
                <div className="form-group">
                  <label htmlFor="comment" className="fw-bold">
                    Leave a comment:
                  </label>
                  <textarea
                    className="form-control"
                    id="ecomment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button id="submitComment" type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <hr className="mt-4" />
              {comments.map((comment) => (
                <div key={comment._id} className="mb-3">
                  <p className="mb-1">{comment.content}</p>
                  <small className="text-muted">
                    Commented by: {comment.email}
                  </small>
                  <br />
                  <small className="text-muted">
                    last edited at: {comment.updateAt}
                  </small>
                  <>
                    <div className="mt-3">
                      {editComment ? (
                        <form onSubmit={() => handleSaveComment(comment._id)}>
                          <div className="form-group">
                            <label htmlFor="commentContent">Comment</label>
                            <textarea
                              className="form-control"
                              id="commentContent"
                              rows="5"
                              value={editCo}
                              onChange={(e) => setEditCo(e.target.value)}
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-primary mr-2"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancelComment}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <button
                          id="updateComment"
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleUpdateComment(comment._id)}
                        >
                          Update comment
                        </button>
                      )}
                    </div>
                    {editComment && (
                      <button
                        type="button"
                        className="btn btn-link"
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        Delete Comment
                      </button>
                    )}
                  </>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="my-3">
        <button
        id="previousPage"
          type="button"
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous Page
        </button>{" "}
        <button
          id="nextPage"
          type="button"
          className="btn btn-secondary"
          disabled={posts.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
