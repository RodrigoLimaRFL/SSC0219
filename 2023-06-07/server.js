import * as fs from "node:fs";
import * as http from "node:http";
import * as path from "node:path";

const PORT = 8000;

const MIME_TYPES = {
  default: "application/octet-stream",
  html: "text/html; charset=UTF-8",
  js: "application/javascript",
  css: "text/css",
  png: "image/png",
  jpg: "image/jpg",
  gif: "image/gif",
  ico: "image/x-icon",
  svg: "image/svg+xml",
};

const STATIC_PATH = path.join(process.cwd(), "./static");
const EXAMPLE_PATH = path.join(process.cwd(), "./example");

const toBool = [() => true, () => false];

const prepareFile = async (url) => {
  const paths = [STATIC_PATH, EXAMPLE_PATH, url];
  //if (url.endsWith("/")) 
  paths.push("index.html");
  //else if (url.endsWith("/example")) paths.push("example/example.html");
  const filePath = path.join(...paths);
  const pathTraversal = !filePath.startsWith(STATIC_PATH);
  const exists = await fs.promises.access(filePath).then(...toBool);
  const found = !pathTraversal && exists;
  const streamPath = found ? filePath : STATIC_PATH + "/404.html";
  const ext = path.extname(streamPath).substring(1).toLowerCase();
  const stream = fs.createReadStream(streamPath);
  return { found, ext, stream };
};

http
  .createServer(async (req, res) => {
    /*
    if (req.url.startsWith("/example")) {
        const exampleFile = await prepareFile(req.url.replace("/example", ""));
        if (exampleFile.found && exampleFile.ext === "html") {
          const mimeType = MIME_TYPES.html;
          res.writeHead(200, { "Content-Type": mimeType });
          exampleFile.stream.pipe(res);
          console.log(`${req.method} ${req.url} 200`);
          return;
        }
    }  */

    const file = await prepareFile(req.url);
    const statusCode = file.found ? 200 : 404;
    const mimeType = MIME_TYPES[file.ext] || MIME_TYPES.default;
    res.writeHead(statusCode, { "Content-Type": mimeType });
    file.stream.pipe(res);
    console.log(`${req.method} ${req.url} ${statusCode}`);
  })
  .listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);
