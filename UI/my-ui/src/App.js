
import './App.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
const myUrl = "https://helloworld-kjernzpriq-ue.a.run.app/test/please";

function App() {
  const [page, setPage] = useState(null);
  
  const getUrl = async () => {
    const res = await fetch(myUrl);
    const j = await res.json;
    console.log(j);
    //setPage(res);
  };

  useEffect(() => {
    getUrl();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/">Home</Link> |
          <Link to="/tictactoe">Tic-Tac-Toe</Link> |
          <Link to="/bible">Bible Verse</Link>
        </nav>
        Test
      </header>
    </div>
  );
}

export default App;
