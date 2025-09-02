import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchPosts as fetchAllPosts,
  deletePost as deletePostById
} from '../../services/postService';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      await deletePostById(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.map(post => (
        <div key={post.id} className="post-container">
          <h3>
            <Link to={`/posts/${post.id}`} className="post-link">
              {post.title}
            </Link>
          </h3>
          <div className="post-link">
            <Link to={`/posts/${post.id}/edit`}>Edit</Link>
            {" | "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList
