const http = require("http");
const fs = require("fs");
const path = require("path");

fs.mkdir("ProjectFolder", {recursive: true}, (err) => {
    if(err) throw err;
    console.log("Directory is created!")
})

fs.writeFile("ProjectFolder/index.html", "Hi! Welcome to Index Page", (err) => {
    if(err) throw err;
    console.log("Index file is created!")
})

fs.writeFile("ProjectFolder/about.html", "Hi! Welcome to About Page" , (err) => {
    if(err) throw err;
    console.log("About file is  created")
})

fs.writeFile("ProjectFolder/contact-me.html", "Hi! Welcome to Contact Page", (err) => {
    if(err) throw err;
    console.log("ContactMe file is created")
})

fs.writeFile("ProjectFolder/404.html", "This is error Page", (err) => {
    if(err) throw err;
    console.log("Error file is created")
})

const server = http.createServer((req, res) => {
  const myURL = new URL(req.url, `http://${req.headers.host}`);
  const pathname = myURL.pathname;

  let fileName = "";

  switch (pathname) {
    case "/":
      fileName = "index.html";
      break;

    case "/about":
      fileName = "about.html";
      break;

    case "/contact-me":
      fileName = "contact-me.html";
      break;

    default:
      fileName = "404.html";
  }

  const filePath = path.join(__dirname, "ProjectFolder", fileName);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Server Error");
      return;
    }

    res.writeHead(res.statusCode || 200, {"Content-Type": "text/html"});
    res.end(data);
  });
});

server.listen(5000, () => {
    console.log("Server running in the Port 5000")
})



