const http = require("http");
const httpHandle = require("./app");

const PORT = 8002;

const server = http.createServer(httpHandle);

server.listen(PORT);
console.log("server OK");

function parseURL(url){

}