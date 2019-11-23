const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

const choices = ["Black", "Green", "Red", "Blue" ]

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "github",
        message: "What is your GitHub username?",
      },
      {
        type: "rawlist",
        name: "color",
        message: "What color do you like?",
        choices: choices,
      },
    ])
    .then(answers => {
      getAPI(answers.github)
      .then(response => {
        console.log(response);
      })
    });
  };

  const axios = require('axios');

function getAPI(userName){
return axios.get(`https://api.github.com/users/${userName}`)
  .then(function (response) {
    // // handle success
    // console.log(response.data);
    // // Data I want
    // // Name of person
    console.log(response.data.name)
    // // image
    console.log(response.data.avatar_url);
    // // github username
    console.log(response.data.login);
    // // user location
    console.log(response.data.location);
    // //github portfolio
    console.log(response.data.html_url);
    // //user blog
    console.log(response.data.blog);
    // // user bio
    console.log(response.data.bio);
    // // # of public repo
    console.log(response.data.public_repos);
    // // number of followers
    console.log(response.data.followers);
    // // number of following
    console.log(response.data.following);
    // // Number of GitHub stars
    console.log(response.data.public_gists);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    process.exit(1)
  });
}


function makeHTML(response, answers) {
  return
  `<!DOCTYPE html>
  <html lang="en">
  
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="style.css">
      <title>Document</title>
  </head>
  
  <body>
      <div class="container text-center">
          <!-- Created empty space ontop of PDF/profile page -->
          <div class="row row1">
              <div class="col-md-12 top-space" style="height: 30px;">
                  <!-- Empty row and column to create space ontop of PDF/profile -->
              </div>
          </div>
          <!-- Row 2: this contained the jumbotron which contains the profile picture, name, github username, location link, github link, and blog link -->
          <div class="row row2">
              <div class="col-md-1">
                  <!-- Empty content for empty space on both sides of the page -->
              </div>
              <div class="col-md-10">
                  <div class="jumbotron">
                      <img src="${response.data.avatar_url} alt="Profile Picture" style="border-radius: 50%; border: 5px solid ${answers.color};">
                      <h1 class="display-4" style="color: ${answers.color};">${response.data.name}</h1>
                      <h3>GitHub Username: ${response.data.login}</h3>
                      <hr class="my-4">
                      <p>${response.data.bio}</p>
                      <a class="btn btn-primary btn-lg" style="" href="https://www.google.com/maps/place/${response.data.location}"
                          role="button">Location</a>
                      <a class="btn btn-primary btn-lg" style="" href="${response.data.html_url}" role="button">GitHub</a>
                      <a class="btn btn-primary btn-lg" style="" href="${response.data.blog}" role="button">Blog</a>
                  </div>
              </div>
              <div class="col-md-1">
                  <!-- Empty content for empty space on both sides of the page -->
              </div>
          </div>
          <div class="row row3">
              <div class="col-md-1">
                  <!-- Empty content for empty space on both sides of the page -->
              </div>
              <div class="col-md-10 text-center">
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title" style="color: ${answers.color};>Public Repos:${response.data.public_repos}</h5>
                      </div>
                  </div>
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title" style="color: ${answers.color};">Followers:${response.data.followers}</h5>
                      </div>
                  </div>
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title" style="color: ${answers.color};>Following:${response.data.following}</h5>
                      </div>
                  </div>
                  <div class="card">
                      <div class="card-body">
                          <h5 class="card-title" style="color: ${answers.color};>GitHub Stars:${response.data.public_gists}</h5>
                      </div>
                  </div>
              </div>
              <div class="col-md-1">
                  <!-- Empty content for empty space on both sides of the page -->
              </div>
          </div>
      </div>
  </body>
  
  </html>`;
}

  async function init() {
    try {
      const answers = await promptUser();

      const api = await getAPI();
  
      const html = makeHTML(answers, api);
  
      await writeFileAsync("employee.html", html);
  
      var readHtml = fs.readFileSync('employee.html', 'utf8');
      var options = { format: 'Letter' };
       
      pdf.create(readHtml, options).toFile('employees.pdf', function(err, res) {
        if (err) return console.log(err);
        console.log(res); 
      });
  
      console.log("Successfully wrote to employee.html");
    } catch (err) {
      console.log(err);
    }
  }
  
  init();