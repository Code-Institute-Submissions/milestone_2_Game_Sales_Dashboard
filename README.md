# Milestone 2
## Game Sales Dashboard
By Martin Crowley

### User Experience (UX)
#### Project Purpose
I am focusing on creating a Data dashboard aimed towards helping future game developers find the most popular games and genres of games on the two leading games consoles (PS4/XBoxOne) and to show them the publishers that are accredited to/have links to those best-selling games.

The data dashboard will use both D3 and DC to plot multiple charts that will focus on different aspects of the dataset that I am using. The information I will mainly focus on is the sales numbers from each different region (that make the global sales total), as well as the genre type for each game, and the publisher of each respective game. This will give a better understanding of the publishers that consecutively produce commercially successful games, as well as seeing which genres succeed the most in the current video game market.

The primary target audience are developers that are looking at which publishers to look towards when developing a game, and publishers/developers when wanting to see what genres of game are the most commercially successful in the current game market. The data dashboard may also be used by people wanting to look up on the best-selling games/genres for personal use to track trends or just study the data.

##### Why would a user want this?
Gaming is a tremendously popular pastime, and due to the sheer growth in people owning games consoles – (with PS4 sales reaching 91.6 Million, and XBoxOne sales being estimated at around 40 million in January 2019(https://www.forbes.com/sites/erikkain/2019/01/11/putting-the-playstation-4s-91-6-million-sales-into-context/#5f1d8ee36c50)) there is never going to be a shortage of people looking to buy new software/games to play.

Therefore for game developers and publishers, it is important to understand what sells in the current video games market, and what games (and therefore genres) have amassed large numbers of sales. For developers it’s also beneficial to know which publishers were on board with which games, as often the PR/marketing/etc… that publishers take care of, could have had an influence on why a game did so well.

##### Why is this so special?
The Data dashboard will stand out as it will have graphs that are easy to read and comprehend, and these will present the dataset in a way that provides the user with all of the required information, but none of the hassle involved in sorting it into a user-friendly format.

#### User Experience
There will be clean, well presented data in easy to understand/read format (graphs, charts, etc…), this will be the main draw to the dashboard.

The dashboard will also have responsive design, so it can display correctly on mobile devices, right through to large desktops, therefore allowing the information to be accessed and viewed properly no matter where you are or what device you are using.

There will also be text included on the page to explain the data/statistics being seen on screen, giving further knowledge/context to the data being displayed, so as to let the user take away a greater understanding of the data from the dashboard.

#### User Stories
- As a user, I'd like to see clean, well presented data in easy to understand/read format (graphs, charts, etc…)
- As a user, I'd like to see a variety of charts/graphs to show different data in the dataset
- As a user, I’d like for the dashboard to be made so that it will work and adapt to all manner of devices (responsive design)
- As a user, I'd like to see some text to explain the data/statistics being seen on screen, giving further knowledge/context to the data being displayed
- As a user, I'd like to see engaging use of colour making the dashboard pleasant to look at and keeping the user interested
- As a user, I'd like to see easy to read font format for both the title/heading and all other writing on the dashboard
- As a user, I'd like to be able to see the difference between game sales for certain genres depending on which console the game was on
- As a user I would like to be able to compare data from the same chart by selecting more than one genre/publisher at a time, this allows for easy comparison to be made between data of the same kind
- As a user, I'd like to be able to reset all the filters placed through clicks on the graphs with a simple button (therefore reverting the data shown on the graphs back to the default data) 

#### Design Ideas
When thinking about the layout and the design of the dashboard, I wanted it to be eye-catching and to stand out, yet to also look professional and of a high standard. I broke the design down into various style decisions:

##### Font
I will be using “Sans-Serif” for the dashboard’s main font type, as this is a modern, professional looking font that is easy to read.

##### Colour Scheme
I am using the “Slate” theme from: https://bootswatch.com 

It has a nice contrast of colour: with the navbar being custom styled to the official XBOX ONE green colour, the background will also have a nice stylised picture of a PS4 controller with deep greens and blacks, and the writing will stand out as a nice bold white on top of everything else.

- ps4-controller-green-light: Photo by Nikoloz Ergemlidze on Unsplash (https://unsplash.com/photos/v5STLzdFEPs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText )

I’d also like to use the same XBOX Green and official Playstation Blue as two of the main colours on the dashboard, this is to go with the theme of creating a dashboard about sales on PS4 (blue logo) and XboxOne (green logo).
https://www.designpieces.com/palette/xbox-one-colour-palette-hex-rgb/
https://www.designpieces.com/palette/ps4-colour-palette-hex-and-rgb/

#### Wireframes
For my wireframes, I designed these by hand for both Mobile, and Tablet/Desktop.
Knowing full well that "Charts using D3.js are not responsive as they are designed for desktop or large-screen viewing", I opted to design the final set of wireframes for the desktop, as this was just the final layout for how things would sit, the functionality and mobile layout would be the same as before due to the xs screen size (meaning each chart would take up the full screen width on mobile), whereas the desktop layout would need to be arranged due to working out breakpoints and screen widths.

These wireframes have been included and are able to be viewed in a seperate directory/folder called "Wireframes", which have subdirectories called "Desktop" and "Mobile".

#### Features
##### Current Features
- Feature 1 - Top title bar with Reset Filters button
    - The top bar contains the name of the site and also a button that when clicked, resets all the filters back to their default values.
    - The bar is fixed to the top of the page so even when the user scrolls down, the user can quickly and easily reset the filters at any point. This avoids the need for constant scrolling up and down the page.
- Feature 2 - Footer
    - A simple footer with a link to the original dataset on kaggle, and also will contain my name and a link to my GitHub page.
- Feature 3 - Introduction
    - This section will contain a brief introduction that will explain what the dashboard was created for as well as what it aims to do, it will also provide some basic instructions. 
- Feature 4 - Dropdown Filters
    - The “Filter by Game” dropdown allows the user to see all the Games in the list/dataset. This is also dependent upon applied filters, therefore allowing individuals to see the games that are left that actually align with all the selected filters applied.
    - The “Filter by Console” dropdown allows the user to change the console that the data is being displayed for. By default the dropdown will not have either console selected and will display the number of games in the dataset for each console currently selected. The number of games will also change depending on what filters are applied.
    - The “Filter by Publisher” dropdown allows the user to see all the Publishers in the list/dataset. This is also dependent upon applied filters, therefore allowing individuals to see the Publishers that are left that actually align with all the selected filters applied.
    - The “Filter by Genre” dropdown allows the user to see all the Genres in the list/dataset. This is also dependent upon applied filters, therefore allowing individuals to see the Genres that are left that actually align with all the selected filters applied.
- Feature 5 - Pie Charts
    - There are 3 pie charts, all displaying different data, they will cover:
    - The total number of game sales between consoles (to give a better idea of which console has sold the most games – dependent on the applied filters)
    - The split of genres in the dataset for both consoles, to show the different types of genre in the top 100, but also to show the most popular genres in terms of sales
    - The split of Publishers in the dataset for both consoles, to show the which publishers have produced games in the top 100, but also to see which ones have multiple games in the top 100 too
- Feature 6 - Row & Bar Charts
    - There are 3 similar bar charts, these will show the sales for each genre in specific regions (North America, Europe, Rest of the World).
    - The row chart is used to show the Global number of sales per genre.
    - The row chart for the Global sales per publisher will be a stacked row chart, this is due to the focus on genre allowing to display sales from all areas of the world individually in bar charts, therefore painting a better picture of that area of the dataset, so I thought it would only be fair to produce a stacked row chart for the global sales per publisher, meaning the data shown is more in depth

##### Future Features
- Feature 1 - Section to display individual game information
    - Currently, there will be a filter box that allows you to see all the games in the dataset, however I would eventually like include a separate section either at the bottom or in the form of a pop-up modal  - so that when you select an individual game from the list it will display the information on that game including a synopsis, the genre of the game, it’s publisher, as well as the number of sales per region/globally that it has.

#### Technologies Used
The following technologies were used in the design and build of this project.
- WebStorm
    - WebStorm IDE was used to write the HTML, CSS and JavaScript.
- HTML5 & CSS3
    - HTML5 & CSS3 were used to create the layout and styling of this site
    - Code validators were used to check for errors with the HTML and CSS
- Bootswatch
    - Bootswatch (Slate Theme) was used to help with the responsive grid structure for the site (bootstrap) and also to provide some basic CSS styling.
- JavaScript
    - JavaScript and selected external libraries have been used throughout this site…
- For the creation and manipulation of the data-visualization elements, I used the following Javascript libraries:
    - d3.min.js
    - dc.min.js	
    - crossfilter.min.js
    - queue.min.js - was used to load the dataset fully before running any other files.
- Git & GitHub
•	Git used for version control. GitHub used as a remote repository and the hosting of this site.
Other libraries
•	dc.min.css

#### Testing
When testing the website, I carried out testing locally in WebStorm and on GITHUB pages using Chrome developer tools. On chrome developer tools I tested its functionality on simulated devices, in both portrait and the landscape views. The simulated devices that the website was tested on were:
- Galaxy S5
- Pixel 2
- Pixel 2 XL
- iPhone 5/SE
- iPhone 6/7/8
- iPhone 6/7/8 Plus
- iphone X
- iPad
- iPad Pro
- Responsive

I have also tested the website both locally and remotely on actual devices (rather than just simulated ones on Google Chrome tools), these devices consisted of:
- iPhone 6s
- iPad (generation 2)
- Sony Xperia
- Multiple desktops (various sizes)

Some examples of the physical testing carried out by myself on certain parts of the site include:
- Reset Filters button
    - In order to test the reset filters button, I applied various filters by selecting a console type, genre type, publisher type and used multiple filters from the charts.
    - I then checked the data being shown was specific to the filters that had been applied.
    - Then I clicked on the reset filters button, and the onclick event triggered the page to reload itself, resetting all of the filters.
- Game selector
    - In order to test the game selector/filter, I clicked into the selector and chose a game (e.g Assassins Creed IV: Black Flag)
    - In order to see if the selector was working, I then clicked onto the other selectors and see if the options they were providing had changed.
    - For example, the genre selector box now only displayed “Action-Adventure”, which was because that is the genre of the sole game selected, and so other data in the dataset wasn’t currently being shown with the filter that was applied.
    - There is a slight exception when certain games that are selected, as they may belong to both games consoles, so when selecting the game and clicking on the console selector, it may still show both consoles, but it will have a number next to each console name that indicates that there is only one game on each console with the currently applied filter/s. 
- Console selector
    - In order to test the console selector, I clicked onto the console selector dropdown and it displayed both the PS4 and the XBOX-ONE
    - This could then be tested by clicking on either of these. 
    - Upon clicking on the PS4, and the XBOX-ONE individually, I was then able to look at both the genre and publisher selector menus, and the results for the data being shown was reduced down to 100 for the console currently selected. This was expected and was what I aimed to achieve as it showed that the data being displayed was the correct amount (as there is 100 games per console on the dataset)
- Genre selector
    - In order to test the genre selector, I clicked into the selector box
    - In the dropdown menu I would select one genre type, (e.g. Action)
    - This which would then change the data being displayed on the other graphs, so on the genre comparison pie chart there was only one genre being shown, which was the “Action” genre, the amount of games available per console in the console selector had also reduce and was now 22 for PS4, and 22 for XBOX-ONE (totalling 44). This selector worked correctly with each genre available.
- Publisher selector
    - In order to test the publisher selector, I clicked into the selector box
    - In the dropdown menu I would select one publisher, (e.g. Electronic Arts, which has a total of 26 games available)
    - This would then change the data being displayed on the other graphs, so on the publisher comparison pie chart there was only one publisher being shown, which was “Electronic Arts”, and the amount of games available per console in the console selector had also reduce and was now 11 for PS4, and 15 for XBOX-ONE (totalling 26). This selector worked correctly with each publisher available.
- Link to the dataset on kaggle
    - Scrolled to the bottom of the page
    - Clicked on the “Kaggle” logo
    - This loaded up a new webpage that took me directly to the datasets that I used for the dashboard
- Link to my Github
    - Scrolled to the bottom of the page
    - Clicked on the text “©2019 Martin Crowley”
    - This loaded up a new webpage that took me directly to my Github user page/repositories
- North America sales per Genre Bar Chart
    - In order to test the North America sales per Genre bar chart, I would select one genre by clicking on its respective bar (e.g. Shooter which has a total of 97.070 million games sold in N.A)
    - This would then change the data being displayed on the other graphs, so on the genre sales bar charts and genre comparison pie chart, there would only be the data for the “Shooter” genre being displayed.
    - Also the global sales per publisher stacked-bar chart and publisher comparison pie chart were only showing the data for publishers attributed to the “Shooter” genre.
    - This was the same result for all other genre sales bar charts.
- Global sales per Publisher Stacked-Bar Chart
    - In order to test the Global sales per Publisher Stacked-Bar Chart, I would select one Publisher by clicking on its respective bar (e.g. Activision - which has the sales data for each of the areas: North America - 46.300 million, Europe - 37.720 million and Rest of World - 15.290 million being shown)
    - This would then change the data being displayed on the other graphs, so on the genre sales bar charts and genre comparison pie chart, there would only be the data for the genres attributed to the Publisher selected (“Activision”) being displayed, which were “Shooter” and “Platform”.
    - Also the global sales per publisher stacked-bar chart and publisher comparison pie chart were only showing the data for publishers attributed to the “Shooter” genre.
    - The publisher comparison pie chart now only showed the data for the one publisher selected, and the publisher selector showed only “Activision” and how many games that they had published (which is 17).
    - The console selector now only shows that there is data from 9 PS4 games, and 8 XBOX-ONE games being shown. 
- Pie Charts
    - In order to test the pie charts, I first looked to the comparison of game units sold per console pie chart and it displayed both the PS4 and the XBOX-ONE, data, so I clicked on the PS4 section
    - This then filtered all the data on the screen to be specific only to the PS4 (genre sales, publishers, etc…) 
    - I then went down to the genre comparison pie chart, and clicked on the “Action” genre.
    - This then filtered the data being shown on the dashboard down to the data applicable to “PS4” console type, and the “Action” genre.
    - I then went down to the publisher comparison pie chart, and clicked on the publisher “Ubisoft”.
    - This then filtered the data being shown on the dashboard down to the data applicable to “PS4” console type, the “Action” genre, and with “Ubisoft” as the publisher.
    - I then went to the Game selector at the top of the page, and it showed that the data had been filtered using the various pie charts and they were performing as they should be, as there were only 6 games showing (out of a possible 200) that were specific to all the filters currently being applied on the dashboard.

I also ensured that I went onto https://jshint.com/ to check for errors in the code I had written, and JSHint found 4 instances of undefined variables (queue, d3, crossfilter, dc) however this was not an issue as they all refer to external libraries. 

I encountered an issue where I found that I was repeatedly using: “Number.parseFloat(number).toFixed(3)” in my functions to get 3 decimal places, so in order to adhere to the DRY principle (Don't Repeat Yourself) I made this into a separate function and called it throughout my code, making the code look a lot more professional and clean.

I also had an issue where the page seemed to be rendering larger than the actual page width. I looked further at the code and realised that the width of the charts was making the page appear wider than it should be (however the footer wasn’t stretching fully across the bottom of the page, nor was the header reacting the way it should and wrapping on xs screen sizes. I got around this issue by lowering removing the width attribute from each of the graphs, and setting useViewBoxResizing(true) and by using a css class style to enable to svg(charts) to have a responsive width by setting their width to 100% (which then gets its width from its parent element). This could not be done for the pie charts however so I had to look at setting a width for the pie charts that would work on all of the different bootstrap breakpoints for different devices. Media queries were also used to help the charts reposition more effectively depending on the screen size of the device being used.

Another issue was that “Charts using D3.js are not responsive as they are designed for desktop or large-screen viewing” , therefore certain information from the graphs is displayed on hover, which requires a mouse to actually view. This doesn’t take away from the base information being shown to mobile users, but it means that they might not be able to see the exact specific figures that would be shown on hover.
###### Known issues
When carrying out my testing, there was one minor bug I have encountered, which is that when trying to use a fixed background image for the body, there is an issue wherein the fixed background image that was applied to the data dashboard worked fine and would allow the content to be scrolled and for the image to remain fixed when viewing the website on the simulated mobile and tablet devices on google chrome tools, yet this functionality wouldn’t work properly on the iphone 6s/ipad that I currently own, as the background image would stretch across the entire vertical length of the dashboard. All other functionality works fine, and the background image displays as expected on desktops. I will look into this issue in the future and try to resolve it.

#### Deployment
My dashboard was coded in WebStorm. Once I had created the workspace in WebStorm for my project to be built in, I then turned to GitHub (which is a web-based interface that links with Git and allows you to store and view the different versions of code at the stages it was pushed to the GitHub server) and created a repository for my milestone project, I then went back to WebStorm, and into the terminal I pasted in the Command Line Interface commands that GitHub had provided me with to create a local Git repository and form a link between Git and the GitHub server.
- echo "# practice" >> README.md
- git init
- git add README.md
- git commit -m "first commit"
- git remote add origin https://github.com/Mcrowley93/milestone_2_Game_Sales_Dashboard
- git push -u origin master

Once I had done this, I was then able to use git commands in the CLI at various stages to add changes I had made within the workspace, to the staging area (storing files is a 2 step process). This was done using the command: ‘git add ‘ which could be followed with the specific file name/s that needed to be added to the staging area (prior to being committed to the repository). Alternatively, when there was a few changes that could be added all at once, the command was followed by a full stop (‘git add .’)

Once changes had been added to the staging area, they then needed to be commited (the 2nd stage of storing files) to the repository using ‘git commit’. However with each commit, I also included a message that explained the reason for each commit to the repository. This was done by using the command: ‘git commit –m “TEXT GOES HERE“ ‘

At this stage, the local Git repository could then be synced with the repository on the GitHub server, which was achieved by using the command: ‘git push’

Once the project/website was in the dedicated GitHub repository, it was then able to be made live in the settings by using GitHub Pages.

The website can be found here: 
https://mcrowley93.github.io/milestone_2_Game_Sales_Dashboard/ 

#### Credits
##### Content
Code for the data dashboard was written by myself with knowledge I’ve picked up from the code institute course.

##### Code used from others
I received help with an issue I had of rotating the x-axis text from User: “davisford” (commented on 18 Oct 2014) - https://github.com/dc-js/dc.js/issues/731

##### Dataset
The source dataset was obtained from kaggle, from user SID_TWR. (PS4 data: https://www.kaggle.com/sidtwr/videogames-sales-dataset#PS4_GamesSales.csv , XBOX ONE data: https://www.kaggle.com/sidtwr/videogames-sales-dataset#XboxOne_GameSales.csv)

The original .csv files had hundreds of entries in, so I condensed the data I needed down to 100 entries from each csv file, and then I put them into a custom csv file called “gamesales.csv”.

The csv file also contain an additional column of data (for “japan”), but the “japan” column’s data was so small, that to save file space it was removed from the csv file, and it’s data was added onto the data for the “rest-of-world.

In the dataset, the data entries were done to 2 decimal places, it would often mean the “global” data would total more than the 3 data columns (North America, Europe & Rest of World) added together (where the data doesn’t show exact figures below the 2 decimal places). In these situations, the data was rounded so that the values would be identical when appearing on a chart so as to not cause confusion or irregularities.

##### Media
ps4-controller-green-light: Photo by Nikoloz Ergemlidze on Unsplash (https://unsplash.com/photos/v5STLzdFEPs?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText )

kaggle-logo: https://commons.wikimedia.org/wiki/File:Kaggle_logo.png

##### Acknowledgements
- Spencer Barriball - My Code Institude assigned mentor and fellow video game enthusiast, for his invaluable knowledge, guidance and advice.
- Dave Laffan (Dave L _lead) for hosting a slack call, talking myself and various others through his milestone project to give us a greater understanding of interactive frontend dashboards, and taking the time to answer any questions we had regarding interactive data dashboards.
- My Father - For supporting me with all I do and for helping to grow my passion for gaming to what it is today.