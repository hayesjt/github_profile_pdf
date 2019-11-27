const axios = require('axios');

function getAPI(userName){
return axios.get(`https://api.github.com/users/${userName}`)
  .then(function (response) {
    // // handle success
    // console.log(response.data);
    // // Data I want
    // // Name of person
    // console.log(response.data.name)
    // // image
    // console.log(response.data.avatar_url);
    // // github username
    // console.log(response.data.login);
    // // user location
    // console.log(response.data.location);
    // //github portfolio
    // console.log(response.data.html_url);
    // //user blog
    // console.log(response.data.blog);
    // // user bio
    // console.log(response.data.bio);
    // // # of public repo
    // console.log(response.data.public_repos);
    // // number of followers
    // console.log(response.data.followers);
    // // number of following
    // console.log(response.data.following);
    // // Number of GitHub stars
    // console.log(response.data.public_gists);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    process.exit(1)
  });
}

module.exports = getAPI()