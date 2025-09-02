import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

jest.mock('../../constants', () => ({
  API_URL: 'http://mock-api.com',
}));

jest.mock('../posts/PostList', () => () => <div>Posts</div>);

jest.mock('../posts/PostDetails', () => () => <div>Post Details</div>);

jest.mock('../posts/NewPost', () => () => <div>New Post</div>);

jest.mock('../posts/EditPost', () => () => <div>Edit Post</div>);

describe('AppRoutes component', () => {
  const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>
          {children}
        </MemoryRouter>
      ),
    });
  };

  test('renders PostList component at root path "/"', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/'] });
    expect(screen.getByText('Posts')).toBeInTheDocument();
  });

  test('renders PostDetails component at path "/posts/:id"', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1'] });
    expect(screen.getByText('Post Details')).toBeInTheDocument();
  });

  test('renders NewPost component at path "/new"', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/new'] });
    expect(screen.getByText('New Post')).toBeInTheDocument();
  });

  test('renders EditPost component at path "/posts/:id/edit"', () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ['/posts/1/edit'] });
    expect(screen.getByText('Edit Post')).toBeInTheDocument();
  });
});
