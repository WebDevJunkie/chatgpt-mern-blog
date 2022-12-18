import React, { useState } from 'react';
import axios from 'axios';

function NewPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/posts', { title, body })
      .then(res => console.log(res.data));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <br />
      <label>
        Body:
        <textarea value={body} onChange={e => setBody(e.target.value)} />
      </label>
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
}

export default NewPostForm;
