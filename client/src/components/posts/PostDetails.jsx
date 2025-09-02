import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../constants';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPost() {
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
    }
    fetchPost();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </div>
  );
}

export default PostDetails;
