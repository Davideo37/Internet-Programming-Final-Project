# cps353-final-gurge

# Assignment 11 Plan:
For my web app, I plan to make it a combination of two main pages. 
<li> 1: A game of some sort, probably the 15 puzzle or tic tac toe
<li> 2: A page to look up bible verses <br>

I also plan to include a homepage that has buttons to navigate to one or the other and also include a link to a static "credits" page that list some information about me and the project

# Assignment 11 Run Notes
When first running the App with npm start, it throws an error with my TicTacToe.js about trying to add an eventListener to "null". This is an issue relating to my .js containing DOM references which don't work on initial refresh. I tried using things like "window.onload" to circumvent the issue but it would still throw the error. However, I found if I just clicked the 'X' on the error message the page still loaded and displayed perfectly fine. I also would get similar errors when viewing the "/tictactoe" page, but if I clicked refresh while on that page the TicTacToe functioned perfectly fine as you saw in my demo. I tried for a long time to understand why it wasn't loading properly even with the window.onload but could not find any solutions for my problem.
