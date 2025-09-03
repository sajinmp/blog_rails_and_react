import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import EditPost from './EditPost';
import * as postService from '../../services/postService';

jest.mock('../../constants', () => ({
  API_URL: 'http://mock-api.com',
}));

jest.mock('../../services/postService', () => ({
  fetchPost: jest.fn(),
  updatePost: jest.fn(),
}));

global.console.error = jest.fn();

describe('EditPost Component', () => {
  const mockPost = { id: 1, title: 'Test Post', content: 'This is a test post.' };

  const renderComponent = () => {
    return render(
      <MemoryRouter initialEntries={['/posts/1/edit']}>
        <Routes>
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/posts/:id" element={<div>Updated Title</div>} />
        </Routes>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    postService.fetchPost.mockResolvedValue(mockPost);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the edit post form with fetched data', async () => {
    renderComponent();

    await waitFor(() => expect(postService.fetchPost).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockPost.title)).toBeInTheDocument();
    });
  });

  test('logs error if fetching post fails', async () => {
    const mockError = new Error('Failed to fetch post');
    postService.fetchPost.mockRejectedValue(mockError);

    renderComponent();

    await waitFor(() => expect(postService.fetchPost).toHaveBeenCalledTimes(1));

    expect(console.error).toHaveBeenCalledWith('Error fetching post:', mockError);
  });

  test('updates the post and redirects on form submission', async () => {
    renderComponent();

    await waitFor(() => expect(postService.fetchPost).toHaveBeenCalledTimes(1));

    const newPost = {title: 'Updated Title', content: 'Updated content.'};

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: newPost.title } });
      fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: newPost.content } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Update Post/i));
    });

    await waitFor(() => {
      expect(postService.updatePost).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(screen.getByText(newPost.title)).toBeInTheDocument();
    });
  });

  test('logs error if updating post fails', async () => {
    const mockError = new Error('Failed to update post');
    postService.updatePost.mockRejectedValue(mockError);

    renderComponent();

    const newPost = {title: 'Updated Title', content: 'Updated content.'};

    await waitFor(() => expect(postService.fetchPost).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: newPost.title } });
      fireEvent.change(screen.getByLabelText(/Content/i), { target: { value: newPost.content } });
    });

    await act(async () => {
      fireEvent.click(screen.getByText(/Update Post/i));
    });

    await waitFor(() => {
      expect(postService.updatePost).toHaveBeenCalled();
    });

    expect(console.error).toHaveBeenCalledWith('Error updating post:', mockError);
  });
});
