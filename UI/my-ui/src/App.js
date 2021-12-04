
import './App.css';
import { Outlet, Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
          }}
        >
          <Link to="/tictactoe">Tic-Tac-Toe</Link> |{" "}
          <Link to="/bible">Bible Verse</Link>
        </nav>
        <Outlet />
      </header>
    </div>
  );
}

export default App;
