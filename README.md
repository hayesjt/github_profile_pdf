# github_profile_pdf
Using Node.js to take GitHub information and build a profile - this will come out in PDF form

Objective:

This application will use only backend functions to create an HTML page using JavaScript and an API call made to GitHub in order to get a users basic information. This will pull the following from GitHub:

-Name
-Username 
-Image used on GitHub
-Link using Google Maps to users location
-Link to users Github Profile 
-Link to users blog
-Users Bio
-Number of public repositories
-Number of followers
-Number of GitHub stars
-Number of users following

The function will then take all this information and using a coverter module it will take this HTML page and convert it into a PDF so it is printable and readable. The user also gets a choice of color as well.

How does the system know what profile to get and what color they want?

The user is asked questions by using the node module inquirer. This application allows you to ask the users questions and based on their responses you can use that data throughout the application. I programmed it to ask the user for their GitHub username and when they answer it gets plugged into an API call to get their information. I also made the program as them a color in which that answer will be plugged into the programs HTML. 