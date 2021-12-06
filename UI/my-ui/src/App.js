
import './App.css';
import {  Link } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/tictactoe">Tic-Tac-Toe</Link> |
          <Link to="/bible">Bible Verse</Link>
        </nav> 
      </header>
    </div>
  );
}

export default App;
