# cps353-final-gurge


* Author: David Gurge

* Class: CPS 353 Internet Programming

* Professor: Dr. Russ Tuck

* # Project Goal:
Create an interesting and creative website with React, which meets the requirements below:
- The project must use an external RESTful API.
- For an A, the project must also use a RESTful API server you write, written in Java with Spring Boot and running on Google Cloud Run.
- Your app must include at least these features:
- Controlled text input - with immediate response as the user types.
- Noncontrolled text input - with response only after the user hits enter or clicks to submit.
- Queries to API server that result in updates to the displayed view.
- At least 2 top-level views, with navigation between them.
- In addition it should follow best practices, including:
  - Good use of CSS
  - Good comments for each component and each non-trivial function or method.
- Your app must include, and link to, at least one static web page of your creation.   

# Run Notes
When first running the App with npm start, it throws an error with my TicTacToe.js about trying to add an eventListener to "null". This is an issue relating to my .js containing DOM references which don't work on initial refresh. I tried using things like "window.onload" to circumvent the issue but it would still throw the error. However, I found if I just clicked the 'X' on the error message the page still loaded and displayed perfectly fine. I also would get similar errors when viewing the "/tictactoe" page, but if I clicked refresh while on that page the TicTacToe functioned perfectly fine as you saw in my demo. I tried for a long time to understand why it wasn't loading properly even with the window.onload but could not find any solutions for my problem.
