import { Route, Routes } from 'react-router-dom';
import PostList from '../posts/PostList';
import PostDetails from '../posts/PostDetails';
import NewPost from '../posts/NewPost';
import EditPost from '../posts/EditPost';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} />
      <Route path="/posts/:id/edit" element={<EditPost />} />
      <Route path="/new" element={<NewPost />} />
    </Routes>
  );
}

export default AppRoutes;
