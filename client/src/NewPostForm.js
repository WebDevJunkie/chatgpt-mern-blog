import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi-browser';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const schema = {
      title: Joi.string().min(3).required().error(() => {
        return { message: 'Title must be at least 3 characters' };
      }),
      body: Joi.string().min(10).required().error(() => {
        return { message: 'Body must be at least 10 characters' };
      })
    };
    const result = Joi.validate({ title, body }, schema);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    axios.post('http://localhost:4000/api/posts', { title, body })
      .then(res => console.log(res.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        {errors.title && <div>{errors.title}</div>}
      </label>
      <br />
      <label>
        Body:
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        {errors.body && <div>{errors.body}</div>}
      </label>
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default NewPostForm;
