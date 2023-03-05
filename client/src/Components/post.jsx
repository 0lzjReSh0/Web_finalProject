// Import dependencies
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
const API_BASE_URL = "http://localhost:1234/api";
// Create a functional component to display a single post
const Post = () => {
  // Initialize state variables
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [activePostId, setActivePostId] = useState(null);
  // Get the post ID from the URL
  const location = useLocation();
  // const postId = location.pathname.split("/")[2];

  // Get the user's authentication token from local storage
  const auth_token = localStorage.getItem("auto_token");
  console.log(auth_token);
  // Check if the user is logged in
  useEffect(() => {
    if (auth_token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [auth_token]);

  useEffect(() => {
    async function fetchData() {
      const result = axios
      .post(`${API_BASE_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.log(error);
      });

    
    }
    fetchData();
    
  }, []);
  // Get the post and its comments from the server

  // Handle changes to the new comment input
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleShowComments = async (postId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/posts/comments`
      );
      setComments(response.data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth_token = localStorage.getItem("auto_token");
    try {
      const result = await axios.post(
        `${API_BASE_URL}/posts`,
        {
          title,
          code,
        },
        { headers: { Authorization: `Bearer ${auth_token}` } }
      );
      setPosts([...posts, result.data]);
      setTitle("");
      setCode("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentChange = (event) => {
    setComments(event.target.value);
  };
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const auth_token = localStorage.getItem("auth_token");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/comments`,
        {
          postId: activePostId,
          content: comments,
        },
        { headers: { Authorization: `Bearer ${auth_token}` } }
      );
      const newComment = response.data;
      setComments([...comments, newComment]);
      setComments("");
    } catch (error) {
      console.error(error);
    }
  };



  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  

  return (
    <div className="container mt-5">
      {/* <h1>Post Something</h1>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="postTitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="postTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="postContent">Content</label>
              <textarea
                className="form-control"
                id="postContent"
                rows="5"
                value={code}
                onChange={handleCodeChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>

      <hr />

      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => handleShowComments(post._id)}
          >
            Show Comments
          </button>
          {post._id === activePostId && (
            <div>
              <hr />
              <form onSubmit={handleCommentSubmit}>
                <div className="form-group">
                  <label htmlFor="comment">Leave a comment:</label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
              <hr />
              {comments.map((comment) => (
                <div key={comment._id}>
                  <p>{comment.content}</p>
                  <small>by {comment.author}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <div className="my-3">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous Page
        </button>{" "}
        <button
          type="button"
          className="btn btn-secondary"
          disabled={posts.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next Page
        </button>
      </div> */}
    </div>
  );

}

export default Post;
