import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/layout/NavBar';
import AppRoutes from './components/layout/AppRoutes';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Blog</h1>
        <NavBar />
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
