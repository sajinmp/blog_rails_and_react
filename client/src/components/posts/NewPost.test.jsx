import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import NewPost from './NewPost';
import { createPost } from '../../services/postService';

jest.mock('../../constants', () => ({
  API_URL: 'http://mock-api.com',
}));

jest.mock('../../services/postService', () => ({
  createPost: jest.fn(() => {
    return { id: 1, title: 'Test Title', content: 'Test Content' };
  }),
}));

global.console.error = jest.fn();

describe('NewPost Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render form and allow typing', async () => {
    render(
      <Router>
        <NewPost />
      </Router>
    );

    const titleInput = screen.getByLabelText('Title:');
    const contentInput = screen.getByLabelText('Content:');
    const submitButton = screen.getByText('Create Post');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    expect(screen.getByText('New Post')).toBeInTheDocument();
    expect(titleInput.value).toBe('Test Title');
    expect(contentInput.value).toBe('Test Content');
    expect(submitButton).toBeInTheDocument();
  });

  test('clicking submit creates a new post and redirects', async () => {
    render(
      <Router>
        <NewPost />
      </Router>
    );

    const titleInput = screen.getByLabelText('Title:');
    const contentInput = screen.getByLabelText('Content:');
    const submitButton = screen.getByText('Create Post');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(createPost).toHaveBeenCalledTimes(1);
  });

  test('logs error on create post failure', async () => {
    const error = new Error('Failed to create post');
    createPost.mockRejectedValueOnce(error);

    render(
      <Router>
        <NewPost />
      </Router>
    );

    const titleInput = screen.getByLabelText('Title:');
    const contentInput = screen.getByLabelText('Content:');
    const submitButton = screen.getByText('Create Post');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error creating post:', expect.any(Error));
    });
  });
});
