import React, { useState, useEffect } from 'react';
import { API_URL } from '../../constants';

function PostList() {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => {
        <div key={post.id} className="post-container">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      })}
    </div>
  );
}

export default PostList
