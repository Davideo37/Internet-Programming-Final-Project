import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Box, TextField, Button } from "@mui/material"
import bible from './bible.svg';
import "./bible.css";
function Bible() {
    const [book, setBook] = useState("votd");
  const [chapter, setChapter] = useState(null);
  const [verse, setVerse] = useState(null);
  const [request, setRequest] = useState(null);
  let passage = (book ==="votd") ? ("votd"):(book+"%20"+chapter+":"+verse);
  const url = "https://labs.bible.org/api/?passage="+passage+"&type=json";

  /** Function to fetch the verse of the day from the API
  */
  const getVerses = async () => {
    const res = await fetch(url);
    const Verses = await res.json();
    setRequest(Verses);
  };

  /** This useEffect calls the fetch function everytime the page is updated, to ensure the data is accurate
   */
  useEffect(() => {
    getVerses();
  }, []);

  let handleChangeBook = (event) => {
    setBook(event.target.value);
  };
  let handleChangeChapter = (event) => {
    setChapter(event.target.value);
  };
  let handleChangeVerse = (event) => {
    setVerse(event.target.value)
  }
  

  return (
    <div className="Bible">
      <header className="Bible-header">
        <nav>
          <Link to="/">Home</Link> |<Link to="/tictactoe">Tic-Tac-Toe</Link> |
          <Link to="/bible">Bible Verse</Link>
        </nav>
        <img src={bible} className="App-logo" alt="Bible" />
        <Box
          class="inputs"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="search-fields"
            id="book"
            color="primary"
            variant="outlined"
            label="Book"
            value={book}
            onChange={handleChangeBook}
            focused
          />
          <TextField
            className="search-fields"
            id="chapter"
            color="primary"
            variant="outlined"
            label="Chapter"
            value={chapter}
            disabled={book === "votd"}
            onChange={handleChangeChapter}
            focused
          />
          <TextField
            className="search-fields"
            id="verse"
            color="secondary"
            variant="outlined"
            label="Verse"
            value={verse}
            disabled={book === "votd"}
            onChange={handleChangeVerse}
            focused
          />
        </Box>
        <Box>
          <Button
            className="submit-button"
            onClick={getVerses}
            variant="outlined"
          >
            Submit
          </Button>
        </Box>

        <h1>
          {" "}
          {/*Here I use a ternary operator '?' to only attempt to display the fetched data if the
              data exists currently (has been fetched). This prevents the page from throwing an error when the HTML
              tries to render before the request has returned. */}
          {passage === "votd" ? "The verse of the day is from: " : ""}
          {request
            ? request[0].bookname +
              " " +
              request[0].chapter +
              ":" +
              request[0].verse
            : ""}
        </h1>
        <p>
          {request
            ? request.map((verse) => (
                <>
                  <sup>{verse.verse}</sup>
                  {verse.text + " "}
                </>
              ))
            : ""}
        </p>
      </header>
    </div>
  );
}
export default Bible;