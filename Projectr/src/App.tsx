import './App.css';

import Main from './components/Main'

import {
  BrowserRouter as Router,
  NavLink
} from "react-router";

function App() {
  return (
    <Router basename='Web-Interfaces/Projectr/build/'>
      <header>
        <h1>
          Projectr
        </h1>
      </header>
      <main>
        <div className="nav-menu">
          <nav>
            <NavLink to="/">Find person</NavLink><br />
            <NavLink to="/newPerson">New notice</NavLink>
          </nav>
        </div>
        <Main />
      </main>
    </Router>
  );
}

export default App;
