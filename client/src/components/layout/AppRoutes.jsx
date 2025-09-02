import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from '../posts/PostList';
import PostDetails from '../posts/PostDetails';
import NewPost from '../posts/NewPost';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
}

export default AppRoutes;
