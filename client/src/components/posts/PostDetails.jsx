import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchPost, deletePost as deletePostById } from '../../services/postService';

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      try {
        const data = await fetchPost(id);
        setPost(data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    }
    getPost();
  }, [id]);

  const deletePost = async () => {
    try {
      await deletePostById(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      {" | "}
      <Link to="/">Back to Post List</Link>
      {" | "}
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default PostDetails;
