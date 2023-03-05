import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
/**Version 1.0. now already discard */

// Define the CommentForm component that accepts two props: postId and auth_token
const CommentForm = ({postId,auth_token }) => {
  const [comment, setComment] = useState({
    comment: "",
  });
  // function that updates the comment state whenever the user types something in the textarea

  const handleUpdate = (e) => {
    setComment({ ...comment, [e.target.id]: e.target.value });
  };
  // Define a function that handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to the server using axios
    axios
      .post(
        `/api/snippets/comments`,
        {
          postId: postId,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setComment("");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Render the comment form using the React Bootstrap Form and Button components
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComment">
        <Form.Label>Leave a comment:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={handleUpdate}
          className="form-control"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="btn btn-primary">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
