import { render, screen, waitFor, fireEvent, awaitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostList from './PostList';
import * as postService from '../../services/postService';

jest.mock('../../constants', () => ({
  API_URL: 'http://mock-api.com',
}));

jest.mock('../../services/postService', () => ({
  fetchPosts: jest.fn(),
  deletePost: jest.fn(),
}));

global.console.error = jest.fn();

describe('PostList Component', () => {
  const mockPosts = [
    { id: 1, title: 'First Post', content: 'This is the first post.' },
    { id: 2, title: 'Second Post', content: 'This is the second post.' },
  ];

  beforeEach(() => {
    postService.fetchPosts.mockResolvedValue(mockPosts);
    postService.deletePost.mockResolvedValue();
  });

  test('renders list of posts', async () => {
    render(<PostList />, {wrapper: MemoryRouter});

    await waitFor(() => screen.getByText('First Post'));

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
  });

  test('deletes a post when delete button is clicked', async () => {
    render(<PostList />, { wrapper: MemoryRouter });

    const postText = 'First Post';
    await waitFor(() => screen.getByText(postText));

    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => expect(postService.deletePost).toHaveBeenCalled());

    await waitFor(() => {
      expect(screen.queryByText(postText)).not.toBeInTheDocument();
    });
  });

  test('logs error when fetching posts fails', async () => {
    const error = new Error('Failed to fetch posts');
    postService.fetchPosts.mockRejectedValueOnce(error);

    render(<PostList />, { wrapper: MemoryRouter });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching posts:', error);
    });
  });

  test('logs error when deleting a post fails', async () => {
    const error = new Error('Failed to delete post');
    postService.deletePost.mockRejectedValueOnce(error);

    render(<PostList />, { wrapper: MemoryRouter });

    const postText = 'First Post';
    await waitFor(() => screen.getByText(postText));

    fireEvent.click(screen.getAllByText('Delete')[0]);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error deleting post:', error);
    });

    expect(screen.getByText(postText)).toBeInTheDocument();
  });
});
