import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const CommentForm = ({postId,auth_token }) => {
  const [comment, setComment] = useState({
    comment: ""
  });
const handleUpdate = e => {
    setComment({ ...comment, [e.target.id]: e.target.value });
}
  const handleSubmit = (e) => {
    e.preventDefault();
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
