import { render, screen, waitFor, fireEvent, awaitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PostDetails from './PostDetails';
import * as postService from '../../services/postService';

jest.mock('../../constants', () => ({
  API_URL: 'http://mock-api.com',
}));

jest.mock('../../services/postService', () => ({
  fetchPost: jest.fn(),
  deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe('PostDetails Component', () => {
  const mockPost = {
    id: 1,
    title: 'First Post',
    content: 'This is the first post.',
  };

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={[`/posts/${mockPost.id}`]}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/" element={<div>Posts</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders post details', async () => {
    postService.fetchPost.mockResolvedValue(mockPost);

    renderComponent();

    await waitFor(() => screen.getByText(mockPost.title));

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(mockPost.content)).toBeInTheDocument();
  });

  test('logs error when fetch fails', async () => {
    const mockError = new Error('Failed to fetch');
    postService.fetchPost.mockRejectedValue(mockError);

    renderComponent();

    await waitFor(() => expect(postService.fetchPost).toHaveBeenCalled());

    expect(console.error).toHaveBeenCalledWith('Error fetching post:', mockError);
  });

  test('deletes post and navigates to post list when delete button is clicked', async () => {
    postService.fetchPost.mockResolvedValue(mockPost);
    postService.deletePost.mockResolvedValue({ success: true });

    renderComponent();

    await waitFor(() => fireEvent.click(screen.getByText('Delete Post')));

    await waitFor(() => expect(postService.deletePost).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.getByText('Posts')).toBeInTheDocument();
    });
  });

  test('logs error when delete fails', async () => {
    postService.fetchPost.mockResolvedValue(mockPost);
    const mockError = new Error('Failed to delete');
    postService.deletePost.mockRejectedValue(mockError);

    renderComponent();

    await waitFor(() => fireEvent.click(screen.getByText('Delete Post')));

    await waitFor(() => expect(postService.deletePost).toHaveBeenCalled());

    expect(console.error).toHaveBeenCalledWith('Error deleting post:', mockError);
  });
});
