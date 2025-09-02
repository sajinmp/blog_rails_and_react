import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PostList from '../posts/PostList';
import PostDetails from '../posts/PostDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/new" element={<div>New Post Form</div>} />
    </Routes>
  );
}

export default AppRoutes;
