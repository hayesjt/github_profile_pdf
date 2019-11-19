
function makeHTML(data) {
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
                        <img src="images/me.jpg" alt="Profile Picture" style="border-radius: 50%;">
                        <h1 class="display-4">Haylee Thomas-Kuhlmann</h1>
                        <h3>GitHub Username: haylee430</h3>
                        <hr class="my-4">
                        <p>New to web development but active in a current design roll at Target. Interested in the way
                            technology and design interact to create a powerful tool.</p>
                        <a class="btn btn-primary btn-lg" href="https://www.google.com/maps/place/"
                            role="button">Location</a>
                        <a class="btn btn-primary btn-lg" href="#" role="button">GitHub</a>
                        <a class="btn btn-primary btn-lg" href="#" role="button">Blog</a>
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
                            <h5 class="card-title">Public Repos:</h5>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Followers:</h5>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Following:</h5>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">GitHub Stars:</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-1">
                    <!-- Empty content for empty space on both sides of the page -->
                </div>
            </div>
        </div>
    </body>
    
    </html>`
}

module.exports = makeHTML(data)