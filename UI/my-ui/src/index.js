import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import TicTacToe from "./routes/tictactoe/tictactoe";
import Bible from "./routes/bible/bible";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="tictactoe" element={<TicTacToe />} />
      <Route path="bible" element={<Bible />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);


