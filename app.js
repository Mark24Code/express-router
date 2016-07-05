var express = require("express");
var path = require("path");
var fs = require("fs");
var http = require("http");
var https = require("https");

var app = express();

var publicPath = path.resolve(__dirname, "public");
var userUploadsPath = path.resolve(__dirname,"user_uploads");
var certPath = path.resolve(__dirname,"cert");


app.use(express.static(publicPath));
app.use("/users",express.static(userUploadsPath));
app.use("/cert",express.static(certPath));

var httpsOptions = {
    key:fs.readFileSync("./cert/privatekey.pem"),
    cert:fs.readFileSync("./cert/request.pem")
}

// var one = path.resolve(__dirname,"/cert/privatekey.pem");
// console.log(one);
// var filex = fs.readFileSync("./cert/privatekey.pem");
// console.log(filex);

app.use(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Looks like you didn’t find a static file.");
});
http.createServer(app).listen(3000);
https.createServer(httpsOptions,app).listen(443);