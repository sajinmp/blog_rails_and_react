import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Post list</Link>
      {" | "}
      <Link to="/new">New post</Link>
    </nav>
  );
}

export default NavBar;
