import './App.css';

import Main from './components/Main.js'

import {
	BrowserRouter as Router,
	NavLink
} from "react-router-dom";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
	<header style={{marginTop: -30, padding: 2, paddingTop: 20, backgroundColor: "#e95420"}}>
		<h1 style={{color: "#333", fontSize: 2.5 + 'em'}}>Projektr</h1>
	</header>
	<main>
		<div style={{float: 'left', marginLeft: 2 + 'em', marginRight: 2 + 'em', marginBottom: 1 + 'em', borderStyle: 'solid',
				borderColor: "#666", borderRadius: 10 + 'px', padding: 12 + 'px', backgroundColor: "#CCC"}}>
		<nav>
			<NavLink to="/" exact>Znajdź osobę</NavLink><br />
			<NavLink to="/newPerson">Nowe zgłoszenie</NavLink>
		</nav>
		</div>
		<Main />
	</main>
    </Router>
  );
}

export default App;
