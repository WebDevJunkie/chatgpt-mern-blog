import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/posts')
      .then(res => setPosts(res.data))
  });

  return (
    <div>
      {posts.map(post => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>{post.date}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
