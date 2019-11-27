// MODULES I NEED
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

// ASKING QUESTIONS TO GET API CALL
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub Username:"
    },
    {
      type: "list",
      name: "color",
      message: "Pick a color:",
      choices: [
        "Blue",
        "green",
        "red",
        "black"
      ],
    }
  ])

    //PUSHING ANSWERS THROUGH API **IMPORTANT NOTE: AXIOS.ALL WAS NEEDED FOR SOME REASON - ASKED A CLASSMATE**
    .then((questionAnswers) => {
      let answers = questionAnswers

      //Array of Axios calls
      axios.all([
        axios.get(`https://api.github.com/users/${answers.username}`),
      ])
        //Information pulled from the GitHub API
        .then(axios.spread((res) => {

          console.log(res.data.avatar_url);

          console.log(res.data.name);

          console.log(res.data.company);

          console.log(res.data.location);

          console.log(res.data.html_url);

          console.log(res.data.blog);

          console.log(res.data.bio);

          console.log(res.data.public_repos);

          console.log(res.data.followers);

          console.log(res.data.following);

          console.log(res.data.public_gists);

          //WRITING THE HTML I CREATED IN MYHTML.HTML - NEEDS TO BE IN THIS PROCESS TO START 
          return writeFileAsync("index.html", `
          <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
    <style>
   .jumbotron {
      background-color: darkgray;
      width: 100%;
      height: 400px;
  }
  
  a {
      color: lightgray;
  }
  
  .image {
      height: 250px;
      width: 250px;
      border: 3px solid lightgray;
      border-radius: 150px;
      position: absolute;
      right: 41%;
      top: -10px;
      text-align: center;
      z-index: 1;
  }
  
  .info {
      height: 375px;
      width: 100%;
      margin: 0 auto;
      margin-top: 30px;
      padding-top: 240px;
      text-align: center;
      line-height: 12px;
      font-size: 24px;
      color: lightgray;
      border-radius: 15px;
  }
  
  .container {
      margin-top: 100px;
      font-size: 24px;
  }
  
  .bio {
      width: 100%;
      height: 150px;
      color: lightgray;
      text-align: center;
  }
  
 .card {
      border-radius: 10px;
      width: 100%;
      height: 120px;
      padding: 20px;
      text-align: center;
      margin: 0 auto;
      margin-top: 10px;
      margin-bottom: 20px;
      color: lightgray;
  }
  
    </style>
    <title>Profile</title>
</head>

<body>
    <div class="jumbotron">
        <div class="overlay"></div>
        <div class="inner">
            <div class="row">
                <div class="col-12">
                    <img class="image" src="${res.data.avatar_url}">
                    <div class="info" style="background-color:${answers.color};">
                        <p class="name">My name is ${res.data.name}</p>
                        <p class="company">Currently at ${res.data.company}</p>
                        <p class="location"> <i class="fa fa-map-marker" aria-hidden="true"></i> <a href="https://google.com/maps/search/${res.data.location}" target="_blank"> ${res.data.location}</a>  &nbsp <i class="fa fa-github" aria-hidden="true"></i><a href="${res.data.html_url}" target="_blank">GitHub</a> &nbsp  <i class="fa fa-rss" aria-hidden="true"></i><a href="${res.data.blog}" target="_blank">blog</a></p>
                    </div>
                </div>
            </div> 
        </div>
    </div>     
      <div class="container">
        <div class="row">
            <div class="col-3"></div>
            <div class="col-6 bio">
                ${res.data.bio}
            </div>
            <div class="col-3"></div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-4">
                <div class="card" style="background-color:${answers.color};">Public Repositories: <br> ${res.data.public_repos}</div>
            </div>
            <div class="col-4">
                <div class="card" style="background-color:${answers.color};">Followers: <br> ${res.data.followers}</div>
            </div>
            <div class="col-2"></div>
        </div>
        <div class="row">
            <div class="col-2"></div>
            <div class="col-4">
                <div class="card" style="background-color:${answers.color};">GitHub Stars: <br>${res.data.public_gists} </div>
            </div>
            <div class="col-4">
                <div class="card" style="background-color:${answers.color};">Following: <br> ${res.data.following}</div>
            </div>
            <div class="col-2"></div>
        </div>
    </div>

</body>

</html>`);

        }));
    });
}

// FUNCTION THAT RUNS THE ENTIRE APPLICATION
async function init() {
  try {
    // AWAITING FOR THE USER TO GET ASKED QUESTIONS AND API TO RUN
    await promptUser();


    // FS NEEDED TI CREATE HTML
    var readHtml = fs.readFileSync('index.html', 'utf8');
    var options = { format: 'Letter', height: "2000px", width: "2000px" };


    // USING PDF MODULE TO CREATE HTML INTO PDF 
    pdf.create(readHtml, options).toFile('profile.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });

    // TELLS YOU IF EVERYTHING WENT OKAY AND YOU NOW HAVE A PDF
    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}

// CALLING THE FUNCTION TO RUN APPLICATION
init();