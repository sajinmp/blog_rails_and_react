import { API_URL } from '../constants';

async function fetchPosts() {
  const response = await fetch(`${API_URL}/posts.json`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchPost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function deletePost(id) {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response;
}

export { fetchPosts, fetchPost, deletePost };
