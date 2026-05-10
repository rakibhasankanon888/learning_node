import { createServer, IncomingMessage, Server } from "http";
import { url } from "inspector";

const server: Server = createServer((req: IncomingMessage, res) => {
    // console.log(req.url); "/", '/user', '/products'
    // console.log(req.method); // "GET" , "POST", "Delete"

    const url = req.url
    const method = req.method

    if (url === '/' && method === "GET") {
        // console.log("This is Root route")
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is root router" }));
    } else if (url?.startsWith('/products')) {
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "This is Products router" }));

    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not Found" }));
    }


},
);

server.listen(5000, () => {
    console.log("Server is running on the port 5000")
});
