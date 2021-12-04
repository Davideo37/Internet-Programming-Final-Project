import { useState, useEffect } from 'react'
import { Box, TextField } from "@mui/material"
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

  return (
    <div className="App">
      <header className="App-header">
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
          <TextField className="search" id="book" color="primary" label="Book" value={book} />
          <TextField
            id="chapter"
            color="primary"
            label="Chapter"
            value={chapter}
          />
          <TextField
            id="verse"
            color="secondary"
            variant="filled"
            label="Verse"
            value={verse}
          />
        </Box>

        <h1>
          {" "}
          {/*Here I use a ternary operator '?' to only attempt to display the fetched data if the
              data exists currently (has been fetched). This prevents the page from throwing an error when the HTML
              tries to render before the request has returned. */}
          The verse of the day is from:{" "}
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