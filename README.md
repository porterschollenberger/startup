# Rags to Riches
> "As long as I can buy a rock at the end, then I'm happy." -Anonymous
## Startup Specification
### Elevator Pitch
Imagine turning the mundane task of cleaning into a thrilling business adventure – that's "Rags to Riches," my new online idle game. Players start with a simple rag and strategically expand their cleaning empire by tackling various spills and messes. As you clean, you earn money to invest in better equipment and grow your operation. What sets "Rags to Riches" apart is its unique twist on the idle genre, offering a relatable and oddly satisfying experience with colorful graphics and humorous scenarios. It's the perfect low-pressure online game that transforms cleaning into the next big gaming sensation. Are you interested in seeing how we're making tidying up addictively fun?
### Design
![StartupSketch](https://github.com/user-attachments/assets/372d0877-d494-4658-b4ed-ef12ddd2e046)
### Key Features
- Save your progress and play from anywhere you'd like with secure account login
- Harness your competitive side and play to reach #1 on the leaderboard
- Never get overwhelmed by game content, everything updates dynamically so you know what's next
- Bored easily? Random facts will keep you entertained while you play
- Over 100 different store items to buy providing you with hours of entertainment
- Secret achievements to find as you play
### Technologies used
- **HTML:** The skeleton of the site. Will provide basics of text, images, input fields, links, navigation, and overall structure.
- **CSS:** Will be used to provide the color, background, sizing, spacing, animations, and complete look and feel of the application.
- **JavaScript:** A huge part of the application, providing calculation of earnings, interactivity when using buttons in the store, and turning the "website" into a "game."
- **React:** Used for login, dynamic store, and connecting the user to the leaderboard data, which will be updated live.
- **Service:** Backend services I will use include:
  - Login
  - Leaderboard
  - Random Fact
- **Authentication:** Users will need to log in in order to play and save their progress, along with having their name appear on the leaderboard.
- **Database Data:** User information and progress will be stored persistently in a database. Leaderboard will be able to show top players. Login will be required to play.
- **Websockets:** Users will be able to see the live leaderboard of the richest players. Data will be coming back and forth from server and client through websockets.
## HTML Deliverable
- **HTML Pages:** I made four different HTML pages for login in, playing, viewing the leaderboard, and viewing achievements.
- **HTML Elements:** I was sure to use all the needed HTML elements including BODY, NAV, MAIN, HEADER, and FOOTER.
- **Links:** I used links to connect the pages of the application together and provide a link to my GitHub repository.
- **Text:** I used text in my application to show the names of store items, descriptions, and prices. I also used text in other places of the application to let the user know where they are and where they can navigate next.
- **Placeholders:** My application includes placeholders for the random fun facts that I will be referring to later in the development process.
- **Images:** I used some very standard images for the items I currently have in my store. These are placeholders for now as I would like to do my own art for the game in the future.
- **Login:** My application contains a basic login form for users to use right as they land on the webpage. This will be fully functional in the future. There is also a spot on the play page where the username of the current user is displayed.
- **Database:** The leaderboard page will be referring to the database so placeholders have been set up to show what the leaderboard will look like in the future.
- **Websockets:** The leaderboard page will also be using websockets to make the data available to all players and update live as more money is gained by users.
## CSS Deliverable
- **Header, footer, and main content body:** My application contains these items for each page. I made sure they were consistent across each page.
- **Navigation elements:** My navigation elements are consistent across each page. I changed their color, positioning, and responsiveness to window resizing.
- **Responsive to window resizing:** The navigation elements, as previously mentioned, disappear when the window gets too small and a menu icon appears. The login and register forms, store items on the game page, and the achievements resize and move as the window gets smaller.
- **Application elements:** Used a consistent style to make the page elements, cards, buttons, and text. 
- **Application text content:** All the text in the app is consistent in font, style, and placement. It also resizes, moves, and disappears as needed.
- **Application images:** The application has images for all the store items and one for each achievement. The store items are AI generated. I made sure to maintain a consistent size and made the images circular.
## React Deliverable
- **Bundling:** My Application is bundled and transpiled using Vite.
- **Components:** I made components for my header, navbar, ticker, and footer. I also made components for the following pages:
  - **Home:** The home page can now switch between the login and register screen. Upon form submission, the user is brought to the play page, although login has not been fully implemented.
  - **Play:** The game itself is now playable! You can purchase items to earn more and more money. The game state is kept track of in the local storage so your progress is kept. Though the game is not balanced well, I am still very proud to have this functionality working!
  - **Leaderboard:** The leaderboard is now filled with dummy data which updates every 30 seconds demonstrating the ability to update information. There is also now enough data to navigate to different leaderboard pages.
  - **Achievements:** This page did not receive many react changes; it mostly got UI adjustments along with the ability to search. I also added a progress bar to show progress to total completion.
- **Router:** The site has been converted to a single page application implementing React Routes to show the main content for each page discussed earlier.
- **Hooks:** I made excellent use of the useState, useEffect, and useCallback hooks to add dynamic updating information to my site.