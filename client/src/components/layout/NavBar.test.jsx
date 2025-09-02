import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

describe('NavBar Component', () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  }

  test('renders both links', () => {
    renderNavBar();

    expect(screen.getByText('Post list')).toBeInTheDocument();
    expect(screen.getByText('New post')).toBeInTheDocument();
  });
});
