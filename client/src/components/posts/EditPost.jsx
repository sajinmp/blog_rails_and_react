import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_URL } from '../../constants';

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPost(data);
        } else {
          throw response;
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: post.title, content: post.content}),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        navigate(`/posts/${updatedPost.id}`);
      } else {
        throw response;
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            type="text"
            id="title"
            value={post?.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <br />
          <textarea
            id="content"
            value={post?.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            required
          />
        </div>
        <div>
          <button type="submit">Update Post</button>
        </div>
      </form>
    </div>
  )
}

export default EditPost;
