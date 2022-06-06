import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import bible from "./bible.svg";
import "./bible.css";

function Bible() {
  const [book, setBook] = useState("votd");
  const [chapter, setChapter] = useState("1");
  const [verse, setVerse] = useState("1");
  const [request, setRequest] = useState(null);
  let passage = book === "votd" ? "votd" : book + "%20" + chapter + ":" + verse;
  const url = "https://labs.bible.org/api/?passage=" + passage + "&type=json";


  /** Function to fetch from the API
   * 
   * @param  {string} url - the url to be fetched
   * @returns - The json fetched or an error 
   */
  const fetchJSON = (url) => {
    return fetch(url).then((res) => {
      if (res.ok) {
        return res.json();
      }
      // If invalid response, throw an error
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  /** Function to set the verse(s) fetched from the API
   */
  const getVerses = async () => {
    fetchJSON(url)
      .then((json) => {
        // do things with the response, like setting state:
        setRequest(json);
      })
      .catch((error) => {
        // do things with the error, like logging them:
        console.error(error);
        alert("Invalid passage: "+ book + " " + chapter + ":" + verse)
      });
  };

  
  /** This useEffect calls the fetch function everytime the page is refreshed, to ensure the data is accurate
   */
  useEffect(() => {
    getVerses();
  }, []);

  // These handleChange functions are used for the input textfields
  let handleChangeBook = (event) => {
    setBook(event.target.value);
  };
  let handleChangeChapter = (event) => {
    setChapter(event.target.value);
  };
  let handleChangeVerse = (event) => {
    setVerse(event.target.value);
  };

  return (
    <div className="Bible">
      <header className="Bible-header">
        <nav>
          <Link className="App-link" to="/">
            Home
          </Link>{" "}
          |
          <Link className="App-link" to="/tictactoe">
            Tic-Tac-Toe
          </Link>{" "}
          |
          <Link className="App-link" to="/bible">
            Bible Verse
          </Link>
        </nav>
        <img src={bible} className="Bible-logo" alt="Bible" />
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
            required
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
            required={book === "votd" ? false : true}
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
            required={book === "votd" ? false : true}
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
          {book === "votd" ? "The verse of the day is from: " : ""}
          {request
            ? request[0].bookname +
              " " +
              request[0].chapter +
              ":" +
              request[0].verse
            : ""}
        </h1>
        <p>
          {/*Here I use a ternary operator '?' to only attempt to display the fetched data if the
              data exists currently (has been fetched). This prevents the page from throwing an error when the HTML
              tries to render before the request has returned. */}
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
